import { NextRequest, NextResponse } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard'
];

// Define public routes that don't require authentication
const publicRoutes = [
  '/login',
  '/'
];

// Define admin-only routes
const adminRoutes = [
  '/admin',
  '/admin/users',
  '/admin/system',
  '/admin/logs'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get authentication token from cookies
  const authToken = request.cookies.get('auth-token')?.value;
  const userRole = request.cookies.get('user-role')?.value;
  
  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if the current path is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if the current path is admin-only
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if accessing public route while authenticated
  if (isPublicRoute && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Check admin permissions for admin routes
  if (isAdminRoute && (!authToken || userRole !== 'admin')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Add security headers
  const response = NextResponse.next();
  
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
