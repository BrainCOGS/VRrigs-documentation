#!/usr/bin/env node
// Figure/caption check over the built site (run `pnpm run build` first).
//
// Content images are written as Markdown (`![Caption](./assets/x.png)`) and
// rendered as <figure><img><figcaption> by @mdit/plugin-figure. Things that
// silently break that, and which this script catches:
//   - an image that is not alone in its paragraph stays inline, outside any
//     <figure> (e.g. text on the line next to it);
//   - a caption that renders empty;
//   - figures or captions disappearing altogether (the old raw-HTML
//     <center> captions vanished from the static HTML once already);
//   - presentational markup (<center>, <small>) creeping back into
//     captions instead of the CSS in .vitepress/theme/custom.css.
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

// Site totals when this check was written. Floors, not exact counts, so
// adding figures needs no edit here; raise them when you add many.
const MIN_FIGURES = 211;
const MIN_CAPTIONS = 84;

if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error(`FAIL: no build at ${distDir}; run \`pnpm run build\` first`);
  process.exit(1);
}

const htmlFiles = fs
  .readdirSync(distDir, { recursive: true })
  .filter((f) => f.endsWith('.html') && f !== '404.html')
  .map((f) => f.split(path.sep).join('/'));

const problems = [];
let figures = 0;
let captions = 0;

const text = (html) => html.replace(/<[^>]*>/g, '').replace(/&nbsp;|​/g, ' ').trim();

for (const page of htmlFiles) {
  const html = fs.readFileSync(path.join(distDir, page), 'utf8');

  // Page content only: the theme's navbar, sidebar and footer are not ours.
  const start = html.search(/<div[^>]*class="vp-doc[\s"]/);
  if (start < 0) continue; // home page layout has no .vp-doc
  const end = html.indexOf('</main>', start);
  const doc = html.slice(start, end < 0 ? undefined : end);

  if (/<center[\s>]/i.test(doc)) {
    problems.push(`${page}: <center> in page content; center captions with CSS instead`);
  }

  let imgsInFigures = 0;
  for (const [, body] of doc.matchAll(/<figure[^>]*>([\s\S]*?)<\/figure>/g)) {
    figures += 1;
    const imgs = body.match(/<img\s[^>]*>/g) ?? [];
    imgsInFigures += imgs.length;
    if (imgs.length !== 1) {
      problems.push(`${page}: <figure> with ${imgs.length} images: "${body.trim().slice(0, 100)}"`);
    }
    for (const img of imgs) {
      if (!/\salt=/.test(img)) problems.push(`${page}: figure image without alt: ${img}`);
    }

    const caption = body.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/);
    if (caption) {
      captions += 1;
      if (!text(caption[1])) problems.push(`${page}: empty <figcaption>`);
      if (/<small[\s>]/i.test(caption[1])) {
        problems.push(`${page}: <small> in a caption; caption size comes from CSS`);
      }
    }
  }

  const allImgs = (doc.match(/<img\s[^>]*>/g) ?? []).length;
  if (allImgs !== imgsInFigures) {
    problems.push(
      `${page}: ${allImgs - imgsInFigures} image(s) outside a <figure>; ` +
        'put each image on its own line with blank lines around it'
    );
  }
}

if (figures < MIN_FIGURES) {
  problems.push(`only ${figures} figures site-wide, expected at least ${MIN_FIGURES}`);
}
if (captions < MIN_CAPTIONS) {
  problems.push(`only ${captions} figure captions site-wide, expected at least ${MIN_CAPTIONS}`);
}

if (problems.length > 0) {
  console.error(`FAIL: ${problems.length} figure problem(s):`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}

console.log(`OK: ${figures} figures (${captions} captioned) across ${htmlFiles.length} pages.`);
