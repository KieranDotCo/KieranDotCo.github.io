import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Emit directories with index.html rather than bare .html files, so clean
  // URLs resolve on any static host — not just ones that map /foo to /foo.html.
  trailingSlash: true,
  // Without this the export still emits /_next/image?url=... which needs the
  // Next image server — it 404s on Pages, and the build does NOT warn you.
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: { viewTransition: false },
};

export default nextConfig;
