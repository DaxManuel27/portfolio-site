/* Magnetic cursor + warping interactive elements */
(function () {
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const label = document.getElementById('cursor-label');

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let dx = mx, dy = my;
  let rx = mx, ry = my;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (cursor.style.opacity !== '1') cursor.style.opacity = '1';
  });
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });

  function loop() {
    // dot follows fast, ring follows slow
    dx += (mx - dx) * 0.6;
    dy += (my - dy) * 0.6;
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    label.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  }
  loop();

  // Magnetic elements — warp nearby when mouse is close
  function bindMagnetic() {
    const els = document.querySelectorAll('[data-magnetic]');
    els.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const mode = (window.__TWEAKS && window.__TWEAKS.cursorMode) || 'magnetic';
        if (mode === 'off') return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const strength = mode === 'subtle' ? 0.15 : 0.35;
        const dxp = (e.clientX - cx) * strength;
        const dyp = (e.clientY - cy) * strength;
        el.style.transform = `translate(${dxp}px, ${dyp}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });

    // Hover state — enlarge ring on any clickable
    const hovers = document.querySelectorAll('a, button, [data-cursor]');
    hovers.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('is-hover');
        const lbl = el.getAttribute('data-cursor');
        if (lbl) { label.textContent = lbl; cursor.classList.add('is-label'); }
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-hover', 'is-label');
      });
    });
  }

  // Card warp — tilt project cards toward cursor
  function bindCardWarp() {
    const cards = document.querySelectorAll('[data-warp]');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const mode = (window.__TWEAKS && window.__TWEAKS.cursorMode) || 'magnetic';
        if (mode === 'off') return;
        const intensity = (window.__TWEAKS && window.__TWEAKS.animationIntensity) || 1;
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        const rotY = px * 8 * intensity;
        const rotX = -py * 8 * intensity;
        card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  window.__cursor = { bindMagnetic, bindCardWarp };
})();
