# Mirabueno Casa de Comidas

Sitio web responsive para un restaurante premium desarrollado con Astro, TailwindCSS y animaciones suaves con AOS.

## Requisitos

- Node.js 22.12 o superior

## Puesta en marcha

```bash
npm install
npm run dev
```

## Variables de entorno

- GOOGLE_PLACES_API_KEY · clave de Google Places usada solo en build con Places API (New) habilitada.
- GOOGLE_PLACE_ID · identificador del negocio en Google.

Las reseñas se consultan en build y se guardan en una caché local en src/data/google-reviews-cache.json. Si la caché tiene menos de 24 horas, no se vuelve a pedir nada a Google.

## Scripts disponibles

- `npm run dev` · servidor de desarrollo
- `npm run build` · build de producción
- `npm run preview` · vista previa del build
- `npm run astro -- check` · validación de tipos y contenido Astro

## Estructura

- `src/components` · componentes reutilizables
- `src/layouts` · layout base con SEO y estructura global
- `src/pages` · páginas públicas del sitio
- `src/styles` · estilos globales y tema visual
