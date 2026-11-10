/**
 * Detect UI that extends past the viewport or its parent box (text/button clipping).
 */
import http from 'node:http';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.AUDIT_PREVIEW_PORT) || 3101;
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
    console.error(`audit-layout-containment: ${e.message}`);
    process.exit(1);
  }

  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ headless: true });
  const errors = [];

  try {
    const page = await browser.newPage();
    for (const route of ROUTES) {
      for (const vp of VIEWPORTS) {
        await page.setViewportSize(vp);
        const url = `${BASE}${route === '/' ? '/' : route}`;
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(400);

        const issues = await page.evaluate((vw) => {
          const out = [];
          const pad = 2;

          const offenders = document.querySelectorAll(
            'a[data-slot="button"], button[data-slot="button"], [data-slot="card"], [data-floating-nav], .catalog-card--carousel, .support-section__card',
          );

          for (const el of offenders) {
            const rect = el.getBoundingClientRect();
            if (rect.width < 8 || rect.height < 8) continue;

            const inCarousel = el.closest('[data-slot="carousel-content"]');
            if (inCarousel) {
              const visible =
                Math.min(rect.right, vw) - Math.max(rect.left, 0);
              if (visible < rect.width * 0.35) continue;
            }

            if (rect.left < -pad || rect.right > vw + pad) {
              out.push({
                kind: 'viewport',
                tag: el.tagName,
                cls: (el.className || '').toString().slice(0, 80),
                left: Math.round(rect.left),
                right: Math.round(rect.right),
              });
              continue;
            }

            const parent = el.parentElement;
            if (!parent) continue;
            const pRect = parent.getBoundingClientRect();
            if (rect.right > pRect.right + pad || rect.left < pRect.left - pad) {
              const sw = el.scrollWidth;
              const cw = el.clientWidth;
              if (sw > cw + 1) {
                out.push({
                  kind: 'parent-overflow',
                  tag: el.tagName,
                  cls: (el.className || '').toString().slice(0, 80),
                  scrollExtra: sw - cw,
                });
              }
            }
          }

          return out.slice(0, 8);
        }, vp.width);

        for (const issue of issues) {
          errors.push(`${route} @ ${vp.width}px: ${issue.kind} ${issue.tag} ${issue.cls}`);
        }
      }
    }
  } finally {
    await browser.close();
    kill();
  }

  if (errors.length) {
    console.error('audit-layout-containment failed:\n' + errors.map((e) => `  ✗ ${e}`).join('\n'));
    process.exit(1);
  }

  console.log(`audit-layout-containment: OK (${ROUTES.length} routes × ${VIEWPORTS.length} viewports)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
