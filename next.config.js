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
            "style-src": "'self' 'unsafe-inline' https://fonts.googleapis.com http://fonts.googleapis.com",
            "font-src": "'self' https://fonts.gstatic.com http://fonts.gstatic.com",
            "script-src": `https://js.stripe.com https://matomo.njf.dev 'self' 'unsafe-eval' 'unsafe-inline' https://umami.njf.dev 'sha256-+n6qCniDL16DO3FYEyaFapnzcUr0xSMx30D68AgajH4=' 'sha256-lw/hDXi7c09nitSfC7ys6wF1BXBxNryDqXKYkArrXC4=' 'sha256-HR7DoDjT5hh9RbbFZI/aUcpwqMMH4bDdonu+zKO/MjY='`,
            "connect-src": `'self' ws: https://matomo.njf.dev http://localhost:54321 https://umami.njf.dev https://sikyjryusjyiiehfhxmp.supabase.co`,
            "frame-src": `'self' https://js.stripe.com`,
            "img-src": `'self' data: https://*.stripe.com https://sikyjryusjyiiehfhxmp.supabase.co`,
            "form-action": `'self' https://*.stripe.com`,
          },
        }),
      },
    ]
  },
  swcMinify: !isDev,
  reactStrictMode: true,
  images: {
    domains: ['sikyjryusjyiiehfhxmp.supabase.co'],
  },
};

module.exports = config
