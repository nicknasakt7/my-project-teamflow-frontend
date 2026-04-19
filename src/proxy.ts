import { auth } from '@/lib/auth/auth';
import { NextResponse } from 'next/server';

const publicRoutes = ['/', '/login', '/forgot-password', '/reset-password'];

const employeeRoutes = ['/projects', '/tasks', '/settings'];

const adminRoutes = [
  '/dashboard',
  '/projects',
  '/employees',
  '/register-admin',
  '/settings',
];

const superAdminRoutes = [
  '/dashboard',
  '/projects',
  '/employees',
  '/register-admin',
  '/settings',
];

const ROLE = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  EMPLOYEE: 'EMPLOYEE',
};

const defaultRedirect = (role: string | undefined) => {
  if (role === ROLE.EMPLOYEE) return '/tasks';
  return '/dashboard';
};

export const proxy = auth(req => {
  const pathname = req.nextUrl.pathname;
  const isAuthenticated = !!req.auth;
  const role = req.auth?.user?.roleType;

  if (!isAuthenticated) {
    if (!publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }

  if (pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL(defaultRedirect(role), req.url));
  }

  if (pathname === '/') {
    return NextResponse.next();
  }

  const allKnownRoutes = [
    ...new Set([...employeeRoutes, ...adminRoutes, ...superAdminRoutes]),
  ];
  const isKnownRoute = allKnownRoutes.some(route => pathname.startsWith(route));

  // ถ้าไม่ใช่ route ที่รู้จัก → ให้ Next.js render 404 เอง
  if (!isKnownRoute) {
    return NextResponse.next();
  }

  // EMPLOYEE
  const isEmployeeRoute = employeeRoutes.some(route =>
    pathname.startsWith(route),
  );
  if (isEmployeeRoute && role === ROLE.EMPLOYEE) {
    return NextResponse.next();
  }

  // ADMIN
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  if (isAdminRoute && role === ROLE.ADMIN) {
    return NextResponse.next();
  }

  // SUPER_ADMIN
  const isSuperAdminRoute = superAdminRoutes.some(route =>
    pathname.startsWith(route),
  );
  if (isSuperAdminRoute && role === ROLE.SUPER_ADMIN) {
    return NextResponse.next();
  }

  // route รู้จักแต่ผิด role → redirect ไป default ของ role นั้น
  return NextResponse.redirect(new URL(defaultRedirect(role), req.url));
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|gif|svg|ico)).*)',
  ],
};
