import createMiddleware from 'next-intl/middleware';
import nextIntlConfig from './next-intl.config.mjs';

export default createMiddleware(nextIntlConfig);

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
