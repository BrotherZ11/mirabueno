import type { APIRoute } from 'astro';

import { publicSitePaths, SITE } from '../consts';

export const GET: APIRoute = () => {
  const urls = publicSitePaths
    .map((path) => {
      const location = new URL(path, SITE.siteUrl).toString();
      return `<url><loc>${location}</loc></url>`;
    })
    .join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};