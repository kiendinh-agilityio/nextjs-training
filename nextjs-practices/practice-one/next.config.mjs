/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV === 'development';
const apiOrigin = process.env.NEXT_PUBLIC_API_ORIGIN || '';
const unsafeEval = isDevelopment ? " 'unsafe-eval'" : '';

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' ${unsafeEval};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
  connect-src 'self' ${apiOrigin ? ' ' + apiOrigin : ''};
`
  .replace(/\s{2,}/g, ' ')
  .trim();

const nextConfig = {
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
