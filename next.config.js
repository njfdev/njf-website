/** @type {import('next').NextConfig} */
const nextSafe = require('next-safe');

const isDev = process.env.NODE_ENV !== 'production';

const config = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: nextSafe({ 
          contentSecurityPolicy: {
            "style-src": "'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src": "'self' https://fonts.gstatic.com",
            "script-src": "'self' 'unsafe-eval' https://umami.njf.dev 'sha256-hazlti5/8Rt3rP4lshWee69xqYGy9Gk0D6w3YXZYYZk=' 'sha256-+n6qCniDL16DO3FYEyaFapnzcUr0xSMx30D68AgajH4=' 'sha256-lw/hDXi7c09nitSfC7ys6wF1BXBxNryDqXKYkArrXC4=' https://*.clarity.ms https://c.bing.com",
            "connect-src": "'self' https://umami.njf.dev https://sikyjryusjyiiehfhxmp.supabase.co https://*.clarity.ms https://c.bing.com",
            "frame-src": "'self'",
          },
        }),
      },
    ]
  },
  swcMinify: !isDev,
  reactStrictMode: true
};

module.exports = config
