import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mishanyao.github.io',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
