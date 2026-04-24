/* Decrypt/unscramble reveal — splits target text into chars, scrambles, locks in place */
(function () {
  const CHARS = '!<>-_\\/[]{}—=+*^?#________';
  function rand(chars) { return chars[Math.floor(Math.random() * chars.length)]; }

  function scrambleEl(el) {
    if (el.__scrambled) return;
    el.__scrambled = true;
    const original = el.getAttribute('data-decrypt') || el.textContent;
    el.textContent = '';
    const chars = [...original].map(ch => {
      const span = document.createElement('span');
      span.className = 'char' + (ch === ' ' ? ' space' : ' scrambling');
      span.textContent = ch === ' ' ? ' ' : rand(CHARS);
      el.appendChild(span);
      return { span, target: ch, revealAt: 0 };
    });

    const duration = Math.min(1200, 300 + original.length * 40);
    const intensity = (window.__TWEAKS && window.__TWEAKS.animationIntensity) || 1;
    const dur = duration / intensity;
    chars.forEach((c, i) => { c.revealAt = (i / chars.length) * dur + Math.random() * 120; });

    const start = performance.now();
    function tick() {
      const t = performance.now() - start;
      let done = 0;
      chars.forEach(c => {
        if (c.target === ' ') { done++; return; }
        if (t >= c.revealAt + 250) {
          c.span.textContent = c.target;
          c.span.classList.remove('scrambling');
          done++;
        } else if (t >= c.revealAt) {
          // settling window — fewer changes
          if (Math.random() < 0.25) c.span.textContent = rand(CHARS);
        } else {
          if (Math.random() < 0.8) c.span.textContent = rand(CHARS);
        }
      });
      if (done < chars.length) requestAnimationFrame(tick);
    }
    tick();
  }

  function observe() {
    const els = document.querySelectorAll('[data-decrypt]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { scrambleEl(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    els.forEach(el => io.observe(el));

    // Reveal sections on scroll
    const reveals = document.querySelectorAll('.reveal');
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io2.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io2.observe(el));
  }

  window.__decrypt = { observe, scrambleEl };
})();
