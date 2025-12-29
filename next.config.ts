import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ["static.tvmaze.com"], // Allow images from TVMaze domain
  },
};

export default nextConfig;
