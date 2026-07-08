#!/usr/bin/env bash
# Build codingstuff for GitHub Pages (static output)
# Temporarily overrides output mode and removes Vercel adapter

set -euo pipefail

cd "$(dirname "$0")/.."

# Create a temporary config for static deployment
cat > astro.config.static.mjs << 'EOF'
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@inox-tools/sitemap-ext";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { analyzer } from "vite-bundle-analyzer";
import { loadEnv } from "vite";
import { envSchema } from "./src/envSchema";

const { SITE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

export default defineConfig({
  env: { schema: envSchema },
  server: { allowedHosts: true },
  trailingSlash: "never",
  output: "static",
  site: SITE_URL || "https://codingskuy.github.io",
  base: "/codingstuff",
  image: {
    service: { entrypoint: "astro/assets/services/noop" },
  },
  markdown: {
    rehypePlugins: [rehypeSanitize(defaultSchema)],
  },
  integrations: [
    sitemap({ includeByDefault: true }),
    mdx({ rehypePlugins: [rehypeSanitize(defaultSchema)] }),
    react(),
  ],
  vite: {
    plugins: [
      tailwindcss(),
      process.env.ANALYZE &&
        analyzer({ analyzerMode: "static", reportFilename: "dist/bundle-report.html", openAnalyzer: false }),
    ].filter(Boolean),
  },
});
EOF

# Build with static config
pnpm astro build --config astro.config.static.mjs 2>&1

# Clean up
rm astro.config.static.mjs
