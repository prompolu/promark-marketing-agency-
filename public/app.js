(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

 // Pull-tab navigation menu.
 const toggle = document.querySelector('.pill-toggle'), list = document.getElementById('pill-links');
 if (toggle && list) {
  const setMenu = open => { toggle.setAttribute('aria-expanded', String(open)); list.hidden = !open; document.documentElement.classList.toggle('menu-open', open); };
  toggle.addEventListener('click', () => setMenu(list.hidden));
  list.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !list.hidden) { setMenu(false); toggle.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.pill-menu')) setMenu(false); });
 }

 // Portfolio filters.
 document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  let count = 0;
  document.querySelectorAll('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) count++; });
  document.querySelector('#filter-status').textContent = `${count} projet${count > 1 ? 's' : ''} affiché${count > 1 ? 's' : ''}.`;
 }));

 // Only one video plays at a time.
 document.addEventListener('play', e => { if (e.target.tagName === 'VIDEO') document.querySelectorAll('video').forEach(v => { if (v !== e.target) v.pause(); }); }, true);

 if (reduced) { document.querySelectorAll('.illo').forEach(svg => svg.pauseAnimations && svg.pauseAnimations()); return; }

 // Headings stick on word by word; taped photos, cards and notes land with a little slap. Each plays once.
 document.querySelectorAll('[data-wipe]').forEach(el => {
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = '';
  words.forEach((w, i) => {
   const span = document.createElement('span');
   span.className = 'word'; span.style.setProperty('--i', i); span.textContent = w;
   el.append(span, i < words.length - 1 ? ' ' : '');
  });
 });
 const targets = document.querySelectorAll('[data-wipe],.poster,.card,.note-sticky,.snapshot,.kraft,.client-film,.service-visual,.obj,.faqs details');
 document.documentElement.classList.add('motion');
 const observer = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); observer.unobserve(e.target); }
 }), { rootMargin: '0px 0px -8% 0px' });
 targets.forEach(t => observer.observe(t));
})();
