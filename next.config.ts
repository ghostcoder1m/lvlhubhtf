import type { NextConfig } from "next";

const config: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
};

export default config;
