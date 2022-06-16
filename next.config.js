/** @type {import('next').NextConfig} */
const nextSafe = require('next-safe');

const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: nextSafe({ 
          contentSecurityPolicy: {
            "style-src": "'self' 'unsafe-inline'",
            "script-src": "'self' 'unsafe-eval'",
          },
        }),
      },
    ]
  },
  experimental: {
    nextScriptWorkers: true,
  },
  swcMinify: !isDev,
  reactStrictMode: true
};

module.exports = nextConfig
