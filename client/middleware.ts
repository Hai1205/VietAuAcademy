import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('access-token')?.value;

    // Nếu truy cập /admin/* mà không có token, redirect to /auth/login
    if (pathname.startsWith('/admin') && !token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Nếu truy cập /auth/* mà có token, redirect to /admin
    if (pathname.startsWith('/auth') && token) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/auth/:path*'],
};