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
      {
        protocol: "https",
        hostname: "private-user-images.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "camo.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.mos.cms.futurecdn.net",
      },
    ],
  },
};

module.exports = nextConfig;
