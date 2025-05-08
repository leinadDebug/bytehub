import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    // Get the token from the cookie
    const token = request.cookies.get('auth_token')?.value;

    // Define protected routes
    const protectedRoutes = ['/dashboard'];
    const isProtectedRoute = protectedRoutes.some(route =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        if (!token) {
            // Redirect to login if no token is present
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            // Verify the token
            const secret = new TextEncoder().encode(
                process.env.JWT_SECRET || ''
            );
            await jwtVerify(token, secret);

            // Token is valid, allow the request
            return NextResponse.next();
        } catch (error) {
            // Token is invalid, redirect to login
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
    matcher: ['/dashboard/:path*']
};



// import { NextResponse } from "next/server"
// import { authMiddleware } from "./middlewares/api/authMiddleware";
// export const config = {
//     matcher: "/api/:path*",
// }
// export default function middleware(request: Request) {
//     const authResult = authMiddleware(request)
//     if (!authResult.isValid && request.url.includes('/api/blogs')) {
//         return new NextResponse(JSON.stringify({ message: 'Unauthorized access' }), { status: 401 })
//     }