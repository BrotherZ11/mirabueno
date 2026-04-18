// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import { siteConfig } from './site.config.mjs';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.siteUrl,
  vite: {
    plugins: [tailwindcss()]
  }
});
