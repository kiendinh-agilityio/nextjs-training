import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
  // Get the pathname of the request (e.g. /, /protected)
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" || path === "/login" || path === "/register";

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value || "";

  // Redirect logic based on authentication status
  if (isPublicPath && token) {
    // If user is logged in and tries to access public paths, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isPublicPath && !token) {
    // If user is not logged in and tries to access protected paths, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
