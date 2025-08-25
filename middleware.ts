import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip static files and API routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }
  
  // All routes require auth except login (and root will redirect to login/dashboard)
  const isLoginPage = /^\/login\/?$/.test(pathname);
  const isRootPage = pathname === '/';
  
  if (!isLoginPage && !isRootPage && !request.cookies.get('auth-token')?.value) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Add CSP header : (this means we are defining a Content Security Policy for the application so that we can control which resources are allowed to be loaded)
  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', 
    "default-src 'self'; connect-src 'self' https://cashon.stag.cashonrails.com; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
  );
  
  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
};
