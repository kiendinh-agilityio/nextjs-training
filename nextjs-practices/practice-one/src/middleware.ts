import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const generateNonce = () => {
  const array = new Uint8Array(16);
  globalThis.crypto.getRandomValues(array);

  return btoa(String.fromCharCode(...array));
};

export const middleware = auth(async (req: NextRequest) => {
  if (req.nextUrl.pathname === '/profile') {
    // @ts-expect-error: auth wrapper injects req.auth
    if (!req.auth?.user) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Generate a unique nonce for each request (Edge Runtime compatible)
  const nonce = generateNonce();

  // Allow 'unsafe-eval' in development for React's development builds
  const isDevelopment = process.env.NODE_ENV === 'development';
  const unsafeEval = isDevelopment ? " 'unsafe-eval'" : '';

  // Define the CSP header with development-aware script-src policy
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}'${unsafeEval};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    connect-src 'self' https://683ff7ba5b39a8039a564c58.mockapi.io;
  `;

  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim();

  const response = NextResponse.next();
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  );
  response.headers.set('x-nonce', nonce);

  return response;
});

export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|login|register|.*\\.png$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
    '/profile',
  ],
};
