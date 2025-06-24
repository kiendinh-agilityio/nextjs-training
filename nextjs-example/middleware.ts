import { auth } from '@/app/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard');
  const isOnLogin = req.nextUrl.pathname === '/login';

  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl));
  }

  if (isOnLogin && isLoggedIn) {
    return Response.redirect(new URL('/dashboard', req.nextUrl));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
