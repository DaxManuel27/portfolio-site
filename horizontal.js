/* Horizontal scroll inside vertical flow — pins work-sticky, translates work-track horizontally as you scroll */
(function () {
  function init() {
    const pin = document.querySelector('.work-pin');
    const sticky = document.querySelector('.work-sticky');
    const track = document.getElementById('work-track');
    const fill = document.getElementById('work-fill');
    const cur = document.getElementById('work-cur');
    if (!pin || !track) return;

    const isMobile = window.matchMedia('(max-width: 820px)').matches;
    if (isMobile) return;

    function tick() {
      const rect = pin.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = pin.offsetHeight - vh;
      const prog = Math.min(1, Math.max(0, -rect.top / total));

      const maxScroll = Math.max(0, track.scrollWidth - window.innerWidth + 80);
      track.style.transform = `translate3d(${-prog * maxScroll}px, 0, 0)`;

      if (fill) fill.style.width = (prog * 100) + '%';
      if (cur) {
        const total = (window.__sections && window.__sections.PROJECTS && window.__sections.PROJECTS.length) || 10;
        const n = Math.min(total, Math.floor(prog * total) + 1);
        cur.textContent = String(n).padStart(2, '0');
      }
      requestAnimationFrame(tick);
    }
    tick();
  }

  // run after markup exists
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
