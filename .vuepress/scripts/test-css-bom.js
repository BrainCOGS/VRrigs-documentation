#!/usr/bin/env node
// Regression test for the published-site rendering bug: a UTF-8 BOM from
// upstream CSS (@vuepress/highlighter-helper's whitespace.css) was landing
// mid-file in the production CSS bundle, right before the theme's core
// `:root { --c-brand: ...; --navbar-height: ...; }` rule. Browsers treat a
// BOM-prefixed selector as invalid and drop the whole rule, so the deployed
// site rendered unstyled even though `vuepress dev` looked fine (dev never
// concatenates CSS into a single file, so the bug never showed up locally).
//
// This script builds the site, then asserts the built CSS is free of
// embedded BOMs and that the critical :root rule survives intact.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const repoRoot = path.join(__dirname, '..', '..');
const cssDir = path.join(repoRoot, '.vuepress', 'dist', 'assets', 'css');
const BOM = Buffer.from([0xef, 0xbb, 0xbf]);

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

console.log('Building site...');
execFileSync('yarn', ['build'], { cwd: repoRoot, stdio: 'inherit' });

if (!fs.existsSync(cssDir)) {
  fail(`expected build output at ${cssDir}, but it does not exist`);
  process.exit(1);
}

const cssFiles = fs.readdirSync(cssDir).filter((f) => f.endsWith('.css'));

if (cssFiles.length === 0) {
  fail(`no CSS files found in ${cssDir}`);
  process.exit(1);
}

let sawRootBrandRule = false;

for (const file of cssFiles) {
  const filePath = path.join(cssDir, file);
  const data = fs.readFileSync(filePath);

  const bomIndex = data.indexOf(BOM);
  if (bomIndex !== -1) {
    fail(`${file} contains an embedded BOM at byte offset ${bomIndex}`);
  }

  const text = data.toString('utf8');
  if (text.includes('--c-brand')) {
    sawRootBrandRule = true;

    if (!/(^|[};])\s*:root\s*\{[^}]*--c-brand/.test(text)) {
      fail(`${file} defines --c-brand but not inside a clean, unprefixed ":root {...}" rule`);
    }

    if (!/:root\s*\{[^}]*--navbar-height/.test(text)) {
      fail(`${file} is missing --navbar-height inside its :root rule`);
    }
  }
}

if (!sawRootBrandRule) {
  fail('none of the built CSS files defined --c-brand — theme vars may not have been bundled at all');
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log('OK: built CSS has no embedded BOM and the theme :root rule is intact.');
