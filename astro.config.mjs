// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://anygnahiet.dev',
  integrations: [
    react(),
    sitemap({
      // Exclude the root redirect page and the empty/placeholder routes from
      // the sitemap (they are noindex; including them only confuses crawlers).
      filter: (page) => {
        const p = page.replace('https://anygnahiet.dev', '');
        if (p === '/' || p === '') return false;
        if (/^\/(fr|en)\/(blog|projects)\/?$/.test(p)) return false;
        return true;
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
