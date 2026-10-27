/* =========================================================
   SERGIO TORO — UI
   Vanilla JS. No build step, no dependencies.
   ========================================================= */

import { initI18n, t } from './i18n.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const storage = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* private mode */ }
  },
};

const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(pointer: fine)');
let prefersReduced = storage.get('st-motion') === 'reduce' || (storage.get('st-motion') === null && reduceQuery.matches);
let mascot = null;

/* ---------------------------------------------------------
   Clock — always Nanjing (Asia/Shanghai)
   --------------------------------------------------------- */
function initClock() {
  const formatter = new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: 'Asia/Shanghai',
  });
  const tick = () => {
    const time = formatter.format(new Date());
    $$('[data-clock]').forEach((el) => { el.textContent = time; });
  };
  tick();
  window.setInterval(tick, 30000);
}

/* ---------------------------------------------------------
   Toast
   --------------------------------------------------------- */
let toastTimer;
function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

/* ---------------------------------------------------------
   Motion preference
   --------------------------------------------------------- */
function applyMotion(reduced, persist = false) {
  prefersReduced = reduced;
  document.documentElement.classList.toggle('reduce-motion', reduced);
  const toggle = $('#motion-toggle');
  if (toggle) toggle.setAttribute('aria-pressed', String(reduced));
  if (persist) storage.set('st-motion', reduced ? 'reduce' : 'motion');
  if (mascot) mascot.setReduced(reduced);
  if (reduced) {
    $$('.reveal').forEach((el) => el.classList.add('is-in'));
  }
}

function initMotion() {
  applyMotion(prefersReduced);
  const toggle = $('#motion-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      applyMotion(!prefersReduced, true);
    });
  }
  reduceQuery.addEventListener('change', (event) => {
    if (storage.get('st-motion') === null) applyMotion(event.matches);
  });
}

/* ---------------------------------------------------------
   Navigation: sticky state + scroll progress
   --------------------------------------------------------- */
function initNav() {
  const nav = $('#nav');
  const progress = $('#scroll-progress');
  let queued = false;

  const update = () => {
    queued = false;
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 24);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    if (progress) progress.style.transform = `scaleX(${ratio})`;
  };

  window.addEventListener('scroll', () => {
    if (!queued) {
      queued = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });
  update();
}

/* ---------------------------------------------------------
   Mobile menu
   --------------------------------------------------------- */
function initMenu() {
  const menu = $('#menu');
  const toggle = $('#menu-toggle');
  const closeBtn = $('#menu-close');
  if (!menu || !toggle) return;

  const pageRegions = [$('#main'), $('.footer'), $('#nav')].filter(Boolean);
  let lastFocus = null;

  const open = () => {
    lastFocus = document.activeElement;
    menu.inert = false;
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    pageRegions.forEach((el) => { el.inert = true; });
    window.setTimeout(() => {
      const first = menu.querySelector('.menu__nav a');
      if (first) first.focus();
    }, 80);
  };

  const close = (returnFocus = true) => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    menu.inert = true;
    document.body.style.overflow = '';
    pageRegions.forEach((el) => { el.inert = false; });
    if (returnFocus) {
      const target = lastFocus && document.contains(lastFocus) ? lastFocus : toggle;
      target.focus({ preventScroll: true });
    }
  };

  toggle.addEventListener('click', () => {
    if (menu.classList.contains('is-open')) close();
    else open();
  });
  if (closeBtn) closeBtn.addEventListener('click', () => close());
  $$('.menu__nav a, .menu__foot a', menu).forEach((link) => {
    link.addEventListener('click', () => close(false));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      close();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080 && menu.classList.contains('is-open')) close(false);
  });
}

/* ---------------------------------------------------------
   Reveal on scroll
   --------------------------------------------------------- */
function initReveals() {
  const elements = $$('.reveal');
  if (!elements.length) return;

  if (prefersReduced) {
    elements.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const groups = new Map();
  elements.forEach((el) => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach((siblings) => {
    siblings.forEach((el, index) => {
      el.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 70}ms`);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  elements.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   Counter animation
   --------------------------------------------------------- */
function initCounters() {
  const stats = $('.stats');
  if (!stats) return;
  const numbers = $$('[data-count]', stats);
  if (!numbers.length || prefersReduced) return;

  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    numbers.forEach((el) => {
      const target = Number(el.dataset.count) || 0;
      const start = performance.now();
      const duration = 1100;
      const step = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased)).padStart(2, '0');
        if (p < 1) requestAnimationFrame(step);
      };
      el.textContent = '00';
      requestAnimationFrame(step);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      run();
      observer.disconnect();
    }
  }, { threshold: 0.4 });
  observer.observe(stats);
}

/* ---------------------------------------------------------
   Magnetic button
   --------------------------------------------------------- */
function initMagnetic() {
  if (!finePointer.matches || prefersReduced) return;
  $$('.magnetic').forEach((el) => {
    const strength = 7;
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
      el.style.transform = `translate(${(x * strength).toFixed(2)}px, ${(y * strength * .6).toFixed(2)}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

/* ---------------------------------------------------------
   Project dialog
   --------------------------------------------------------- */
function initProjects() {
  const dialog = $('#project-dialog');
  const content = $('#modal-content');
  const closeBtn = $('#modal-close');
  if (!dialog || !content) return;

  let lastFocus = null;

  const open = (card) => {
    const titleEl = card.querySelector('.project__title');
    const title = titleEl ? titleEl.textContent.trim() : 'Proyecto';
    const summary = card.querySelector('.project__summary')?.textContent.trim() || '';
    const meta = $$('.project__meta span', card).map((el) => el.textContent.trim());
    const tags = card.querySelector('.tags');
    const visual = card.querySelector('.project__visual svg');
    const more = card.querySelector('.project__more');

    const visualWrap = document.createElement('div');
    visualWrap.className = 'modal__visual';
    visualWrap.setAttribute('aria-hidden', 'true');
    if (visual) visualWrap.append(visual.cloneNode(true));

    const body = document.createElement('div');
    body.className = 'modal__body';

    const kicker = document.createElement('div');
    kicker.className = 'modal__kicker';
    const kickerMain = document.createElement('span');
    kickerMain.textContent = meta[0] || t('project.fallback');
    const kickerYear = document.createElement('span');
    kickerYear.textContent = meta[1] || '';
    kicker.append(kickerMain, kickerYear);

    const heading = document.createElement('h2');
    heading.className = 'modal__title';
    heading.id = 'modal-title';
    heading.textContent = title;

    const summaryEl = document.createElement('p');
    summaryEl.className = 'modal__summary';
    summaryEl.textContent = summary;

    body.append(kicker, heading, summaryEl);

    if (tags) {
      const tagList = tags.cloneNode(true);
      tagList.className = 'tags modal__tags';
      body.append(tagList);
    }

    if (more) {
      const detail = more.cloneNode(true);
      detail.removeAttribute('hidden');
      body.append(detail);
    }

    const repo = card.dataset.repo;
    if (repo) {
      const repoLink = document.createElement('a');
      repoLink.className = 'btn btn--accent modal__repo';
      repoLink.href = repo;
      repoLink.target = '_blank';
      repoLink.rel = 'noopener noreferrer';
      repoLink.innerHTML = `${t('project.repo')} <svg class="icon" aria-hidden="true"><use href="#i-arrow-up-right"/></svg>`;
      body.append(repoLink);
    }

    content.replaceChildren(visualWrap, body);

    lastFocus = document.activeElement;
    document.body.style.overflow = 'hidden';

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    // Move focus to the dialog heading for screen readers.
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  };

  const close = () => {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  };

  $$('[data-project]').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('a')) return;
      if (window.getSelection()?.toString()) return;
      open(card);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', close);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    if (lastFocus && document.contains(lastFocus)) {
      lastFocus.focus({ preventScroll: true });
    }
  });
  dialog.addEventListener('cancel', () => {
    document.body.style.overflow = '';
  });
}

/* ---------------------------------------------------------
   Copy email
   --------------------------------------------------------- */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.append(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

function initCopyEmail() {
  const button = $('#copy-email');
  if (!button) return;
  const iconUse = button.querySelector('use');
  const originalIcon = iconUse ? iconUse.getAttribute('href') : null;
  let timer;
  button.addEventListener('click', async () => {
    const email = button.dataset.email || 'storocodo@gmail.com';
    const ok = await copyText(email);
    showToast(ok ? t('toast.copied') : email);
    if (ok && iconUse) {
      iconUse.setAttribute('href', '#i-check');
      window.clearTimeout(timer);
      timer = window.setTimeout(() => iconUse.setAttribute('href', originalIcon), 1800);
    }
  });
}

/* ---------------------------------------------------------
   Contact form -> mailto (static hosting friendly)
   --------------------------------------------------------- */
function initForm() {
  const form = $('#contact-form');
  const status = $('#form-status');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    const subject = `${t('form.subject')} — ${name || t('form.idea')}`;
    const body = `${message}\n\n— ${name}\n${email}`;
    const href = `mailto:storocodo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (status) status.textContent = t('form.opening');
    window.location.href = href;
  });
}

/* ---------------------------------------------------------
   Mascot
   --------------------------------------------------------- */
async function initMascot() {
  const canvas = $('#mascot-canvas');
  const stage = $('#hero-stage');
  if (!canvas || !stage) return;

  const hello = $('#mascot-hello');
  try {
    const { createMascot } = await import('./mascot.js');
    mascot = createMascot({ canvas, stage, reducedMotion: prefersReduced });
    if (!mascot) {
      stage.classList.add('is-fallback');
      return;
    }
    if (hello) {
      hello.addEventListener('click', () => {
        if (prefersReduced) {
          showToast(t('toast.quiet'));
          return;
        }
        mascot.react('wave');
      });
    }
    if (prefersReduced) mascot.setReduced(true);
  } catch (error) {
    stage.classList.add('is-fallback');
    console.warn('[mascot] 3D no disponible:', error);
  }
}

/* ---------------------------------------------------------
   Print CV (only on cv.html)
   --------------------------------------------------------- */
function initPrint() {
  const button = $('#print-cv');
  if (!button) return;
  button.addEventListener('click', () => window.print());
}

/* ---------------------------------------------------------
   Boot
   --------------------------------------------------------- */
initI18n();
initMotion();
initClock();
initNav();
initMenu();
initReveals();
initCounters();
initMagnetic();
initProjects();
initCopyEmail();
initForm();
initPrint();
initMascot();

// Expose a tiny debug hook (harmless, useful for tweaking).
window.__st = { get mascot() { return mascot; } };
