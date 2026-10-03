#!/usr/bin/env node
// Regression test for the published-site rendering bug: a UTF-8 BOM from
// upstream CSS (@vuepress/highlighter-helper's whitespace.css) was landing
// mid-file in the production CSS bundle, right before the theme's core
// `:root { --c-brand: ...; --navbar-height: ...; }` rule. Browsers treat a
// BOM-prefixed selector as invalid and drop the whole rule, so the deployed
// site rendered unstyled even though `vuepress dev` looked fine (dev never
// concatenates CSS into a single file, so the bug never showed up locally).
//
// The Vite bundler does not reproduce the bug (it strips the BOM while
// processing CSS), so the old postbuild BOM-strip step is gone. This test
// stays as the guard: it inspects an existing build (`pnpm run build` first)
// and asserts the built CSS is free of embedded BOMs and that the theme's
// :root rule survives intact.
const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const distDir = path.join(repoRoot, '.vuepress', 'dist');
const BOM = Buffer.from([0xef, 0xbb, 0xbf]);

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

if (!fs.existsSync(distDir)) {
  fail(`expected build output at ${distDir}; run \`pnpm run build\` first`);
  process.exit(1);
}

const cssFiles = fs
  .readdirSync(distDir, { recursive: true })
  .filter((f) => f.endsWith('.css'));

if (cssFiles.length === 0) {
  fail(`no CSS files found in ${distDir}`);
  process.exit(1);
}

let sawRootAccentRule = false;

for (const file of cssFiles) {
  const filePath = path.join(distDir, file);
  const data = fs.readFileSync(filePath);

  const bomIndex = data.indexOf(BOM);
  if (bomIndex !== -1) {
    fail(`${file} contains an embedded BOM at byte offset ${bomIndex}`);
  }

  const text = data.toString('utf8');
  if (/--vp-c-accent\s*:/.test(text)) {
    sawRootAccentRule = true;

    if (!/(^|[};])\s*:root\s*\{[^}]*--vp-c-accent\s*:/.test(text)) {
      fail(`${file} defines --vp-c-accent but not inside a clean, unprefixed ":root {...}" rule`);
    }

    if (!/:root\s*\{[^}]*--navbar-height/.test(text)) {
      fail(`${file} is missing --navbar-height inside its :root rule`);
    }
  }
}

if (!sawRootAccentRule) {
  fail('none of the built CSS files defined --vp-c-accent — theme vars may not have been bundled at all');
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log('OK: built CSS has no embedded BOM and the theme :root rule is intact.');
