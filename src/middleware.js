import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET 
  });

  const isAdminRoute = pathname.startsWith('/admin');
  const isStudentRoute = pathname.startsWith('/dashboard');

  if (isAdminRoute || isStudentRoute) {
    if (!token) {
      // Redirect unauthenticated user to login page
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Role-based authorization check
    if (isAdminRoute && token.role !== 'ADMIN') {
      // Non-admin trying to access admin dashboard, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
