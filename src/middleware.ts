import { defineMiddleware } from 'astro:middleware';
import { resolveCheckoutPathRedirect } from './config/checkout-redirects.mjs';

export const onRequest = defineMiddleware((context, next) => {
  const requestUrl = new URL(context.request.url);
  const destination = resolveCheckoutPathRedirect(requestUrl.pathname, requestUrl.search);
  if (destination) {
    return context.redirect(destination, 302);
  }
  return next();
});
