#!/usr/bin/env node
// Generates the static site into the project root, matching the folder
// structure in Section 1 of premier-academy-rebuild.md.
//
//   npm run build

const fs = require('fs');
const path = require('path');
const { site } = require('./site');
const { page } = require('./layout');
const redirects = require('./redirects');

const ROOT = path.resolve(__dirname, '..');

const pages = [
  ...require('./pages/home'),
  ...require('./pages/about'),
  ...require('./pages/counseling'),
  ...require('./pages/services'),
  ...require('./pages/misc'),
];

/** Directory depth of an output path: about/faculty/teachers.html -> 2 */
const depthOf = (out) => out.split('/').length - 1;

function write(relPath, contents) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents);
  return full;
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .filter((p) => p.url !== '/404.html')
    .map((p) => {
      const loc = site.domain + p.url;
      const priority = p.url === '/' ? '1.0' : p.url.split('/').length <= 3 ? '0.8' : '0.6';
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const robots = `User-agent: *
Allow: /
Disallow: /build/
Disallow: /scripts/
Disallow: /premier-academy-rebuild.md

Sitemap: ${site.domain}/sitemap.xml
`;

function main() {
  const seen = new Set();
  let count = 0;

  for (const p of pages) {
    if (seen.has(p.out)) throw new Error(`Duplicate output path: ${p.out}`);
    seen.add(p.out);

    const depth = depthOf(p.out);
    const html = page({
      title: p.title,
      description: p.description,
      url: p.url,
      depth,
      bodyClass: p.bodyClass,
      extraHead: p.extraHead,
      body: p.body(depth),
    });
    write(p.out, html);
    count++;
    console.log(`  ✓ ${p.out}`);
  }

  write('sitemap.xml', buildSitemap());
  console.log('  ✓ sitemap.xml');
  write('robots.txt', robots);
  console.log('  ✓ robots.txt');
  write('_redirects', redirects.netlify());
  console.log('  ✓ _redirects (Netlify / Cloudflare Pages)');
  write('vercel.json', redirects.vercel());
  console.log('  ✓ vercel.json');
  write('deploy/nginx-redirects.conf', redirects.nginx());
  console.log('  ✓ deploy/nginx-redirects.conf');

  console.log(`\nBuilt ${count} pages into ${ROOT}`);
}

main();
