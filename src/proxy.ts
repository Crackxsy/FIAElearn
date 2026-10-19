import { NextResponse, type NextRequest } from "next/server";

// Optimistische Prüfung: ohne Session-Cookie direkt zum Login.
// Die echte Prüfung passiert serverseitig in requireUser().
const PROTECTED = [
  "/dashboard",
  "/plan",
  "/lernen",
  "/thema",
  "/quiz",
  "/karteikarten",
  "/wiederholen",
  "/simulation",
  "/fachgespraech",
  "/statistik",
  "/einstellungen",
  "/onboarding",
  "/einstufung",
  "/session",
  "/mehr",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const needsAuth = PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (needsAuth && !request.cookies.has("fl_session")) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|brand|icons|favicon.ico|icon.svg|manifest.webmanifest).*)"],
};
