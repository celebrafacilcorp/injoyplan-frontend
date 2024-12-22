import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"]
  },
  output: "export",
  distDir: "out"
};

export default nextConfig;
