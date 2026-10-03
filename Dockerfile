# Base node image to run this version of the documentation site.
# Keep the major in sync with `engines.node` in package.json and the
# `node-version-file` used by the GitHub workflows (Node 24 LTS).
FROM node:24

# Set the working directory inside the container
WORKDIR /app

# pnpm version comes from the `packageManager` field in package.json.
# Corepack ships with Node 24 (it was removed from Node 25+).
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable pnpm

# Copy only the manifest, lockfile and pnpm settings to install dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies exactly as locked
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Expose the default VuePress dev server port
EXPOSE 8080

# Start the VuePress dev server
CMD ["pnpm", "dev"]
