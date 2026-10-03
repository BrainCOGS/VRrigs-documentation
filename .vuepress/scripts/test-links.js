#!/usr/bin/env node
// Broken-link check over the built site (run `pnpm run build` first).
//
// The theme's links-check plugin (set to fail the build in config.ts) only
// sees Markdown links. Most downloads and images on this site are raw HTML
// (`<a href='./assets/...zip'>`, `<img src=...>`), which it never checks, so
// this script walks every built HTML page instead and verifies that each
// same-site href/src resolves to a file in dist, and that each #fragment
// points at an element id on the target page. External URLs are not
// fetched: they are not ours to fix and would make CI flaky.
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const BASE = '/';

if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error(`FAIL: no build at ${distDir}; run \`pnpm run build\` first`);
  process.exit(1);
}

const htmlFiles = fs
  .readdirSync(distDir, { recursive: true })
  .filter((f) => f.endsWith('.html'))
  .map((f) => f.split(path.sep).join('/'));

const idCache = new Map();
function idsOf(file) {
  if (!idCache.has(file)) {
    const html = fs.readFileSync(path.join(distDir, file), 'utf8');
    const ids = new Set();
    for (const m of html.matchAll(/\sid="([^"]*)"/g)) ids.add(m[1]);
    idCache.set(file, ids);
  }
  return idCache.get(file);
}

// Map a site path to the dist file a static host (GitHub Pages) would serve.
function resolveFile(sitePath) {
  if (!sitePath.startsWith(BASE)) return null;
  let rel = sitePath.slice(BASE.length);
  if (rel === '' || rel.endsWith('/')) rel += 'index.html';
  const candidates = [rel];
  if (!path.extname(rel)) candidates.push(`${rel}.html`, `${rel}/index.html`);
  for (const c of candidates) {
    const abs = path.join(distDir, c);
    if (abs.startsWith(distDir) && fs.existsSync(abs) && fs.statSync(abs).isFile()) {
      return c;
    }
  }
  return null;
}

const broken = [];
let checked = 0;

for (const page of htmlFiles) {
  const html = fs.readFileSync(path.join(distDir, page), 'utf8');
  const pageUrl = new URL(page, 'http://site.invalid/');

  for (const m of html.matchAll(/\s(href|src)=(["'])(.*?)\2/g)) {
    const raw = m[3].trim();
    if (!raw || /^(mailto|tel|javascript|data):/i.test(raw)) continue;

    let url;
    try {
      url = new URL(raw.replace(/&amp;/g, '&'), pageUrl);
    } catch {
      broken.push(`${page}: unparseable ${m[1]}="${raw}"`);
      continue;
    }
    if (url.origin !== pageUrl.origin) continue; // external

    checked += 1;
    const sitePath = decodeURIComponent(url.pathname);
    const target = resolveFile(sitePath);
    if (!target) {
      broken.push(`${page}: ${m[1]}="${raw}" -> ${sitePath} does not exist`);
      continue;
    }

    const fragment = decodeURIComponent(url.hash.slice(1));
    if (fragment && target.endsWith('.html') && !idsOf(target).has(fragment)) {
      broken.push(`${page}: ${m[1]}="${raw}" -> no id="${fragment}" in ${target}`);
    }
  }
}

if (broken.length > 0) {
  console.error(`FAIL: ${broken.length} broken link(s):`);
  for (const b of broken) console.error(`  ${b}`);
  process.exit(1);
}

console.log(`OK: ${checked} same-site links across ${htmlFiles.length} pages all resolve.`);
