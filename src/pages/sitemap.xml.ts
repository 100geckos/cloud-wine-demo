import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => {
  const paths = ['/', '/menu/', '/events/', '/about/', '/contact/'];
  const escape = (s: string) =>
    s
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('"', '&quot;');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${site ? paths.map((p) => `<url><loc>${escape(new URL(p, site).href)}</loc></url>`).join('') : ''}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
