/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog.njf.dev",
      },
    ],
  },
};

module.exports = nextConfig;
