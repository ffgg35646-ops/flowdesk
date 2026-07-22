import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("flowdesk_token")?.value;

  const { pathname } = request.nextUrl;

  const protectedRoutes = [
    "/dashboard",
    "/projects",
    "/team",
    "/tasks",
    "/invoices",
    "/reports",
    "/settings",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/team/:path*",
    "/tasks/:path*",
    "/invoices/:path*",
    "/reports/:path*",
    "/settings/:path*",
  ],
};
