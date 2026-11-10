/**
 * Instant /go/* bridge pages (preview & hosts without edge redirects).
 * Production still uses public/_redirects 302 when supported.
 */
import fs from 'node:fs';
import path from 'node:path';
import { CHECKOUT_PATH_REDIRECTS } from '../src/config/checkout-redirects.mjs';

const dist = path.join(process.cwd(), 'dist');

function bridgeHtml(destination) {
  const safe = destination.replace(/</g, '\\u003c');
  return `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <meta name="referrer" content="no-referrer" />
  <title>Secure checkout</title>
</head>
<body>
  <p hidden aria-live="polite">Opening secure checkout…</p>
  <script>(${redirectFn})(${JSON.stringify(safe)})</script>
</body>
</html>
`;
}

function redirectFn(destination) {
  try {
    const url = new URL(destination, window.location.origin);
    const incoming = new URLSearchParams(window.location.search);
    for (const [key, value] of incoming) {
      url.searchParams.set(key, value);
    }
    window.location.replace(url.toString());
  } catch {
    window.location.replace(destination);
  }
}

const written = new Set();

for (const [from, to] of CHECKOUT_PATH_REDIRECTS) {
  const route = from.endsWith('/') ? from : `${from}/`;
  if (route === '/go/' || written.has(route)) continue;
  written.add(route);

  const rel = route.replace(/^\//, '');
  const dir = path.join(dist, rel);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), bridgeHtml(to), 'utf8');
}

console.log(`write-go-bridge: ${written.size} checkout bridges → dist/go/*/`);
