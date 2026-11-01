/**
 * Writes public/sitemap.xml: the three pages and every 2027 project in the
 * portal's scope, under `siteUrl`, dated by the API's `meta.built_at`.
 *
 *   npx tsx scripts/caloocan-sitemap.ts
 *
 * Run it again when the scope or the data changes. Kept apart from upstream's
 * scripts, like scripts/caloocan-poster.ts.
 */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { env, exit } from 'node:process';
import config from '../portal.config.ts';
import { createClient } from '../src/api/client.ts';
import { DEFAULT_API } from '../src/config.ts';
import { resolveScope } from '../src/lib/scope.ts';

const OUT = resolve(import.meta.dirname, '../public/sitemap.xml');
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]!);

async function main() {
  if (!config.siteUrl) throw new Error('portal.config.ts has no siteUrl.');
  const site = config.siteUrl.replace(/\/+$/, '');
  const api = createClient(env.VITE_API_BASE || config.api || DEFAULT_API);
  const scope = await resolveScope(api, config);
  const lastmod = scope.meta.built_at.slice(0, 10);
  // As Home.tsx links to them.
  const projects = scope.projects.map((p) => `/projects/${p.dataset}/${encodeURIComponent(p.id)}`).sort();
  const paths = ['/', '/gaa', '/about', ...projects];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map((p) => `  <url><loc>${esc(site + p)}</loc><lastmod>${lastmod}</lastmod></url>`),
    '</urlset>',
    '',
  ].join('\n');
  writeFileSync(OUT, xml);
  console.log(`public/sitemap.xml: ${paths.length} URLs (${projects.length} projects), lastmod ${lastmod}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  exit(1);
});
