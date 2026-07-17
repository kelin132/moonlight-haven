import { NextResponse, type NextRequest } from 'next/server'

const SESSION_COOKIE = 'mh_session'

// Paths that guests may reach without a session.
const PUBLIC_PATHS = ['/login']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value)
  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/'),
  )

  // Unauthenticated guest trying to reach a protected page -> login.
  if (!hasSession && !isPublic) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    if (pathname !== '/') url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  // Authenticated user visiting login -> send home.
  if (hasSession && pathname === '/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/profile'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  // Run on everything except Next internals, API auth, and static assets.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
