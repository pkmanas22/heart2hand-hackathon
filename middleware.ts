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
        "/signin",           // Allow access to sign-in
        "/signup/:path*",    // Allow access to sign-up and nested paths
    ],
};

export default async function middleware(request:NextRequest) {
    const { nextUrl } = request;

    // Retrieve token from NextAuth
    const token = await getToken({ req: request, secret: process.env.SECRET });

    const isAuthRoute = nextUrl.pathname.startsWith("/signin") || nextUrl.pathname.startsWith("/signup");

    // If no token and route requires authentication, redirect to signin
    if (!token && protectedRoutes.some((route) => nextUrl.pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    // If token exists and user is authenticated
    if (token) {
        const validRoles = ["admin", "helper", "needer"];
        const userRole = token.role;

        // Check for valid role
        if (!validRoles.includes(userRole)) {
            return NextResponse.redirect(new URL("/signin", request.url));
        }

        // Redirect users to their respective dashboard if they try to access signin/signup
        if (isAuthRoute) {
            return NextResponse.redirect(new URL(`/dashboard/${userRole}`, request.url));
        }

        // Prevent unauthorized access to other dashboard routes
        if (nextUrl.pathname.startsWith("/dashboard") && !nextUrl.pathname.includes(userRole)) {
            return NextResponse.redirect(new URL(`/dashboard/${userRole}`, request.url));
        }
    }

    // Allow access to sign-in and sign-up routes if unauthenticated
    return NextResponse.next();
}
