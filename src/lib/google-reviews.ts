import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

export interface ReviewItem {
  authorName: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
}

export interface ReviewsPayload {
  placeName: string;
  rating: number;
  userRatingsTotal: number;
  sourceUrl: string;
  fetchedAt: string;
  reviews: ReviewItem[];
}

interface GetGoogleReviewsOptions {
  apiKey?: string;
  placeId?: string;
  allowRefresh?: boolean;
}

interface GooglePlaceReview {
  authorAttribution?: {
    displayName?: string;
  };
  rating?: number;
  relative_time_description?: string;
  relativePublishTimeDescription?: string;
  text?: {
    text?: string;
  };
  originalText?: {
    text?: string;
  };
}

interface GooglePlaceDetailsResponse {
  displayName?: {
    text?: string;
  };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GooglePlaceReview[];
}

const CACHE_PATH = resolve(
  process.cwd(),
  "src/data/google-reviews-cache.json",
);
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const FALLBACK_REVIEWS: ReviewsPayload = {
  placeName: "Mirabueno Casa de Comidas",
  rating: 5,
  userRatingsTotal: 0,
  sourceUrl: "https://www.google.com/maps",
  fetchedAt: new Date(0).toISOString(),
  reviews: [
    {
      authorName: "Clientes que repiten",
      rating: 5,
      relativeTimeDescription: "Selección editorial",
      text: "Todo estaba buenísimo, con producto muy cuidado y una atención cercana desde que llegamos hasta el postre.",
    },
    {
      authorName: "Comensales satisfechos",
      rating: 5,
      relativeTimeDescription: "Selección editorial",
      text: "Un sitio precioso para comer en Setenil: servicio atento, ritmo tranquilo y una experiencia muy agradable en mesa.",
    },
    {
      authorName: "Quien vuelve por la cocina",
      rating: 5,
      relativeTimeDescription: "Selección editorial",
      text: "Parada muy recomendable si buscas comer bien, con platos sabrosos y una carta que deja ganas de volver.",
    },
  ],
};

let reviewsPromise: Promise<ReviewsPayload> | undefined;

export function getGoogleReviews(options: GetGoogleReviewsOptions) {
  if (!reviewsPromise) {
    reviewsPromise = loadGoogleReviews(options);
  }

  return reviewsPromise;
}

async function loadGoogleReviews({
  apiKey,
  placeId,
  allowRefresh = false,
}: GetGoogleReviewsOptions): Promise<ReviewsPayload> {
  const cached = readCache();

  if (cached && isFresh(cached)) {
    return cached;
  }

  if (allowRefresh && apiKey && placeId) {
    try {
      const fresh = await fetchReviewsFromGoogle(apiKey, placeId);
      writeCache(fresh);
      return fresh;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      console.warn(`[reviews] No se pudieron actualizar las reseñas de Google: ${message}`);
    }
  }

  return cached ?? FALLBACK_REVIEWS;
}

function readCache(): ReviewsPayload | null {
  if (!existsSync(CACHE_PATH)) {
    return null;
  }

  try {
    const file = readFileSync(CACHE_PATH, "utf8");
    const parsed = JSON.parse(file) as ReviewsPayload;

    if (!parsed.reviews?.length) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function writeCache(payload: ReviewsPayload) {
  mkdirSync(dirname(CACHE_PATH), { recursive: true });
  writeFileSync(CACHE_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

function isFresh(payload: ReviewsPayload) {
  const fetchedAtMs = new Date(payload.fetchedAt).getTime();

  return Number.isFinite(fetchedAtMs) && Date.now() - fetchedAtMs < CACHE_TTL_MS;
}

async function fetchReviewsFromGoogle(apiKey: string, placeId: string) {
  const endpoint = new URL(`https://places.googleapis.com/v1/places/${placeId}`);
  endpoint.search = new URLSearchParams({
    languageCode: "es",
  }).toString();

  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews,googleMapsUri",
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Google Places (New) devolvio ${response.status}: ${errorMessage}`);
  }

  const payload = (await response.json()) as GooglePlaceDetailsResponse;

  const reviews = (payload.reviews ?? [])
    .filter((review) => review.text?.text?.trim() || review.originalText?.text?.trim())
    .slice(0, 3)
    .map((review) => ({
      authorName:
        review.authorAttribution?.displayName?.trim() || "Cliente de Google",
      rating: review.rating ?? 5,
      relativeTimeDescription:
        review.relativePublishTimeDescription?.trim() ||
        review.relative_time_description?.trim() ||
        "Reseña reciente",
      text: truncateReview(
        review.text?.text ?? review.originalText?.text ?? "",
      ),
    }));

  if (!reviews.length) {
    throw new Error("Google Places no devolvio reseñas utilizables");
  }

  return {
    placeName: payload.displayName?.text?.trim() || FALLBACK_REVIEWS.placeName,
    rating: payload.rating ?? FALLBACK_REVIEWS.rating,
    userRatingsTotal: payload.userRatingCount ?? FALLBACK_REVIEWS.userRatingsTotal,
    sourceUrl: payload.googleMapsUri?.trim() || FALLBACK_REVIEWS.sourceUrl,
    fetchedAt: new Date().toISOString(),
    reviews,
  } satisfies ReviewsPayload;
}

function truncateReview(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (normalized.length <= 220) {
    return normalized;
  }

  const shortened = normalized.slice(0, 217);
  return `${shortened.slice(0, shortened.lastIndexOf(" "))}...`;
}