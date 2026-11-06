// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');
const siteUrl = process.env.SITE_URL || env.SITE_URL;
if (siteUrl) {
  const parsed = new URL(siteUrl);
  if (
    parsed.protocol !== 'https:' ||
    parsed.username ||
    parsed.password ||
    parsed.pathname !== '/' ||
    parsed.search ||
    parsed.hash
  )
    throw new Error(
      'SITE_URL must be an HTTPS origin without a path or credentials',
    );
}
export default defineConfig({
  site: siteUrl || undefined,
  output: 'static',
  trailingSlash: 'always',
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
