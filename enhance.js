/* Portfolio 2.1 enhancement layer. Loads after app.js. If this file fails to load,
   the original page keeps working. Everything respects the existing pause control
   (html.motion-paused) and prefers-reduced-motion. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)');
  const isStill = () => reduced.matches || root.classList.contains('motion-paused');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- Ambient layers ---------- */
  const progress = $('.progress');
  const glow = $('.cursor-glow');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const max = root.scrollHeight - innerHeight;
      if (progress) progress.style.setProperty('--p', max > 0 ? clamp(scrollY / max, 0, 1).toFixed(4) : 0);
      updateProcess();
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  if (glow && finePointer.matches) {
    let gx = innerWidth / 2, gy = innerHeight / 3, tx = gx, ty = gy, raf = 0;
    const loop = () => {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.transform = `translate3d(${gx}px,${gy}px,0)`;
      raf = Math.abs(tx - gx) + Math.abs(ty - gy) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    addEventListener('pointermove', e => {
      if (isStill()) return;
      glow.classList.add('on');
      tx = e.clientX; ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    document.addEventListener('pointerleave', () => glow.classList.remove('on'));
  }

  /* ---------- Rotating "I have built" line ---------- */
  const wordEl = $('#rotator-word');
  if (wordEl) {
    const words = [
      'a full ERP', 'an AI finance analyst', 'a face-recognition gate', 'a field-service platform',
      'an AI material visualiser', 'a VoIP call centre', 'an offline warehouse app', 'a research scraper',
      'an attendance and HR system', 'an AI product-film pipeline', 'a bilingual national website', 'a guided quote funnel'
    ];
    let wi = 0, ci = 0, dir = 1, timer = 0;
    const tick = () => {
      if (isStill()) { wordEl.textContent = words[0]; timer = setTimeout(tick, 1200); return; }
      const w = words[wi];
      ci += dir;
      wordEl.textContent = w.slice(0, ci);
      let delay = dir > 0 ? 52 + Math.random() * 38 : 24;
      if (dir > 0 && ci === w.length) { dir = -1; delay = 1650; }
      else if (dir < 0 && ci === 0) { dir = 1; wi = (wi + 1) % words.length; delay = 320; }
      timer = setTimeout(tick, delay);
    };
    wordEl.textContent = words[0];
    if (!isStill()) { ci = words[0].length; timer = setTimeout(() => { dir = -1; tick(); }, 1800); }
    else timer = setTimeout(tick, 1200);
  }

  /* ---------- Count-up numbers ---------- */
  const fmt = (n, el) => (el.dataset.format === 'plain' ? String(n) : n.toLocaleString('en-US')) + (el.dataset.suffix || '');
  const countUp = el => {
    const to = Number(el.dataset.to);
    if (isStill() || !Number.isFinite(to)) { el.textContent = fmt(to, el); return; }
    const t0 = performance.now(), dur = 1500;
    const step = now => {
      const p = clamp((now - t0) / dur, 0, 1);
      el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - p, 3))), el);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { countUp(e.target); io.unobserve(e.target); }
    }), { threshold: .6 });
    $$('.count').forEach(el => { if (!isStill()) el.textContent = fmt(0, el); io.observe(el); });
  }

  /* ---------- Spotlight on cards ---------- */
  const spot = (el, e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  $$('.cap').forEach(c => c.addEventListener('pointermove', e => spot(c, e)));

  /* ---------- 3D tilt + glare on project cards ---------- */
  const tiltTargets = new Set();
  const attachTilt = () => {
    $$('.project-stage').forEach(stage => {
      if (tiltTargets.has(stage)) return;
      tiltTargets.add(stage);
      const glare = document.createElement('i');
      glare.className = 'glare';
      glare.setAttribute('aria-hidden', 'true');
      stage.append(glare);
      stage.addEventListener('pointermove', e => {
        if (isStill() || e.pointerType === 'touch') return;
        const r = stage.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        stage.style.setProperty('--ry', `${((px - .5) * 9).toFixed(2)}deg`);
        stage.style.setProperty('--rx', `${((.5 - py) * 7).toFixed(2)}deg`);
        stage.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
        stage.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
        stage.style.transition = 'transform .08s linear';
      });
      stage.addEventListener('pointerleave', () => {
        stage.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1)';
        stage.style.setProperty('--rx', '0deg');
        stage.style.setProperty('--ry', '0deg');
      });
    });
  };
  attachTilt();

  /* ---------- Magnetic buttons ---------- */
  if (finePointer.matches) {
    $$('.button-accent, .nav-contact, .brief .send').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        if (isStill()) return;
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * .22, y = (e.clientY - r.top - r.height / 2) * .32;
        btn.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- Hero constellation ---------- */
  const canvas = $('#constellation');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = 1, dots = [], mouse = { x: -999, y: -999 }, raf = 0, onScreen = true;
    const build = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(clamp(w * h / 15000, 26, 90));
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22,
        r: Math.random() * 1.4 + .5, c: Math.random() < .14 ? '255,184,107' : Math.random() < .35 ? '154,140,255' : '113,223,255'
      }));
    };
    const draw = moving => {
      ctx.clearRect(0, 0, w, h);
      const LINK = clamp(w / 11, 90, 150);
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        if (moving) {
          a.x += a.vx; a.y += a.vy;
          if (a.x < 0 || a.x > w) a.vx *= -1;
          if (a.y < 0 || a.y > h) a.vy *= -1;
          const dx = a.x - mouse.x, dy = a.y - mouse.y, d = Math.hypot(dx, dy);
          if (d < 140 && d > 0) { a.x += dx / d * .7; a.y += dy / d * .7; }
        }
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.283); ctx.fillStyle = `rgba(${a.c},.75)`; ctx.fill();
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) { ctx.strokeStyle = `rgba(113,223,255,${(1 - d / LINK) * .22})`; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      }
    };
    const frame = () => {
      raf = 0;
      if (isStill() || !onScreen || document.hidden) return;
      draw(true);
      raf = requestAnimationFrame(frame);
    };
    const kick = () => { cancelAnimationFrame(raf); raf = 0; if (isStill()) draw(false); else if (onScreen && !document.hidden) raf = requestAnimationFrame(frame); };
    build(); draw(false); kick();
    addEventListener('resize', () => { build(); draw(false); });
    const hero = canvas.parentElement;
    hero.addEventListener('pointermove', e => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
    document.addEventListener('visibilitychange', kick);
    reduced.addEventListener('change', kick);
    new MutationObserver(kick).observe(root, { attributes: true, attributeFilter: ['class'] });
    if ('IntersectionObserver' in window) new IntersectionObserver(es => { onScreen = es[0].isIntersecting; kick(); }).observe(hero);
  }

  /* ---------- Process timeline fills as you scroll ---------- */
  const track = $('.process-track');
  const steps = $$('.step', track || document);
  function updateProcess() {
    if (!track) return;
    const r = track.getBoundingClientRect();
    const horizontal = getComputedStyle(track).gridTemplateColumns.split(' ').length > 1;
    const start = innerHeight * .78, span = horizontal ? innerHeight * .35 : r.height;
    const p = clamp((start - r.top) / (span + (horizontal ? 0 : innerHeight * .1)), 0, 1);
    track.style.setProperty('--fill', p.toFixed(3));
    steps.forEach((s, i) => s.classList.toggle('on', p >= i / (steps.length - 1) - .02 && p > 0.02));
  }

  /* ---------- Links that point at <details> open them ---------- */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
    if (!target) return;
    const det = target.tagName === 'DETAILS' ? target : target.closest('details');
    if (det) det.open = true;
    target.classList?.add('visible');
  });
  // Capability cards that point at a specific project card (built dynamically by app.js).
  $$('[data-goto]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const card = document.getElementById(a.dataset.goto);
    const cat = a.dataset.categoryLink;
    if (cat) $$('.filters button').find(b => b.dataset.filter === cat)?.click();
    setTimeout(() => { if (card) { card.classList.add('visible'); card.scrollIntoView({ behavior: isStill() ? 'auto' : 'smooth', block: 'center' }); } }, 60);
  }));

  /* ---------- Ribbon content ---------- */
  const fill = (id, items) => {
    const row = document.getElementById(id);
    if (!row) return;
    const once = items.map(t => `<span>${t}</span>`).join('');
    row.innerHTML = once + once + once + once;
  };
  fill('ribbon-a', ['Business platforms', 'AI bots', 'Automation', 'Face recognition', 'Websites', 'Mobile apps', 'Integrations', 'Dashboards']);
  fill('ribbon-b', ['React', 'Node.js', 'PHP', 'PostgreSQL', 'MySQL', 'Three.js', 'Claude API', 'Gemini API', 'FreePBX', 'Nginx', 'PM2', 'Leaflet', 'PWA', 'SEO']);

  /* ---------- Brief builder -> WhatsApp ---------- */
  const brief = $('#brief');
  if (brief) {
    const chips = $$('.chip[data-kind="need"]', brief);
    const times = $$('.chip[data-kind="time"]', brief);
    const text = $('#brief-text', brief);
    const out = $('#brief-preview', brief);
    const send = $('#brief-send', brief);
    const build = () => {
      const needs = chips.filter(c => c.getAttribute('aria-pressed') === 'true').map(c => c.dataset.value);
      const time = times.find(c => c.getAttribute('aria-pressed') === 'true')?.dataset.value;
      const lines = ['Hi Ali, I found your portfolio.'];
      lines.push(needs.length ? `I need help with: ${needs.join(', ')}.` : 'I have a project idea I would like to talk through.');
      if (time) lines.push(`Timeline: ${time}.`);
      if (text.value.trim()) lines.push(`About it: ${text.value.trim()}`);
      const msg = lines.join('\n');
      out.textContent = msg;
      send.href = 'https://wa.me/923491979171?text=' + encodeURIComponent(msg);
    };
    chips.forEach(c => c.addEventListener('click', () => { c.setAttribute('aria-pressed', String(c.getAttribute('aria-pressed') !== 'true')); build(); }));
    times.forEach(c => c.addEventListener('click', () => {
      const was = c.getAttribute('aria-pressed') === 'true';
      times.forEach(t => t.setAttribute('aria-pressed', 'false'));
      c.setAttribute('aria-pressed', String(!was)); build();
    }));
    text.addEventListener('input', build);
    build();
  }

  onScroll();
})();
