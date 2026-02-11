import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname !== url.pathname.toLowerCase()) {
    const newUrl = new URL(url);
    newUrl.pathname = url.pathname.toLowerCase();

    return NextResponse.redirect(newUrl, { status: 301 });
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
