import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { User } from '@/types/user';

export const middleware = auth(async (req: NextRequest) => {
  const reqWithAuth = req as NextRequest & { auth?: { user?: User } };
  if (reqWithAuth.nextUrl.pathname === '/profile') {
    if (!reqWithAuth.auth?.user) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
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
