import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Define routes that require authentication
const protectedRoutes = [
    "/dashboard/admin",
    "/dashboard/helper",
    "/dashboard/needer",
    "/dashboard",
];

export const config = {
    matcher: [
        "/dashboard/:path*", // Protect all dashboard routes
        "/payment/:path*"
    ],
};

export default async function middleware(request: NextRequest) {
    const { nextUrl } = request;

    // Retrieve token from NextAuth
    const token = await getToken({ req: request, secret: process.env.SECRET });

    const isAuthRoute = nextUrl.pathname.startsWith("/signin") || nextUrl.pathname.startsWith("/signup");

    // If user is not logged in and tries to access a protected route, redirect to /signin
    if (!token && protectedRoutes.some((route) => nextUrl.pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    // If user is logged in
    if (token) {
        const validRoles = ["admin", "helper", "needer"];
        const userRole = token.role as string;

        // Check for valid role
        if (!validRoles.includes(userRole)) {
            return NextResponse.redirect(new URL("/signin", request.url));
        }

        // Redirect authenticated users away from signin/signup routes to their dashboard
        if (isAuthRoute) {
            return NextResponse.redirect(new URL(`/dashboard/${userRole}`, request.url));
        }

        // Prevent unauthorized access to other dashboard routes
        if (nextUrl.pathname.startsWith("/dashboard") && !nextUrl.pathname.includes(userRole)) {
            return NextResponse.redirect(new URL(`/dashboard/${userRole}`, request.url));
        }
    }

    // Allow unauthenticated users access to signin/signup routes
    if (isAuthRoute && !token) {
        return NextResponse.next();
    }

    return NextResponse.next();
}
