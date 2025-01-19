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

---

## **Directory Structure**

The documentation follows this structure:
```
src/
  .vuepress/
    config.ts       # VuePress configuration
    components/     # Custom Vue components
    public/         # Static assets
    styles/         # Custom styles
  building/         # Documentation for building VR rigs
  maintenance/      # Documentation for maintenance
  software/         # Software documentation
```

---

## **Making Changes to the Documentation**

### a) Modifying Existing Documentation
1. Open the desired `.md` file in the respective directory (e.g., `src/building/stage.md`).
2. Make your changes and save the file. If the dev env is up, you should see the changes immediatly after saving them.

### b) Adding a New Page
1. Create a new `.md` file in the appropriate directory (e.g., `src/software/new-feature.md`).
2. Add the new page to the sidebar in `.vuepress/config.ts`.
3. Test your changes locally as described above.

---

## **Deployment**

1. Push your changes to the GitHub repository:
   ```bash
   git add .
   git commit -m "Update documentation"
   git push
   ```

2. The GitHub Actions workflow will automatically deploy the site to GitHub Pages.