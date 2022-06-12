/** @type {import('next').NextConfig} */
const nextSafe = require('next-safe');

const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: nextSafe({ isDev }),
      },
    ]
  },
  swcMinify: true,
  reactStrictMode: true
};

module.exports = nextConfig
