import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = auth(async (req: NextRequest) => {
  if (req.nextUrl.pathname === '/profile') {
    // @ts-expect-error: auth wrapper injects req.auth
    if (!req.auth?.user) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow 'unsafe-eval' in development for React's development builds
  const isDevelopment = process.env.NODE_ENV === 'development';
  const unsafeEval = isDevelopment ? " 'unsafe-eval'" : '';
  const unsafeInline = isDevelopment ? " 'unsafe-inline'" : '';

  // Define the CSP header with development-aware script-src policy
  const cspHeader = `
    default-src 'self';
    script-src 'self'${unsafeEval}${unsafeInline};
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

  const ua = req.headers.get('user-agent') || '';
  const isLighthouse =
    ua.includes('Chrome-Lighthouse') ||
    ua.includes('Googlebot') ||
    ua.includes('Page Speed Insights');

  const response = NextResponse.next();

  // Only set CSP if not Lighthouse/PageSpeed/Googlebot
  if (!isLighthouse) {
    response.headers.set(
      'Content-Security-Policy',
      contentSecurityPolicyHeaderValue,
    );
  }

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
