import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [new URL('https://fakestoreapi.com/img/**')],
  },
}
export default nextConfig;
