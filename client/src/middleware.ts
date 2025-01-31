import { NextRequest, NextResponse } from 'next/server';

import { PAGES } from './config/urls.config';
import { ECookiesKeys } from './types/api.types';

export async function middleware(request: NextRequest) {
  const { url, cookies } = request;
  const refreshToken = cookies.get(ECookiesKeys.REFRESH_TOKEN)?.value;
  const isAuthPage = url.includes(PAGES.AUTH);
  const isHomePage = url.includes(PAGES.HOME);

  if (isAuthPage && refreshToken)
    return NextResponse.redirect(new URL('/', url));
  if (isAuthPage || isHomePage) return NextResponse.next();
  if (!refreshToken) return NextResponse.redirect(new URL(PAGES.AUTH, url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
