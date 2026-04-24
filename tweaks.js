/* Tweaks panel — register with host, mount controls, apply values live + persist */
(function () {
  function applyTweaks(t) {
    const root = document.documentElement;
    root.style.setProperty('--accent-hue', t.accentHue);
    root.style.setProperty('--accent-c', t.accentChroma);
    root.style.setProperty('--grain-opacity', t.grainAmount);
    if (window.__particles && window.__particles.reseed) window.__particles.reseed();
  }

  function mountPanel() {
    const root = document.getElementById('tweaks-root');
    root.innerHTML = `
      <div class="tweaks-panel" id="tweaks-panel">
        <h3><span>Tweaks</span><button class="tclose" id="tweaks-close">[x]</button></h3>
        <div class="tcontrol">
          <label>Accent hue <span class="val" id="v-hue">210</span></label>
          <input type="range" id="t-hue" min="0" max="360" step="1">
        </div>
        <div class="tcontrol">
          <label>Accent chroma <span class="val" id="v-chroma">0.015</span></label>
          <input type="range" id="t-chroma" min="0" max="0.2" step="0.005">
        </div>
        <div class="tcontrol">
          <label>Animation intensity <span class="val" id="v-intensity">1.0</span></label>
          <input type="range" id="t-intensity" min="0" max="2" step="0.1">
        </div>
        <div class="tcontrol">
          <label>Grain <span class="val" id="v-grain">0.06</span></label>
          <input type="range" id="t-grain" min="0" max="0.25" step="0.01">
        </div>
        <div class="tcontrol">
          <label>Particle density <span class="val" id="v-density">1.0</span></label>
          <input type="range" id="t-density" min="0" max="3" step="0.1">
        </div>
        <div class="tcontrol">
          <label>Cursor mode</label>
          <div class="seg" id="t-cursor">
            <button data-v="off">Off</button>
            <button data-v="subtle">Subtle</button>
            <button data-v="magnetic">Magnetic</button>
          </div>
        </div>
      </div>
    `;

    const panel = document.getElementById('tweaks-panel');
    const T = window.__TWEAKS;

    function setVal(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
    function setInput(id, val) { const el = document.getElementById(id); if (el) el.value = val; }
    function sync() {
      setInput('t-hue', T.accentHue); setVal('v-hue', Math.round(T.accentHue));
      setInput('t-chroma', T.accentChroma); setVal('v-chroma', Number(T.accentChroma).toFixed(3));
      setInput('t-intensity', T.animationIntensity); setVal('v-intensity', Number(T.animationIntensity).toFixed(1));
      setInput('t-grain', T.grainAmount); setVal('v-grain', Number(T.grainAmount).toFixed(2));
      setInput('t-density', T.particleDensity); setVal('v-density', Number(T.particleDensity).toFixed(1));
      document.querySelectorAll('#t-cursor button').forEach(b => b.classList.toggle('on', b.dataset.v === T.cursorMode));
    }
    sync();
    applyTweaks(T);

    function send(edits) {
      Object.assign(T, edits);
      applyTweaks(T);
      sync();
      try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*'); } catch (e) {}
    }

    document.getElementById('t-hue').addEventListener('input', e => send({ accentHue: +e.target.value }));
    document.getElementById('t-chroma').addEventListener('input', e => send({ accentChroma: +e.target.value }));
    document.getElementById('t-intensity').addEventListener('input', e => send({ animationIntensity: +e.target.value }));
    document.getElementById('t-grain').addEventListener('input', e => send({ grainAmount: +e.target.value }));
    document.getElementById('t-density').addEventListener('input', e => send({ particleDensity: +e.target.value }));
    document.querySelectorAll('#t-cursor button').forEach(b => {
      b.addEventListener('click', () => send({ cursorMode: b.dataset.v }));
    });
    document.getElementById('tweaks-close').addEventListener('click', () => panel.classList.remove('open'));

    // toggle via footer button as well
    document.addEventListener('click', (e) => {
      if (e.target && e.target.id === 'tweaks-toggle') panel.classList.toggle('open');
    });

    return panel;
  }

  // Wire host protocol — listen first, then announce
  window.addEventListener('message', (ev) => {
    const d = ev.data;
    if (!d || typeof d !== 'object') return;
    if (d.type === '__activate_edit_mode') {
      document.getElementById('tweaks-panel').classList.add('open');
    } else if (d.type === '__deactivate_edit_mode') {
      document.getElementById('tweaks-panel').classList.remove('open');
    }
  });

  // Mount on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { mountPanel(); try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {} });
  } else {
    mountPanel();
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}
  }

  window.__applyTweaks = applyTweaks;
})();
