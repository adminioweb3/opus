import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",   // Required for Docker — bundles deps into .next/standalone
};

export default nextConfig;
