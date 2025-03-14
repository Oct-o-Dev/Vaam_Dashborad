// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import { supabase } from "./supabase";

export async function middleware(request: NextRequest) {
  const publicPaths = ["/signin", "/signup"];
  const path = request.nextUrl.pathname;

  // Allow public paths to bypass authentication
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  // Use the imported supabase client directly
  const { data: { session }, error } = await supabase.auth.getSession();

  // If there's no session, redirect to the sign-in page
  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Continue to the requested page
  return NextResponse.next();
}

// Optional: Define which paths this middleware applies to
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};