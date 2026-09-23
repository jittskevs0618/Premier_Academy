#!/usr/bin/env node
// Generates the static site into the project root, matching the folder
// structure in Section 1 of premier-academy-rebuild.md.
//
//   npm run build

const fs = require('fs');
const path = require('path');
const { site } = require('./site');
const { page, setLocale, setOutputPath } = require('./layout');
const i18n = require('./i18n');
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
  const entries = [];

  for (const p of pages.filter((p) => p.url !== '/404.html')) {
    const priority = p.url === '/' ? '1.0' : p.url.split('/').length <= 3 ? '0.8' : '0.6';
    for (const locale of LOCALES) {
      const path = locale === 'en' ? p.url : `/${locale}${p.url}`;
      // Each entry declares its alternates so the two locales are understood
      // as one page in two languages, not as duplicates.
      const alts = LOCALES.map((l) => {
        const href = site.domain + (l === 'en' ? p.url : `/${l}${p.url}`);
        return `    <xhtml:link rel="alternate" hreflang="${l === 'en' ? 'en' : 'zh-Hans'}" href="${href}"/>`;
      }).join('\n');
      entries.push(`  <url>
    <loc>${site.domain}${path}</loc>
${alts}
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
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

/** Locales to emit. 'en' is the root; anything else gets its own directory. */
const LOCALES = ['en', 'zh'];

function dictionaryFor(locale) {
  if (locale === 'en') return null;
  const file = path.join(ROOT, 'content', 'i18n', `${locale}.json`);
  if (!fs.existsSync(file)) {
    console.warn(`  ! no dictionary at content/i18n/${locale}.json — skipping ${locale}`);
    return null;
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function keepAsIs() {
  const file = path.join(ROOT, 'content', 'i18n', 'keep.json');
  if (!fs.existsSync(file)) return new Set();
  return new Set(JSON.parse(fs.readFileSync(file, 'utf8')).keep || []);
}

function main() {
  const seen = new Set();
  let count = 0;
  const keep = keepAsIs();

  for (const locale of LOCALES) {
    const dict = dictionaryFor(locale);
    if (locale !== 'en' && !dict) continue;

    setLocale(locale);
    const prefix = locale === 'en' ? '' : `${locale}/`;
    const gaps = new Set();

    for (const p of pages) {
      const out = prefix + p.out;
      if (seen.has(out)) throw new Error(`Duplicate output path: ${out}`);
      seen.add(out);

      const depth = depthOf(out);
      setOutputPath(out);
      let html = page({
        title: p.title,
        description: p.description,
        url: p.url,
        depth,
        bodyClass: p.bodyClass,
        extraHead: p.extraHead,
        body: p.body(depth),
      });

      if (dict) {
        html = i18n.apply(html, dict, {
          onMissing: (list) => list.forEach((str) => { if (!keep.has(str)) gaps.add(str); }),
        });
      }

      write(out, html);
      count++;
    }

    const label = locale === 'en' ? 'en (root)' : `${locale} (/${locale}/)`;
    console.log(`  ✓ ${String(pages.length).padStart(2)} pages  ${label}`);
    if (gaps.size) {
      console.log(`    ${gaps.size} untranslated string(s) left in English:`);
      [...gaps].slice(0, 8).forEach((g) => console.log(`      · ${g.slice(0, 72)}`));
      if (gaps.size > 8) console.log(`      … and ${gaps.size - 8} more`);
    }
  }

  setLocale('en');

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

  console.log(`\nBuilt ${count} pages across ${LOCALES.length} locales into ${ROOT}`);
}

main();
