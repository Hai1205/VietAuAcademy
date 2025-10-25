import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { NODE_ENV } from './constants'

/**
 * Middleware to handle authentication and access control for admin routes
 * 
 * Rules:
 * 1. If user accesses /admin and is not authenticated -> redirect to /auth/login
 * 2. If user is authenticated and tries to access /auth/* -> redirect to /admin
 * 3. If user is on mobile and tries to access /admin or /auth -> redirect to /
 */
export function middleware(request: NextRequest) {
    const response = NextResponse.next()

    // Add performance headers for faster loading
    response.headers.set('X-DNS-Prefetch-Control', 'on')

    // Enable early hints for critical resources
    if (request.nextUrl.pathname === '/') {
        response.headers.set('Link', [
            '</images/logo1.png>; rel=preload; as=image',
            '<https://fonts.googleapis.com>; rel=preconnect',
            '<https://fonts.gstatic.com>; rel=preconnect; crossorigin',
        ].join(', '))
    }

    // Optimize for static assets
    if (request.nextUrl.pathname.startsWith('/_next/static/')) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    }

    // Add server timing header for debugging
    if (NODE_ENV === 'development') {
        response.headers.set('Server-Timing', 'middleware;dur=0')
    }

    // Get the authentication token from cookies
    const authToken = request.cookies.get('token')?.value

    // Parse the user authentication status
    let isAuthenticated = false
    if (authToken) {
        try {
            // Decode JWT payload (second part)
            const payload = authToken.split('.')[1]
            const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
            // Assuming the payload has the structure with state.userAuth
            isAuthenticated = !!decodedPayload.id
        } catch (error) {
            // If parsing fails, user is not authenticated
            console.error('Error parsing auth token:', error)
            isAuthenticated = false
        }
    }

    const pathname = request.nextUrl.pathname

    // Check if user is on mobile (simplified check based on user agent)
    const userAgent = request.headers.get('user-agent') || ''
    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent)

    // If on mobile, redirect to home page for both admin and auth routes
    if (isMobile && (pathname.startsWith('/admin') || pathname.startsWith('/auth'))) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // Check if user is accessing admin routes
    if (pathname.startsWith('/admin')) {
        // If not authenticated, redirect to login page
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    }

    // Check if authenticated user is trying to access auth pages
    if (isAuthenticated && pathname.startsWith('/auth')) {
        // Redirect authenticated users away from auth pages to admin
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
        '/admin/:path*',
        '/auth/:path*'
    ],
}