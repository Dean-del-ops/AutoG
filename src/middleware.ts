import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('token'); // Check for the token in cookies

  const loginUrl = new URL('/login', req.url);
  const dashboardUrl = new URL('/dashboard', req.url);

  // Redirect root route to login if not authenticated
  if (!token && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if authenticated
  if (token && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next(); // Allow other requests to proceed
}

export const config = {
  matcher: ['/', '/dashboard', '/login'], // Include root in the middleware matcher
};
