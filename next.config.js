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
            "script-src": "'self' 'unsafe-eval' https://umami-njf.vercel.app 'sha256-+n6qCniDL16DO3FYEyaFapnzcUr0xSMx30D68AgajH4=' 'sha256-lw/hDXi7c09nitSfC7ys6wF1BXBxNryDqXKYkArrXC4='",
            "connect-src": "'self' https://umami-njf.vercel.app",
            "frame-src": "'self'",
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
