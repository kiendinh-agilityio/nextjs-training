// import next server
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// import lib
import { auth } from '@/lib/auth';

// import constants
import { PRIVATE_ROUTES } from '@/constants/routes-access';

// import types
import type { User } from '@/types/user';

export const middleware = auth(async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const reqWithAuth = req as NextRequest & { auth?: { user?: User } };

  const isPrivate = PRIVATE_ROUTES.some((route) =>
    route.includes('[')
      ? pathname.startsWith(route.replace('/[id]', ''))
      : pathname === route,
  );

  if (isPrivate && !reqWithAuth.auth?.user) {
    const loginUrl = new URL('/login', req.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|register|.*\\.png$).*)',
    '/cart',
    '/profile',
  ],
};
