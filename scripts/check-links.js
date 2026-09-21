#!/usr/bin/env node
// Verifies that every internal link, image, script and stylesheet in the built
// site resolves to a file that exists, and that no WordPress URLs survive.
//
//   npm run check

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['node_modules', 'build', 'scripts', '.git', 'premier-assets']);

function htmlFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) htmlFiles(full, acc);
    else if (entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

const REF = /(?:href|src)="([^"]+)"/g;
const files = htmlFiles(ROOT);
const problems = [];
let checked = 0;

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const relFile = path.relative(ROOT, file);
  const dir = path.dirname(file);

  // Only same-origin or relative WordPress paths are leftovers; a link to an
  // unrelated site that happens to run WordPress is not our problem.
  const wpLeftover = new RegExp(
    '(?:href|src)="(?:https?://(?:www\\.)?premier-academy\\.com)?/?(?:wp-content|wp-includes)/|\\?page_id=|\\?p=\\d'
  );
  if (wpLeftover.test(html)) {
    problems.push(`${relFile}: contains a leftover WordPress URL`);
  }

  let m;
  while ((m = REF.exec(html))) {
    const ref = m[1];
    if (
      !ref ||
      ref.startsWith('http') ||
      ref.startsWith('//') ||
      ref.startsWith('mailto:') ||
      ref.startsWith('tel:') ||
      ref.startsWith('#') ||
      ref.startsWith('data:')
    ) continue;

    const target = path.resolve(dir, ref.split('#')[0].split('?')[0]);
    checked++;
    if (!fs.existsSync(target)) {
      problems.push(`${relFile}: broken reference -> ${ref}`);
    }
  }
}

console.log(`Checked ${checked} internal references across ${files.length} pages.`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  problems.forEach((p) => console.error('  ✗ ' + p));
  process.exit(1);
}
console.log('✓ No broken internal links and no WordPress URLs remaining.');
