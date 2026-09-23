#!/usr/bin/env node
// Builds the full inventory of translatable strings from the generated English
// pages into content/i18n/strings.json — the source list every locale fills in.
//
//   npm run strings

const fs = require('fs');
const path = require('path');
const { extract } = require('../build/i18n');

const ROOT = path.resolve(__dirname, '..');
const SKIP = new Set(['node_modules', 'build', 'scripts', '.git', 'assets', 'css', 'js', 'deploy', 'premier-assets', 'content', 'zh']);

function pages(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) pages(full, acc);
    else if (e.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

const files = pages(ROOT);
const order = [];
const seen = new Set();
const where = new Map();

// Homepage first, then the rest — keeps related copy adjacent for translators.
files.sort((a, b) => {
  const ai = a.endsWith('index.html') && path.dirname(a) === ROOT ? 0 : 1;
  const bi = b.endsWith('index.html') && path.dirname(b) === ROOT ? 0 : 1;
  return ai - bi || a.localeCompare(b);
});

for (const f of files) {
  const rel = path.relative(ROOT, f);
  for (const s of extract(fs.readFileSync(f, 'utf8'))) {
    if (!seen.has(s)) { seen.add(s); order.push(s); }
    if (!where.has(s)) where.set(s, []);
    if (where.get(s).length < 3) where.get(s).push(rel);
  }
}

const out = path.join(ROOT, 'content', 'i18n', 'strings.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify({
  generated: new Date().toISOString().slice(0, 10),
  count: order.length,
  strings: order.map((s) => ({ text: s, pages: where.get(s) })),
}, null, 2) + '\n');

const chars = order.reduce((n, s) => n + s.length, 0);
console.log(`${order.length} unique strings across ${files.length} pages (${chars.toLocaleString()} chars)`);
console.log(`-> ${path.relative(ROOT, out)}`);
