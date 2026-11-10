/**
 * Headless layout check: no horizontal overflow at standard breakpoints (item 8/10).
 */
import http from 'node:http';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.AUDIT_PREVIEW_PORT) || 3099;
const BASE = `http://127.0.0.1:${PORT}`;

const ROUTES = [
  '/',
  '/bodycam-aimbot/',
  '/bodycam-esp/',
  '/bodycam-cheats-price/',
  '/bodycam-requirements/',
  '/cloud-dma-for-bodycam/',
  '/faq/',
  '/about/',
  '/support/',
  '/privacy/',
  '/terms/',
  '/guides/cloud-dma-setup/',
  '/hwid-spoofer/',
];

const VIEWPORTS = [
  { width: 320, height: 720 },
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1024, height: 900 },
  { width: 1440, height: 900 },
];

function waitForServer(ms = 15000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(`${BASE}/`, (res) => {
        res.resume();
        resolve();
      });
      req.on('error', () => {
        if (Date.now() - start > ms) reject(new Error('preview server timeout'));
        else setTimeout(tick, 250);
      });
    };
    tick();
  });
}

async function main() {
  const serve = spawn(process.execPath, ['scripts/serve.mjs'], {
    cwd: root,
    env: { ...process.env, PORT: String(PORT) },
    stdio: 'ignore',
    shell: false,
  });

  const kill = () => {
    try {
      serve.kill('SIGTERM');
    } catch {
      /* ignore */
    }
  };
  process.on('exit', kill);

  try {
    await waitForServer();
  } catch (e) {
    kill();
    console.error(`audit-responsive: ${e.message}`);
    process.exit(1);
  }

  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    kill();
    console.error('audit-responsive: install playwright (npm i -D playwright)');
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const errors = [];

  try {
    const page = await browser.newPage();
    for (const route of ROUTES) {
      for (const vp of VIEWPORTS) {
        await page.setViewportSize(vp);
        const url = `${BASE}${route === '/' ? '/' : route}`;
        const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        if (!resp || resp.status() >= 400) {
          errors.push(`${route} @ ${vp.width}px: HTTP ${resp?.status() ?? 'failed'}`);
          continue;
        }
        const overflow = await page.evaluate(() => {
          const maxScroll =
            Math.max(
              document.documentElement.scrollWidth - window.innerWidth,
              document.body.scrollWidth - window.innerWidth,
            ) || 0;
          if (maxScroll <= 2) return false;
          const before = window.scrollX;
          window.scrollTo(maxScroll, 0);
          const moved = Math.abs(window.scrollX - before);
          window.scrollTo(0, 0);
          return moved > 2;
        });
        if (overflow) {
          errors.push(`${route} @ ${vp.width}px: user-scrollable horizontal overflow`);
        }
      }
    }
  } finally {
    await browser.close();
    kill();
  }

  if (errors.length) {
    console.error('audit-responsive failed:\n' + errors.map((e) => `  ✗ ${e}`).join('\n'));
    process.exit(1);
  }

  console.log(`audit-responsive: OK (${ROUTES.length} routes × ${VIEWPORTS.length} viewports)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
