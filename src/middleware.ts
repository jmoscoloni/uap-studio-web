import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const TRACKING_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];

  // Build a URL object we can modify
  const newUrl = new URL(url.toString());
  let redirectNeeded = false;

  // Normalize pathname to lowercase
  if (url.pathname !== url.pathname.toLowerCase()) {
    newUrl.pathname = url.pathname.toLowerCase();
    redirectNeeded = true;
  }

  // Remove known tracking query params
  TRACKING_PARAMS.forEach((p) => {
    if (newUrl.searchParams.has(p)) {
      newUrl.searchParams.delete(p);
      redirectNeeded = true;
    }
  });

  if (redirectNeeded) {
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
