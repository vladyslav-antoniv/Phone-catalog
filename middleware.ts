import { type NextRequest } from 'next/server';
import { updateSession } from '@/shared/api/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};




// import createMiddleware from 'next-intl/middleware';
// import nextIntlConfig from './next-intl.config.mjs';

// export default createMiddleware(nextIntlConfig);

// export const config = {
//   matcher: ['/((?!api|_next|.*\\..*).*)'],
// };
