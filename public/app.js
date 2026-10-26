(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
 const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
 const hash = (x, y, z) => { const h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return h - Math.floor(h); };

 // Pill navigation menu.
 const toggle = document.querySelector('.pill-toggle'), list = document.getElementById('pill-links');
 const setMenu = open => { toggle.setAttribute('aria-expanded', String(open)); list.hidden = !open; };
 toggle.addEventListener('click', () => setMenu(list.hidden));
 list.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
 document.addEventListener('keydown', e => { if (e.key === 'Escape' && !list.hidden) { setMenu(false); toggle.focus(); } });
 document.addEventListener('click', e => { if (!e.target.closest('.pill-menu')) setMenu(false); });

 // Portfolio filters.
 document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  let count = 0;
  document.querySelectorAll('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) count++; });
  document.querySelector('#filter-status').textContent = `${count} projet${count > 1 ? 's' : ''} affiché${count > 1 ? 's' : ''}.`;
 }));

 // Only one video plays at a time.
 document.addEventListener('play', e => { if (e.target.tagName === 'VIDEO') document.querySelectorAll('video').forEach(v => { if (v !== e.target) v.pause(); }); }, true);

 // Dot-grid tiles behind the hero and the footer wordmark.
 document.querySelectorAll('.hero-tiles,.footer-tiles').forEach((container, seed) => {
  [[2, 26], [34, 30], [70, 26]].forEach(([top, height], r) => {
   let left = -4 + hash(seed, r, 1) * 6;
   while (left < 100) {
    const width = 9 + hash(seed, r, left) * 16;
    const t = document.createElement('span');
    t.className = 'tile';
    t.style.cssText = `top:${top}%;height:${height}%;left:${left}%;width:${width}%;--o:${(.45 + hash(left, r, seed) * .55).toFixed(2)};animation-delay:${(hash(r, left, 3) * .9).toFixed(2)}s,${(hash(left, 1, r) * 5).toFixed(2)}s`;
    container.append(t);
    left += width + 1.1 + hash(r, seed, left) * 2;
   }
  });
 });

 // Project posters: horizontal bands slide away when the poster comes into view.
 const posterObserver = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); posterObserver.unobserve(e.target); }
 }), { threshold: .25 });
 document.querySelectorAll('.poster,.case-poster').forEach(poster => {
  const holder = poster.querySelector('.slices') || poster.appendChild(Object.assign(document.createElement('span'), { className: 'slices' }));
  for (let i = 0; i < 6; i++) {
   const s = document.createElement('span');
   s.style.setProperty('--to', `${i % 2 ? 101 : -101}%`);
   s.style.transitionDelay = `${i * 70}ms`;
   holder.append(s);
  }
  if (reduced) poster.classList.add('is-in'); else posterObserver.observe(poster);
 });

 // The method film plays muted only while it is on screen.
 const film = document.querySelector('.film-frame video');
 if (film) {
  if (reduced) film.controls = true;
  else new IntersectionObserver(([e]) => { e.isIntersecting ? film.play().catch(() => {}) : film.pause(); }, { threshold: .4 }).observe(film);
 }
 if (reduced) document.querySelectorAll('.illo').forEach(svg => svg.pauseAnimations && svg.pauseAnimations());

 // Block-wipe headings: a solid block runs ahead of each line and reveals it, tied to scroll.
 const wipes = [];
 function splitIntoLines(el) {
  const text = el.dataset.text || el.textContent.trim().replace(/\s+/g, ' ');
  el.dataset.text = text;
  el.textContent = '';
  const words = text.split(' ').map(w => {
   const s = document.createElement('span');
   s.textContent = w + ' ';
   s.style.cssText = 'display:inline-block;white-space:pre';
   el.append(s);
   return s;
  });
  const lines = [];
  let top = null;
  words.forEach(s => { if (s.offsetTop !== top) { lines.push([]); top = s.offsetTop; } lines.at(-1).push(s.textContent); });
  el.textContent = '';
  return lines.map((parts, i) => {
   const line = document.createElement('span');
   line.className = 'wipe-line';
   const textSpan = document.createElement('span');
   textSpan.className = 'wipe-text';
   textSpan.textContent = parts.join('').trimEnd() + (i < lines.length - 1 ? ' ' : '');
   const block = document.createElement('span');
   block.className = 'wipe-block';
   block.setAttribute('aria-hidden', 'true');
   line.append(textSpan, block);
   el.append(line);
   return line;
  });
 }
 function setLines(lines, p) {
  const n = lines.length;
  lines.forEach((line, i) => {
   const local = clamp(p * (n * .6 + .4) - i * .6);
   line.style.setProperty('--lead', clamp(local * 1.35).toFixed(4));
   line.style.setProperty('--trail', clamp(local * 1.35 - .35).toFixed(4));
  });
 }
 function initWipes() {
  if (reduced) return;
  // Headings already on screen at load play once on a timer; the others follow scroll position.
  document.querySelectorAll('[data-wipe]').forEach(el => wipes.push({ el, intro: el.dataset.wipe === 'intro' || el.getBoundingClientRect().top < innerHeight * .85, lines: splitIntoLines(el), p: 0 }));
  wipes.forEach(w => setLines(w.lines, 0));
  wipes.filter(w => w.intro).forEach(w => {
   const start = performance.now() + 400;
   (function play(now) { w.p = clamp((now - start) / 1300); setLines(w.lines, w.p); if (w.p < 1) requestAnimationFrame(play); })(start);
  });
  const onScroll = () => {
   const vh = innerHeight;
   wipes.forEach(w => {
    if (w.intro) return;
    const r = w.el.getBoundingClientRect();
    const p = clamp((vh * .95 - r.top) / (vh * .45 + r.height * .4));
    if (Math.abs(p - w.p) > .001) { w.p = p; setLines(w.lines, p); }
   });
  };
  addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
  onScroll();
  let width = innerWidth;
  addEventListener('resize', () => {
   if (innerWidth === width) return;
   width = innerWidth;
   wipes.forEach(w => { w.lines = splitIntoLines(w.el); setLines(w.lines, w.intro ? 1 : w.p); });
  });
 }
 (document.fonts ? document.fonts.ready : Promise.resolve()).then(initWipes);
})();
