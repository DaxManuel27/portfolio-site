/* Particle/noise field — flow-field of points reacting to scroll velocity + mouse */
(function () {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, DPR;
  let particles = [];
  let scrollY = 0, lastScrollY = 0, scrollVel = 0;
  let mx = -9999, my = -9999;
  let tick = 0;

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    seed();
  }

  function seed() {
    const density = (window.__TWEAKS && window.__TWEAKS.particleDensity) || 1;
    const count = Math.floor((W * H) / 9000 * density);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: 0, vy: 0,
        baseSize: Math.random() * 1.2 + 0.2,
        seed: Math.random() * 1000,
        a: Math.random() * 0.5 + 0.1
      });
    }
  }

  // Cheap pseudo-noise
  function noise(x, y, t) {
    return Math.sin(x * 0.003 + t * 0.0003) * Math.cos(y * 0.004 - t * 0.0002) +
           Math.sin((x + y) * 0.0015 + t * 0.00015) * 0.5;
  }

  function step() {
    tick++;
    scrollVel = (window.scrollY - lastScrollY);
    lastScrollY = window.scrollY;
    scrollY = window.scrollY;

    // trail fade
    ctx.fillStyle = 'rgba(12, 13, 16, 0.14)';
    ctx.fillRect(0, 0, W, H);

    const intensity = (window.__TWEAKS && window.__TWEAKS.animationIntensity) || 1;
    const hue = (window.__TWEAKS && window.__TWEAKS.accentHue) || 210;

    for (let p of particles) {
      const n = noise(p.x, p.y, tick + p.seed);
      const angle = n * Math.PI * 2;
      const velBoost = 1 + Math.abs(scrollVel) * 0.02 * intensity;
      p.vx += Math.cos(angle) * 0.05 * velBoost;
      p.vy += Math.sin(angle) * 0.05 * velBoost + scrollVel * 0.004 * intensity;

      // mouse repel
      const dx = p.x - mx, dy = p.y - my;
      const d2 = dx * dx + dy * dy;
      if (d2 < 18000) {
        const d = Math.sqrt(d2) || 1;
        const f = (1 - d2 / 18000) * 0.8 * intensity;
        p.vx += (dx / d) * f;
        p.vy += (dy / d) * f;
      }

      p.vx *= 0.92; p.vy *= 0.92;
      p.x += p.vx; p.y += p.vy;

      // wrap
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      // draw
      const speed = Math.min(Math.hypot(p.vx, p.vy), 3);
      const alpha = p.a * (0.5 + speed * 0.25);
      ctx.beginPath();
      ctx.fillStyle = `oklch(0.92 0.01 ${hue} / ${alpha})`;
      ctx.arc(p.x, p.y, p.baseSize + speed * 0.3, 0, Math.PI * 2);
      ctx.fill();

      // occasional connecting streaks
      if (speed > 0.8 && Math.random() < 0.04 * intensity) {
        ctx.strokeStyle = `oklch(0.92 0.01 ${hue} / ${alpha * 0.4})`;
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 6, p.y - p.vy * 6);
        ctx.stroke();
      }
    }

    requestAnimationFrame(step);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  window.addEventListener('mouseleave', () => { mx = -9999; my = -9999; });

  resize();
  step();

  window.__particles = { reseed: seed };
})();
