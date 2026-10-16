import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  // Lets the public forms post enquiries to the CMS inbox (set CMS_URL in the Cloudflare Pages build env).
  env: { NEXT_PUBLIC_CMS_URL: process.env.CMS_URL ?? "" },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
