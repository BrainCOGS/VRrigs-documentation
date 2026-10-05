#!/usr/bin/env node
// Structural visual-regression check for the homepage.
//
// This is a broader net than test-css-bom.js: rather than checking for one
// specific corruption mechanism, it renders the actual built site in a real
// browser and asserts the things a human would notice at a glance if the
// page "looked broken" — the kind of failure this project already shipped
// once (see #27), where the CSS loaded with a 200 but a corrupted :root
// rule silently dropped the theme's layout variables, leaving the navbar
// unstyled and overlapping the page content.
//
// It intentionally avoids pixel/screenshot diffing (no baseline images to
// maintain, no false positives from font rendering differences across
// machines/CI) in favor of asserting computed layout facts that only hold
// when the theme's CSS actually applied.
const fs = require('fs');
const path = require('path');
const http = require('http');
const { chromium } = require('playwright');

const repoRoot = path.join(__dirname, '..', '..');
const distDir = path.join(repoRoot, '.vitepress', 'dist');
const PORT = 4173;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
};

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function serveDist() {
  const server = http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    if (urlPath.endsWith('/')) urlPath += 'index.html';
    let filePath = path.join(distDir, urlPath);

    if (!filePath.startsWith(distDir)) {
      res.writeHead(403);
      res.end();
      return;
    }
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(distDir, '404.html');
    }

    const ext = path.extname(filePath);
    res.writeHead(fs.existsSync(filePath) ? 200 : 404, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
    });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => resolve(server));
  });
}

async function main() {
  if (!fs.existsSync(path.join(distDir, 'index.html'))) {
    fail(`no build at ${distDir}; run \`pnpm run build\` first`);
    process.exit(1);
  }

  const server = await serveDist();
  const browser = await chromium.launch();

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(String(err)));

    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });

    // The site's title should render as actual page content, not fall back
    // to a blank/broken page.
    const title = await page.title();
    if (!title.includes('BRAIN CoGS')) {
      fail(`unexpected page title: "${title}"`);
    }

    // Regression check for #27: --vp-nav-height (and friends) are set in
    // the theme's :root rule. If a corrupted selector drops that rule,
    // this resolves to an empty string.
    const rootVar = (name) =>
      page.evaluate((n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim(), name);

    if (!(await rootVar('--vp-nav-height'))) {
      fail('--vp-nav-height CSS custom property is not set — theme :root rule may not have applied');
    }

    // The site keeps its green brand (.vitepress/theme/custom.css) rather
    // than VitePress's default indigo.
    const brand = (await rootVar('--vp-c-brand-1')).toLowerCase();
    if (brand !== '#2f9467') {
      fail(`--vp-c-brand-1 is "${brand}", expected the site green #2f9467`);
    }

    // The navbar must exist, be visible, and be fixed to the top — not
    // collapsed/inline the way it renders with no CSS applied.
    const navbar = page.locator('.VPNav');
    if ((await navbar.count()) === 0) {
      fail('.VPNav element not found on homepage');
    } else {
      const box = await navbar.boundingBox();
      const position = await navbar.evaluate((el) => getComputedStyle(el).position);

      if (!box || box.height < 20) {
        fail(`navbar has suspiciously small height: ${box ? box.height : 'null'}px`);
      }
      if (position !== 'fixed') {
        fail(`navbar position is "${position}", expected "fixed"`);
      }
    }

    // The hero heading must not visually overlap the navbar (this is
    // exactly the symptom from #27 — the site title and page heading
    // rendered stacked on top of each other because the navbar's fixed
    // positioning + the page's compensating top padding never applied).
    // Measure the heading itself: the VitePress hero background is meant to
    // sit under the transparent nav.
    const heroBox = await page.locator('.VPHero h1').boundingBox();
    const navbarBox = await navbar.boundingBox();
    if (heroBox && navbarBox && heroBox.y < navbarBox.y + navbarBox.height - 5) {
      fail(
        `hero heading (top: ${heroBox.y}px) overlaps the navbar (bottom: ${navbarBox.y + navbarBox.height}px)`
      );
    }

    const heroTitle = await page.locator('.VPHero h1').innerText();
    if (!heroTitle.trim()) {
      fail('.VPHero h1 is empty — homepage heading did not render');
    }

    // A handful of nav links and the hero action button should be present
    // and actually clickable-sized, confirming the page isn't a bare
    // unstyled HTML dump.
    const navLinks = await page.locator('.VPNav .VPNavBarMenuLink').count();
    if (navLinks === 0) {
      fail('no navbar links found on homepage');
    }

    if (consoleErrors.length > 0) {
      fail(`browser console reported errors:\n  ${consoleErrors.join('\n  ')}`);
    }

    // Sidebar labels come from each page's frontmatter title
    // (`page()` in config.mts); an empty label means that lookup broke.
    const contentPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await contentPage.goto(`http://localhost:${PORT}/building/cabinet.html`, { waitUntil: 'networkidle' });
    const sidebarLabels = await contentPage
      .locator('.VPSidebar .VPSidebarItem.level-1 .text')
      .allInnerTexts();
    if (sidebarLabels.length !== 10) {
      fail(`expected 10 building sidebar entries, found ${sidebarLabels.length}`);
    }
    const blank = sidebarLabels.filter((t) => !t.trim()).length;
    if (blank > 0) {
      fail(`${blank} sidebar entries have no label`);
    }
    await contentPage.close();

  } finally {
    await browser.close();
    server.close();
  }

  if (process.exitCode) {
    process.exit(process.exitCode);
  }

  console.log('OK: homepage renders with theme CSS applied and no layout collapse.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
