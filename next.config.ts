import type { NextConfig } from "next";
import path from "node:path";

// NOTE: @turbodocx/next-plugin-llms uses Webpack hooks, which Next 16's
// Turbopack-based build doesn't fire. We invoke the plugin's exported
// generateLLMFiles() directly via scripts/generate-llms.mjs as a prebuild
// step (npm run build → node scripts/generate-llms.mjs && next build).

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
