import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  if (req.nextUrl.pathname.match("/(dashboard|register)(.*)") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
