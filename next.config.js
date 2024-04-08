/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        // TODO: Make the hostname more specific
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
  },
};

module.exports = nextConfig;
