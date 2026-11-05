import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages の公開先に合わせて、この2項目だけ変更してください。
// リポジトリ名が username.github.io の場合、base は '' にします。
const site = 'https://nikonosfive.github.io';
const base = '/test';

export default defineConfig({
  site,
  base,
  output: 'static',
  integrations: [sitemap()],
});
