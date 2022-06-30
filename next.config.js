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
            "script-src": "'self' 'unsafe-eval' https://umami.njf.dev 'sha256-fXtrHXzZuzWbrMyDp8pSAjWX2EJfMYKzeZxPtnAWO/8=' 'sha256-+n6qCniDL16DO3FYEyaFapnzcUr0xSMx30D68AgajH4=' 'sha256-lw/hDXi7c09nitSfC7ys6wF1BXBxNryDqXKYkArrXC4='",
            "connect-src": "'self' http://localhost:54321 https://umami.njf.dev https://sikyjryusjyiiehfhxmp.supabase.co https://www.clarity.ms",
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
