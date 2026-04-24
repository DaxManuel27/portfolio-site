/* Main wiring — runs after sections + other modules loaded */
(function () {
  // scroll percent in top bar
  const sp = document.getElementById('scroll-pct');
  function onScroll() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = Math.min(100, Math.max(0, (window.scrollY / h) * 100));
    if (sp) sp.textContent = String(Math.floor(p)).padStart(2, '0');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Clocks
  function pad(n) { return String(n).padStart(2, '0'); }
  function tickClock() {
    const now = new Date();
    const local = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').pop() || ''}`;
    const utc = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
    const c = document.getElementById('clock'); if (c) c.textContent = local;
    const u = document.getElementById('utc-clock'); if (u) u.textContent = utc;
    const a = document.getElementById('awake-count'); if (a) {
      const wakeup = new Date(); wakeup.setHours(7,30,0,0);
      const diff = Math.max(0, (now - wakeup) / 3600000);
      a.textContent = diff.toFixed(2) + ' h';
    }
  }
  tickClock();
  setInterval(tickClock, 1000);

  // Bind cursor/magnetic after markup
  if (window.__cursor) {
    window.__cursor.bindMagnetic();
    window.__cursor.bindCardWarp();
  }
  if (window.__decrypt) window.__decrypt.observe();

  // Smooth scroll for nav
  document.querySelectorAll('.topbar__nav a').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // Persist scroll position per section nav (not necessary for landing)
})();
