// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://anygnahiet.dev',
  integrations: [
    react(),
    sitemap({
      // Exclude the noindex '/' redirect page from the sitemap.
      filter: (page) => {
        const p = page.replace('https://anygnahiet.dev', '');
        return p !== '/' && p !== '';
      },
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          fr: 'fr',
        },
      },
    }),
  ],
});
