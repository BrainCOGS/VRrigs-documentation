# Base node image to run this version of the documentation site.
# `lts` always tracks the current Node LTS line, the same one the GitHub
# workflows use (`node-version: lts/*`); package.json `engines.node` is the
# minimum.
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy only the manifest, lockfile and pnpm settings to install dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install the pnpm version pinned in package.json `packageManager`. Uses npm
# because corepack is no longer bundled with Node from 25 on.
RUN npm install --global "$(node -p "require('./package.json').packageManager")"

# Install dependencies exactly as locked
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Expose the VitePress dev server port (`pnpm dev` runs on 8080)
EXPOSE 8080

# Start the VitePress dev server, reachable from outside the container
CMD ["pnpm", "dev", "--host", "0.0.0.0"]
