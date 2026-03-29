import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./lib/i18n";

function detectLocale(request: NextRequest): string {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && LOCALES.includes(cookie as (typeof LOCALES)[number]))
    return cookie;

  const lang = request.headers.get("accept-language") ?? "";
  return lang.toLowerCase().includes("es") ? "es" : DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already has a valid locale prefix — set the cookie and pass through
  for (const locale of LOCALES) {
    if (
      pathname === `/${locale}/blog` ||
      pathname.startsWith(`/${locale}/blog/`)
    ) {
      const response = NextResponse.next();
      response.cookies.set("NEXT_LOCALE", locale, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
      return response;
    }
  }

  // Bare /blog or /blog/* — detect locale and redirect
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    const locale = detectLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog", "/blog/:path*", "/:locale/blog", "/:locale/blog/:path*"],
};

