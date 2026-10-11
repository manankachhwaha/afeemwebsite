import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
