import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { Routes, nonSensitiveRoutes } from './utils/routes';

export default withAuth(
  async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Manage route protection
    const isAuth = await getToken({ req });
    const isLoginPage = pathname.startsWith(Routes.login);

    const isAccessingSensitiveRoute = nonSensitiveRoutes.every(
      route => !pathname.startsWith(route)
    );

    // console.log('middleware', {
    //   pathname,
    //   isAuth,
    //   isAccessingSensitiveRoute,
    //   nonSensitiveRoutes
    // });

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL(Routes.home, req.url));
      }

      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL(Routes.login, req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      }
    }
  }
);

export const config = {
  matchter: [Routes.home, Routes.login] //, '/dashboard/:path*']
};
