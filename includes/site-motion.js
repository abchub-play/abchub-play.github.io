(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let revealObserver = null;

  function injectAmbient() {
    if (document.querySelector('.ambient-bg')) return;

    const ambient = document.createElement('div');
    ambient.className = 'ambient-bg';
    ambient.setAttribute('aria-hidden', 'true');
    ambient.innerHTML = `
      <div class="ambient-orb ambient-orb-a"></div>
      <div class="ambient-orb ambient-orb-b"></div>
      <div class="ambient-orb ambient-orb-c"></div>
    `;

    const veil = document.createElement('div');
    veil.className = 'page-veil';
    veil.setAttribute('aria-hidden', 'true');

    document.body.prepend(ambient);
    document.body.appendChild(veil);
  }

  function wrapStage() {
    if (document.querySelector('.page-stage')) return;

    const stage = document.createElement('div');
    stage.className = 'page-stage';

    const nodes = Array.from(document.body.childNodes).filter((node) => {
      if (node.nodeType === 3) return node.textContent.trim();
      if (node.nodeType !== 1) return false;
      if (node.classList.contains('ambient-bg') || node.classList.contains('page-veil')) return false;
      if (node.tagName === 'SCRIPT') return false;
      return true;
    });

    nodes.forEach((node) => stage.appendChild(node));
    document.body.appendChild(stage);
  }

  function getRevealTargets() {
    return document.querySelectorAll([
      '.hero',
      '.hero-title',
      '.hero-subtitle',
      '.app-buttons',
      '.section-title',
      '.game-card',
      '.feature-card',
      '.features',
      '.contact-container',
      '.contact-heading',
      '.contact-subheading',
      '.contact-card',
      '.social-links',
      '.response-time',
      '.privacy-container',
      '.privacy-header',
      '.privacy-title',
      '.privacy-subtitle',
      '.effective-date',
      '.privacy-content',
      '.policy-section',
      '.footer'
    ].join(','));
  }

  function markReveals() {
    getRevealTargets().forEach((el, index) => {
      if (!el.hasAttribute('data-reveal')) {
        const zoomLike = el.classList.contains('game-card')
          || el.classList.contains('feature-card')
          || el.classList.contains('contact-card')
          || el.classList.contains('store-button');
        el.setAttribute('data-reveal', zoomLike ? 'zoom' : '');
      }

      if (!el.style.getPropertyValue('--reveal-delay')) {
        el.style.setProperty('--reveal-delay', `${Math.min(index * 0.07, 0.45)}s`);
      }
    });
  }

  function observeReveals() {
    const items = document.querySelectorAll('[data-reveal]:not(.is-inview)');
    if (!items.length) return;

    if (reduced) {
      items.forEach((el) => el.classList.add('is-inview'));
      return;
    }

    if (revealObserver) revealObserver.disconnect();

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-inview');
        revealObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -4% 0px'
    });

    items.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      if (inView) {
        el.classList.add('is-inview');
      } else {
        revealObserver.observe(el);
      }
    });
  }

  function refreshReveals() {
    markReveals();
    observeReveals();
  }

  function bindScrollAtmosphere() {
    if (reduced) return;

    let ticking = false;

    const update = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / max, 0), 1);
      document.documentElement.style.setProperty('--bg-shift', `${progress * 64}deg`);
      document.documentElement.style.setProperty('--bg-depth', `${0.65 + progress * 0.7}`);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });

    update();
  }

  function isInternalNav(anchor) {
    if (!anchor || !anchor.href) return false;
    if (anchor.target === '_blank') return false;
    if (anchor.hasAttribute('download')) return false;

    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === window.location.pathname && url.hash) return false;

    const current = window.location.pathname.replace(/\/$/, '') || '/';
    const next = url.pathname.replace(/\/$/, '') || '/';
    return current !== next || url.search !== window.location.search;
  }

  function bindPageTransitions() {
    if (reduced) return;

    document.addEventListener('click', (event) => {
      const anchor = event.target.closest('a.nav-link, a.footer-link');
      if (!isInternalNav(anchor)) return;

      event.preventDefault();
      const href = anchor.href;

      document.body.classList.remove('is-entering');
      document.body.classList.add('is-leaving');

      window.setTimeout(() => {
        window.location.href = href;
      }, 380);
    });
  }

  function watchDynamicContent() {
    const root = document.querySelector('.page-stage') || document.body;
    const observer = new MutationObserver(() => {
      window.clearTimeout(watchDynamicContent._timer);
      watchDynamicContent._timer = window.setTimeout(refreshReveals, 80);
    });
    observer.observe(root, { childList: true, subtree: true });
  }

  function boot() {
    injectAmbient();
    wrapStage();
    document.body.classList.add('is-entering');
    markReveals();
    observeReveals();
    bindScrollAtmosphere();
    bindPageTransitions();
    watchDynamicContent();

    window.setTimeout(() => {
      document.body.classList.remove('is-entering');
      refreshReveals();
    }, 900);

    window.setTimeout(refreshReveals, 1400);
  }

  window.siteMotionRefresh = refreshReveals;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
