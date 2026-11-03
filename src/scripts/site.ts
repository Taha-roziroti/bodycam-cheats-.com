function initFonts() {
  const root = document.documentElement;

  const markReady = () => {
    root.classList.remove('fonts-pending');
    root.classList.add('fonts-ready');
  };

  if (!document.fonts?.ready) {
    markReady();
    return;
  }

  document.fonts.ready.then(markReady).catch(markReady);
}

function initNavHighlight() {
  const path = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';

  document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((link) => {
    const href = link.getAttribute('href') ?? '';
    const linkPath = href.split('#')[0].replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
    const linkHash = href.includes('#') ? href.split('#')[1] : '';
    let isActive = false;

    if (linkHash && (linkPath === '/' || linkPath === '')) {
      isActive = path === '/';
    } else if (linkPath === '/') {
    } else {
      isActive = path === linkPath || path.startsWith(`${linkPath}/`);
    }

    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function initInPageScroll() {
  document.querySelectorAll<HTMLElement>('[data-scroll-target]').forEach((el) => {
    el.addEventListener('click', (event) => {
      const id = el.getAttribute('data-scroll-target');
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initSkipLink() {
  document.querySelectorAll<HTMLElement>('[data-skip-to-main]').forEach((button) => {
    button.addEventListener('click', () => {
      const main = document.getElementById('main-content');
      if (!main) return;

      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: false });
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initFaqFilters() {
  document.querySelectorAll('[data-faq-filters]').forEach((container) => {
    const section = container.closest('[data-faq-section]');
    const list = section?.querySelector('[data-faq-list]');
    if (!list) return;

    const items = list.querySelectorAll<HTMLElement>('[data-faq-topic]');
    const chips = container.querySelectorAll<HTMLButtonElement>('[data-faq-filter]');

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const topic = chip.getAttribute('data-faq-filter');
        chips.forEach((c) => c.classList.toggle('is-active', c === chip));
        items.forEach((item) => {
          const itemTopic = item.getAttribute('data-faq-topic');
          const show = topic === 'all' || itemTopic === topic;
          item.toggleAttribute('data-hidden', !show);
        });
      });
    });
  });
}

function initThemeMetaColor() {
  const metaTheme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (metaTheme) metaTheme.content = '#0d0a14';
}

function bootSite() {
  initFonts();
  initFaqFilters();
  initNavHighlight();
  initInPageScroll();
  initSkipLink();
  initThemeMetaColor();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootSite);
} else {
  bootSite();
}
