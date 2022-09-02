/** @type {import('next').NextConfig} */
const nextSafe = require('next-safe');
const { withSentryConfig } = require('@sentry/nextjs');

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
            "script-src": "'self' 'unsafe-eval' https://matomo.njf.dev https://umami.njf.dev 'sha256-+n6qCniDL16DO3FYEyaFapnzcUr0xSMx30D68AgajH4=' 'sha256-lw/hDXi7c09nitSfC7ys6wF1BXBxNryDqXKYkArrXC4='",
            "connect-src": "'self' https://umami.njf.dev https://sikyjryusjyiiehfhxmp.supabase.co https://matomo.njf.dev https://*.ingest.sentry.io ws:",
            "frame-src": "'self'",
          },
        }),
      },
    ]
  },
  sentry: {
    hideSourceMaps: true,
  },
  swcMinify: !isDev,
  reactStrictMode: true
};

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(config, sentryWebpackPluginOptions);
