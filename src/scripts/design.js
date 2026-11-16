(() => {
  const root = document.documentElement;
  const KEY = 'theme';
  const apply = (pref) => {
    const t = pref === 'light' ? 'light' : 'dark'; // dark by default
    root.dataset.theme = t;
    document.querySelectorAll('[data-theme-set]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.themeSet === (pref || 'auto'))));
  };
  const get = () => localStorage.getItem(KEY) || 'dark';
  const set = (p) => { localStorage.setItem(KEY, p); apply(p); };
  apply(get());
  document.querySelectorAll('[data-theme-set]').forEach(b => b.addEventListener('click', () => set(b.dataset.themeSet)));
  document.querySelectorAll('[data-theme-toggle]').forEach(b => b.addEventListener('click', () => set(root.dataset.theme === 'dark' ? 'light' : 'dark')));

  // drawer
  const drawer = document.getElementById('drawer');
  const openBtn = document.querySelector('[data-menu-open]');
  const closeBtn = document.querySelector('[data-menu-close]');
  const toggle = (open) => {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    openBtn && openBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) closeBtn && closeBtn.focus(); else openBtn && openBtn.focus();
  };
  openBtn && openBtn.addEventListener('click', () => toggle(true));
  closeBtn && closeBtn.addEventListener('click', () => toggle(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) toggle(false); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', e => e.matches && toggle(false));

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // count-up
  const count = (el) => {
    const to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0);
    const fmt = v => v.toLocaleString('en-AU', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    if (reduce) { el.textContent = fmt(to); return; }
    const t0 = performance.now() + 250;
    const step = t => { const p = Math.min(1, Math.max(0, (t - t0) / 1400)); el.textContent = fmt(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
    el.textContent = fmt(0); requestAnimationFrame(step);
  };

  // reveal
  // Normally an element reveals once 15% of it is on screen. An element taller than the viewport
  // (the article body) may never get there, so it reveals as soon as any part is visible.
  const onHit = (entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      if (el.hasAttribute('data-rise')) el.classList.add('in');
      if (el.dataset.count) count(el);
      obs.unobserve(el);
    });
  };
  const hasIO = 'IntersectionObserver' in window;
  const io = hasIO ? new IntersectionObserver(onHit, { threshold: 0.15 }) : null;
  const ioTall = hasIO ? new IntersectionObserver(onHit, { threshold: 0 }) : null;
  document.querySelectorAll('[data-rise],[data-count]').forEach(el => {
    if (!hasIO) return el.classList.add('in');
    (el.offsetHeight > window.innerHeight ? ioTall : io).observe(el);
  });

  // reading progress + active TOC
  const bar = document.querySelector('.progress i');
  const heads = [...document.querySelectorAll('.prose h2[id]')];
  const tocLinks = [...document.querySelectorAll('.toc a')];
  if (bar || heads.length) {
    const prose = document.querySelector('.prose');
    const onScroll = () => {
      if (bar && prose) {
        const r = prose.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (r.height + window.innerHeight * 0.5)));
        bar.style.width = (p * 100).toFixed(1) + '%';
      }
      let cur = heads[0] && heads[0].id;
      heads.forEach(h => { if (h.getBoundingClientRect().top < 120) cur = h.id; });
      tocLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + cur));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
