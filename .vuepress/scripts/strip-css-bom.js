#!/usr/bin/env node
// Some upstream CSS (e.g. @vuepress/highlighter-helper's whitespace.css) ships
// with a UTF-8 BOM. mini-css-extract-plugin concatenates CSS chunks verbatim,
// so that BOM ends up embedded mid-file in the production build, corrupting
// the ":root" rule that immediately follows it (browsers treat "﻿:root"
// as an unrecognized selector and drop the whole rule, including things like
// --navbar-height). This only affects `vuepress build` output — `vuepress dev`
// injects styles via <style> tags and never concatenates CSS, so the bug is
// invisible locally.
const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, '..', 'dist', 'assets', 'css');

if (!fs.existsSync(cssDir)) {
  process.exit(0);
}

const BOM = Buffer.from([0xef, 0xbb, 0xbf]);

for (const file of fs.readdirSync(cssDir)) {
  if (!file.endsWith('.css')) continue;
  const filePath = path.join(cssDir, file);
  const original = fs.readFileSync(filePath);

  let stripped = original;
  if (stripped.slice(0, 3).equals(BOM)) {
    stripped = stripped.slice(3);
  }

  const parts = [];
  let start = 0;
  let idx;
  while ((idx = stripped.indexOf(BOM, start)) !== -1) {
    parts.push(stripped.slice(start, idx));
    start = idx + BOM.length;
  }
  parts.push(stripped.slice(start));
  stripped = Buffer.concat(parts);

  if (!stripped.equals(original)) {
    fs.writeFileSync(filePath, stripped);
    console.log(`stripped BOM from ${file}`);
  }
}
