#!/usr/bin/env node
// Broken-link check over the built site (run `pnpm run build` first).
//
// VitePress's own dead-link check (which fails `vitepress build`) only sees
// Markdown links. File downloads on this site are raw HTML
// (`<a href='/building/drawings/...zip' download>`), which it never checks, so
// this script walks every built HTML page instead and verifies that each
// same-site href/src resolves to a file in dist, and that each #fragment
// points at an element id on the target page. External URLs are not
// fetched: they are not ours to fix and would make CI flaky.
//
// It also rejects nested <a> elements. Markdown linkify used to wrap the
// URL text of raw-HTML links in a second <a>, which is invalid HTML.
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

  let anchorDepth = 0;
  for (const m of html.matchAll(/<(\/?)a(?=[\s>])[^>]*>/gi)) {
    if (m[1]) {
      anchorDepth = Math.max(0, anchorDepth - 1);
    } else if (++anchorDepth > 1) {
      broken.push(`${page}: nested <a> element at "${html.slice(m.index, m.index + 80)}"`);
    }
  }

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
