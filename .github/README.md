# **BRAIN CoGS Mini VR Rigs Documentation**

Documentation for building, maintaining, and managing mini Virtual Reality Rigs at Princeton BRAIN CoGS.

---

## **Table of Contents**
1. [Getting Started](#getting-started)
2. [Directory Structure](#directory-structure)
3. [Making Changes to the Documentation](#making-changes-to-the-documentation)
   - [a) Modifying Existing Documentation](#a-modifying-existing-documentation)
   - [b) Adding a New Page](#b-adding-a-new-page)
4. [Deployment](#deployment)

---

## **Getting Started**

We have a docker development environment set up. To install, follow the instructions above.

### Prerequisites
- **Docker**: Ensure Docker is installed on your system. You can download Docker [here](https://www.docker.com/).

### Setting Up the Development Environment with Docker

1. Build the Docker container:
   ```bash
   docker-compose build
   ```

2. Start the development environment:
   ```bash
   docker-compose up
   ```

3. Navigate to [http://localhost:8080](http://localhost:8080) to view the site locally.

4. Do the modifications to the documentation files and watch them update in the local site.

### Without Docker

The site is built with [VitePress](https://vitepress.dev). Use the current
Node LTS (CI and Docker track it via `lts/*` / `node:lts`; `engines.node` in
`package.json` is the minimum) and the pnpm version in `packageManager`
(`npm install -g pnpm@<version>`). pnpm refuses packages published less than
7 days ago (`minimumReleaseAge` in `pnpm-workspace.yaml`).

```bash
pnpm install --frozen-lockfile
pnpm dev                                 # dev server on http://localhost:8080
pnpm test                                # build, then all checks below
pnpm run audit                           # high/critical advisories in the dependency tree
```

`pnpm test` builds the site (dead Markdown links fail the build) and then runs
`test:dist` on `.vitepress/dist`:

- `test:css-bom`: the built CSS has no embedded UTF-8 BOM, the theme `:root` rule is intact and the green brand color is bundled.
- `test:links`: every same-site link, image and download resolves, including `#anchors`, and no link is nested in another.
- `test:visual-homepage`: the homepage renders with the theme applied, the sidebar has labels, and every page hydrates without errors (needs `pnpm exec playwright install chromium` once).

---

## **Directory Structure**

The documentation follows this structure:
```
.vitepress/
  config.mts        # VitePress configuration (nav, sidebar, search)
  theme/            # Default theme + the site's brand colors
  scripts/          # Regression tests run by `pnpm test`
public/             # Files served as-is at the same path (downloads, logo)
building/           # Documentation for building VR rigs
maintenance/        # Documentation for maintenance
software/           # Software documentation
index.md            # Homepage
```

---

## **Making Changes to the Documentation**

### a) Modifying Existing Documentation
1. Open the desired `.md` file in the respective directory (e.g., `building/stage.md`).
2. Make your changes and save the file. If the dev env is up, you should see the changes immediatly after saving them.

### b) Adding a New Page
1. Create a new `.md` file in the appropriate directory (e.g., `software/new-feature.md`).
2. Give it a `title:` in its frontmatter and add it to the sidebar in
   `.vitepress/config.mts` with `page('/software/new-feature')`. The sidebar
   label is read from the frontmatter title.
3. Test your changes locally as described above (`pnpm test`).

Files linked with raw HTML (`<a href=...>`) are not bundled. Put downloads
under `public/` at the path the link uses, or `pnpm test` will flag
the link as broken.

---

## **Deployment**

1. Open a pull request against `master` (direct pushes are blocked). The
   `prek` (lint) and `test` checks must pass.

2. When the PR is merged, the `Build and Deploy` workflow builds the site, runs
   the checks and publishes `.vitepress/dist` to the `gh-pages` branch of
   `BRAINCOGS/braincogs.github.io`.
