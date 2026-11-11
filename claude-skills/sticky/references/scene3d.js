// Sticky 3D engine (from the Promark redesign). Every <canvas data-3d="kind"> gets a small real-time Three.js scene built from code (no model files).
// Kinds: hero (tape roll + floating objects), contenu (content stack), social (speech bubble + heart), web (browser + cursor),
// motion (orbit), cluster (all four), star (lime asterisk), starInk, pin, plane, heart, play.
// Configure the hero label with data attributes on the hero canvas: data-brand, data-ring, data-tagline, data-stamp.
// Three.js URL: set window.STICKY_THREE_URL, otherwise ./vendor/three.module.min.js (pin three@0.160.0 and verify its hash).
// The hero roll unrolls as the page scrolls and can be dragged to spin; every object leans toward the pointer.
// Without WebGL the static fallback next to each canvas stays visible. Reduced motion: still frames, drag only.
const canvases = [...document.querySelectorAll('canvas[data-3d]')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const HEX = { lime: 0xd7ff00, ink: 0x131419, orange: 0xff6a13, cream: 0xf6f0e2, kraft: 0xc89f72, blue: 0x4fa8ff, yellow: 0xffd93b, pink: 0xff9ec4 };

async function start() {
 const THREE = await import(window.STICKY_THREE_URL || './vendor/three.module.min.js');
 if (document.fonts) await Promise.all(['80px Anton', '40px Caveat'].map(f => document.fonts.load(f).catch(() => {})));

 const mat = (color, extra = {}) => new THREE.MeshPhysicalMaterial({ color: HEX[color] ?? color, roughness: .5, metalness: 0, clearcoat: .35, clearcoatRoughness: .4, ...extra });
 const M = Object.fromEntries(Object.keys(HEX).map(k => [k, mat(k)]));
 const mesh = (geo, material, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(geo, material); m.position.set(x, y, z); return m; };
 const group = (...children) => { const g = new THREE.Group(); children.forEach(c => g.add(c)); return g; };
 const extrude = (shape, depth, bevel = .08) => { const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 5, curveSegments: 28 }); g.center(); return g; };
 const roundedRect = (w, h, r, path = new THREE.Shape()) => {
  const x = -w / 2, y = -h / 2;
  path.moveTo(x + r, y); path.lineTo(x + w - r, y); path.quadraticCurveTo(x + w, y, x + w, y + r); path.lineTo(x + w, y + h - r);
  path.quadraticCurveTo(x + w, y + h, x + w - r, y + h); path.lineTo(x + r, y + h); path.quadraticCurveTo(x, y + h, x, y + h - r);
  path.lineTo(x, y + r); path.quadraticCurveTo(x, y, x + r, y); return path;
 };
 const tile = (w, h, r, depth, material) => mesh(extrude(roundedRect(w, h, r), depth, Math.min(.08, depth / 3)), material);
 const capsule = (r, len, material) => new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 10, 20), material);

 // ---------- the objects ----------
 const heart = (material = M.orange) => {
  const s = new THREE.Shape();
  s.moveTo(25, 25); s.bezierCurveTo(25, 25, 20, 0, 0, 0); s.bezierCurveTo(-30, 0, -30, 35, -30, 35); s.bezierCurveTo(-30, 55, -10, 77, 25, 95);
  s.bezierCurveTo(60, 77, 80, 55, 80, 35); s.bezierCurveTo(80, 35, 80, 0, 50, 0); s.bezierCurveTo(35, 0, 25, 25, 25, 25);
  const g = new THREE.ExtrudeGeometry(s, { depth: 22, bevelEnabled: true, bevelThickness: 9, bevelSize: 6, bevelSegments: 8, curveSegments: 40 });
  g.scale(.021, .021, .021); g.rotateZ(Math.PI); g.center();
  return mesh(g, material);
 };
 const asterisk = (material = M.ink) => group(...[0, 1, 2, 3].map(i => { const c = capsule(.26, 1.9, material); c.rotation.z = i * Math.PI / 4; return c; }));
 const cursor = () => {
  const s = new THREE.Shape([[0, 0], [0, -1.7], [.42, -1.3], [.74, -1.95], [1, -1.83], [.69, -1.2], [1.2, -1.2]].map(([x, y]) => new THREE.Vector2(x, y)));
  return mesh(extrude(s, .18, .07), M.cream);
 };
 const playTriangle = (size, material) => {
  const s = new THREE.Shape(); s.moveTo(-size * .45, -size * .55); s.lineTo(size * .6, 0); s.lineTo(-size * .45, size * .55); s.closePath();
  return mesh(extrude(s, .16, .07), material);
 };
 const contentStack = () => {
  const back = tile(2.1, 1.5, .26, .14, M.lime); back.position.set(.42, .38, -.42); back.rotation.z = .12;
  const mid = tile(2.1, 1.5, .26, .14, M.blue); mid.position.set(.2, .18, -.2); mid.rotation.z = .05;
  const front = tile(2.1, 1.5, .26, .2, M.cream);
  const play = playTriangle(.8, M.orange); play.position.z = .2;
  const rec = mesh(new THREE.SphereGeometry(.09, 24, 16), M.orange, -.82, .52, .16);
  const bar = tile(.9, .1, .05, .06, M.ink); bar.position.set(-.45, -.55, .14);
  return group(back, mid, front, play, rec, bar);
 };
 const speechBubble = () => {
  const w = 2.3, h = 1.6, r = .45, x = -w / 2, y = -h / 2, s = new THREE.Shape();
  s.moveTo(x + r, y); s.lineTo(x + .55, y); s.lineTo(x + .25, y - .5); s.lineTo(x + 1, y);
  s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  const bubble = mesh(extrude(s, .32, .1), M.blue);
  const h1 = heart(M.orange); h1.scale.setScalar(.5); h1.position.set(0, .1, .42);
  const badge = mesh(new THREE.SphereGeometry(.3, 32, 24), M.lime, 1.1, .8, .15);
  const dot = mesh(new THREE.SphereGeometry(.12, 24, 16), M.ink, 1.1, .8, .42);
  return group(bubble, h1, badge, dot);
 };
 const browser = () => {
  const win = tile(2.7, 1.95, .2, .2, M.cream);
  const bar = tile(2.7, .36, .14, .08, M.ink); bar.position.set(0, .8, .16);
  const dots = [M.orange, M.yellow, M.lime].map((m, i) => mesh(new THREE.SphereGeometry(.07, 20, 14), m, -1.12 + i * .22, .8, .24));
  const hero = tile(2.3, .62, .1, .08, M.lime); hero.position.set(0, .22, .15);
  const l1 = tile(1.4, .09, .045, .05, M.ink); l1.position.set(-.45, -.3, .14);
  const l2 = tile(.95, .09, .045, .05, M.ink); l2.position.set(-.67, -.48, .14);
  const btn = capsule(.12, .5, M.orange); btn.rotation.z = Math.PI / 2; btn.position.set(.7, -.66, .2);
  const arrow = cursor(); arrow.scale.setScalar(.42); arrow.position.set(1.15, -.75, .5); arrow.rotation.z = .25;
  return group(win, bar, ...dots, hero, l1, l2, btn, arrow);
 };
 const orbit = () => {
  const torus = mesh(new THREE.TorusGeometry(1.05, .36, 48, 120), M.ink); torus.rotation.x = 1.1;
  const ring = mesh(new THREE.TorusGeometry(1.75, .05, 16, 120), M.cream); ring.rotation.set(1.2, .35, 0);
  const ball = mesh(new THREE.SphereGeometry(.3, 40, 28), M.lime);
  const ball2 = mesh(new THREE.SphereGeometry(.16, 32, 20), M.orange);
  const g = group(torus, ring, ball, ball2);
  g.userData.tick = t => {
   const a = t * 1.3, b = -t * .9 + 2;
   const p = new THREE.Vector3(Math.cos(a) * 1.75, Math.sin(a) * 1.75, 0).applyEuler(ring.rotation); ball.position.copy(p);
   ball2.position.set(Math.cos(b) * 1.15, Math.sin(b) * .5 + .05, Math.sin(b) * 1.1);
  };
  return g;
 };
 const pin = () => {
  const c = new THREE.Vector2(0, .4), r = 1, tip = new THREE.Vector2(0, -1.45), a = Math.acos(r / c.distanceTo(tip));
  const s = new THREE.Shape(); s.moveTo(tip.x, tip.y);
  s.lineTo(c.x + Math.cos(-Math.PI / 2 + a) * r, c.y + Math.sin(-Math.PI / 2 + a) * r);
  s.absarc(c.x, c.y, r, -Math.PI / 2 + a, Math.PI * 1.5 - a, false); s.lineTo(tip.x, tip.y);
  const hole = new THREE.Path(); hole.absarc(c.x, c.y, .4, 0, Math.PI * 2, true); s.holes.push(hole);
  const body = mesh(extrude(s, .45, .14), M.orange); body.position.y = .25;
  const ball = mesh(new THREE.SphereGeometry(.26, 32, 24), M.lime, 0, .55, 0);
  const base = mesh(new THREE.CylinderGeometry(1.3, 1.3, .12, 64), M.ink, 0, -1.55, 0);
  const ringB = mesh(new THREE.TorusGeometry(1.05, .05, 12, 80), M.lime, 0, -1.48, 0); ringB.rotation.x = Math.PI / 2;
  const top = group(body, ball);
  const g = group(top, base, ringB); g.userData.fit = 2.5;
  g.userData.tick = t => { top.position.y = Math.abs(Math.sin(t * 2.2)) * .32; top.rotation.y = t * 1.2; };
  return g;
 };
 const paperPlane = () => {
  const N = [1.7, 0, 0], C = [-1.1, .12, 0], L = [-1.25, .05, -1.15], R = [-1.25, .05, 1.15], K = [-1.1, -.5, 0];
  const tri = (...p) => p.flat();
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute([...tri(N, L, C), ...tri(N, C, R), ...tri(N, C, K)], 3));
  geo.computeVertexNormals();
  const plane = mesh(geo, mat('cream', { side: THREE.DoubleSide, flatShading: true }));
  const trail = group(...Array.from({ length: 7 }, (_, i) => mesh(new THREE.SphereGeometry(.07 - i * .006, 16, 12), M.lime, -1.6 - i * .42, -.25 - Math.sin(i * .7) * .35, 0)));
  const g = group(plane, trail); g.rotation.set(.8, -.35, .22); g.userData.fit = 2.2;
  g.userData.tick = t => { plane.rotation.x = Math.sin(t * 1.6) * .18; plane.position.y = Math.sin(t * 1.6) * .12; };
  return g;
 };
 const star = (m = M.lime) => { const g = asterisk(m); g.userData.tick = t => { g.rotation.z = t * .6; }; return g; };

 // ---------- the hero tape roll ----------
 const disc = (size, draw) => { const c = document.createElement('canvas'); c.width = c.height = size; draw(c.getContext('2d'), size / 2); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
 const arcText = (x, text, m, radius, font) => {
  x.font = font; x.textAlign = 'center'; x.textBaseline = 'middle';
  const chars = [...text], widths = chars.map(ch => x.measureText(ch).width), gap = (Math.PI * 2 * radius - widths.reduce((a, b) => a + b, 0)) / chars.length;
  let a = 0;
  chars.forEach((ch, i) => { a += (widths[i] / 2) / radius; x.save(); x.translate(m + Math.sin(a) * radius, m - Math.cos(a) * radius); x.rotate(a); x.fillText(ch, 0, 0); x.restore(); a += (widths[i] / 2 + gap) / radius; });
 };
 const rings = (x, m, from, to) => { x.lineWidth = 2; for (let r = from; r < to; r += 6) { x.strokeStyle = `rgba(19,20,25,${.04 + (r % 18 === 0 ? .05 : 0)})`; x.beginPath(); x.arc(m, m, r, 0, 7); x.stroke(); } };
 const tapeRoll = (label = {}) => {
  const brand = label.brand || 'BRAND', ring = label.ring || 'AGENCE CRÉATIVE ✦ MARKETING ✦ DESIGN ✦ ', tagline = label.tagline || 'marques remarquées', stamp = label.stamp || '100% FAIT MAIN';
  const R = 1.55, r = .98, H = .95;
  const front = disc(1024, (x, m) => {
   x.fillStyle = '#d7ff00'; x.beginPath(); x.arc(m, m, m, 0, 7); x.fill(); rings(x, m, 420, m);
   x.fillStyle = '#131419'; x.beginPath(); x.arc(m, m, 404, 0, 7); x.fill();
   x.fillStyle = '#f6f0e2'; x.beginPath(); x.arc(m, m, 392, 0, 7); x.fill();
   x.fillStyle = '#d7ff00'; x.beginPath(); x.arc(m, m, 300, 0, 7); x.fill();
   x.fillStyle = '#131419'; arcText(x, ring, m, 346, '44px Anton');
   x.font = `${Math.min(180, Math.floor(1300 / Math.max(brand.length, 1)))}px Anton`; x.fillText(brand, m, m - 40);
   x.font = '64px Caveat'; x.fillText(tagline, m, m + 82);
   for (let i = 0, bx = m - 92; i < 30; i++) { const w = [3, 6, 2, 4][(i * 7) % 4]; x.fillRect(bx, m + 150, w, 70); bx += w + 3; }
   x.font = '28px Anton'; x.fillText(stamp, m, m + 250);
  });
  const back = disc(1024, (x, m) => { x.fillStyle = '#d7ff00'; x.beginPath(); x.arc(m, m, m, 0, 7); x.fill(); rings(x, m, 300, m); });
  const tape = mat('lime', { roughness: .28, clearcoat: .9, clearcoatRoughness: .15 });
  const sideTex = disc(256, (x) => { x.fillStyle = '#d7ff00'; x.fillRect(0, 0, 256, 256); for (let i = 0; i < 256; i += 9) { x.fillStyle = `rgba(19,20,25,${.03 + (i % 27 ? 0 : .05)})`; x.fillRect(0, i, 256, 3); } });
  sideTex.wrapS = sideTex.wrapT = THREE.RepeatWrapping; sideTex.repeat.set(6, 1);
  const side = mesh(new THREE.CylinderGeometry(R, R, H, 128, 1, true).rotateX(Math.PI / 2), mat('lime', { map: sideTex, color: 0xffffff, roughness: .28, clearcoat: .9 }));
  const face = mesh(new THREE.CircleGeometry(R, 128), new THREE.MeshPhysicalMaterial({ map: front, roughness: .4, clearcoat: .6 }), 0, 0, H / 2 + .002);
  const backFace = mesh(new THREE.RingGeometry(r, R, 128), new THREE.MeshPhysicalMaterial({ map: back, roughness: .4, clearcoat: .6 }), 0, 0, -H / 2 - .002); backFace.rotation.y = Math.PI;
  const core = mesh(new THREE.CylinderGeometry(r, r, H + .02, 96, 1, true).rotateX(Math.PI / 2), mat('kraft', { side: THREE.DoubleSide, roughness: .9, clearcoat: 0 }));
  const roll = group(side, face, backFace, core);
  // The pulled strip: a tangent ribbon leaving the right edge of the roll, lengthened by scrolling.
  const strip = new THREE.PlaneGeometry(H * .98, 1, 1, 40); const sp = strip.attributes.position;
  const stripMesh = mesh(strip, mat('lime', { side: THREE.DoubleSide, roughness: .3, clearcoat: .9, transparent: true, opacity: .93 }));
  const base = Array.from({ length: sp.count }, (_, i) => [sp.getX(i), sp.getY(i)]);
  const g = group(roll, stripMesh);
  g.userData.fit = 1.85;
  g.userData.setLength = len => {
   base.forEach(([w, v], i) => { const t = .5 - v; const y = .05 - t * len; sp.setXYZ(i, R - .005 + .18 * t * t * len + Math.sin(t * 6 + len) * .03 * t * len, y, w); });
   sp.needsUpdate = true; strip.computeVertexNormals(); roll.rotation.z = -len / R;
  };
  g.userData.setLength(.6);
  return g;
 };

 const builders = { contenu: contentStack, social: speechBubble, web: browser, motion: orbit, star: () => star(), starInk: () => star(M.ink), pin, plane: paperPlane, heart: () => heart(), play: contentStack };
 builders.cluster = () => {
  const parts = [[contentStack(), -1.5, .9, .55], [speechBubble(), 1.55, 1, .5], [browser(), -1.3, -1.15, .5], [orbit(), 1.5, -1.05, .45]];
  const g = group(...parts.map(([o, x, y, s]) => { o.position.set(x, y, 0); o.scale.setScalar(s); return o; }));
  g.userData.tick = t => parts.forEach(([o], i) => { o.userData.tick?.(t); o.rotation.y = Math.sin(t * .8 + i * 1.7) * .35; o.position.z = Math.sin(t + i) * .3; });
  g.userData.fit = 2.9;
  return g;
 };
 builders.hero = canvas => {
  const roll = tapeRoll(canvas.dataset);
  const sat = [[heart(), .09, .24, .9], [asterisk(M.ink), .91, .22, .8], [contentStack(), .9, .5, .5], [orbit(), .1, .52, .42], [mesh(new THREE.SphereGeometry(.7, 48, 32), M.blue), .7, .86, .45], [cursor(), .33, .84, .6]];
  const g = group(roll, ...sat.map(s => s[0]));
  g.userData.hero = { roll, sat };
  return g;
 };

 // ---------- scenes ----------
 const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
 const scenes = [];
 for (const canvas of canvases) {
  const kind = canvas.dataset['3d'], build = builders[kind];
  if (!build) continue;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: kind === 'hero' ? 'high-performance' : 'default' }); } catch (err) { console.warn('3D unavailable', err); continue; }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xfff8e8, 0x2a2b33, 1.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(-3, 5, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0xd7ff00, 1.6); rim.position.set(5, 1, -4); scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffd6b0, .7); fill.position.set(3, -4, 4); scene.add(fill);
  const camera = new THREE.PerspectiveCamera(30, 1, .1, 100);
  const obj = build(canvas); const holder = group(obj); scene.add(holder);
  if (!obj.userData.hero) { obj.rotation.x -= .12; obj.rotation.y -= .35; }
  const s = { kind, canvas, renderer, scene, camera, obj, holder, visible: true, tiltX: 0, tiltY: 0, spin: 0, angle: 0, phase: Math.random() * 6, w: 0, h: 0 };
  scenes.push(s);
  canvas.closest('.obj')?.classList.add('is-3d');
 }
 if (!scenes.length) return;
 document.documentElement.classList.add('has-3d');

 const hero = scenes.find(s => s.kind === 'hero');
 const heroEl = document.querySelector('.hero');
 function layout(s) {
  const w = s.canvas.clientWidth, h = s.canvas.clientHeight;
  if (!w || !h || (w === s.w && h === s.h)) return;
  s.w = w; s.h = h;
  s.renderer.setPixelRatio(Math.min(devicePixelRatio, s.kind === 'hero' ? 1.5 : 2));
  s.renderer.setSize(w, h, false);
  s.camera.aspect = w / h;
  if (s.kind === 'hero') {
   const D = 16, halfH = D * Math.tan(15 * Math.PI / 180), halfW = halfH * s.camera.aspect, heroH = heroEl.offsetHeight;
   s.camera.position.set(0, 0, D);
   const at = (fx, fy) => [(fx * 2 - 1) * halfW, (1 - (fy * heroH / h) * 2) * halfH];
   const narrow = w < 760, unit = Math.min(halfW * 2, halfH * 2 * heroH / h);
   const { roll, sat } = s.obj.userData.hero;
   const rs = (narrow ? .3 : .2) * unit / 1.55;
   roll.scale.setScalar(rs);
   const [rx, ry] = at(.5, narrow ? .84 : .82); roll.position.set(rx, ry, 0); roll.userData.home = [rx, ry];
   sat.forEach(([o, fx, fy, sc], i) => {
    const show = !narrow || i < 3;
    o.visible = show;
    const [x, y] = narrow ? at([.09, .91, .9][i] ?? fx, [.3, .3, .6][i] ?? fy) : at(fx, fy);
    o.position.set(x, y, 0); o.userData.home = [x, y]; o.scale.setScalar(sc * unit * (narrow ? .06 : .052));
   });
  } else {
   const fit = s.obj.userData.fit || 1.9, D = fit / Math.tan(15 * Math.PI / 180) / Math.min(1, s.camera.aspect);
   s.camera.position.set(0, 0, D * 1.02);
  }
  s.camera.updateProjectionMatrix();
 }

 let last = performance.now(), t = 0, running = false, dragging = null, lastX = 0;
 function render(s, dt) {
  layout(s);
  const r = s.canvas.getBoundingClientRect();
  const nx = clamp((pointer.x - (r.left + r.width / 2)) / Math.max(innerWidth / 2, 1), -1, 1);
  const ny = clamp((pointer.y - (r.top + r.height / 2)) / Math.max(innerHeight / 2, 1), -1, 1);
  s.tiltY += (nx * .55 - s.tiltY) * .06 * dt; s.tiltX += (ny * .4 - s.tiltX) * .06 * dt;
  s.angle += s.spin * dt; s.spin *= Math.pow(.95, dt);
  const tt = reduced ? 0 : t + s.phase;
  if (s.kind === 'hero') {
   const p = clamp(scrollY / Math.max(heroEl.offsetHeight, 1));
   const { roll, sat } = s.obj.userData.hero;
   roll.userData.setLength(.6 + p * 2.6 + (reduced ? 0 : Math.sin(t * .8) * .05));
   roll.rotation.set(s.tiltX * .6 - .1, s.tiltY * .8 - .35 + s.angle, 0);
   if (roll.userData.home) roll.position.y = roll.userData.home[1] + Math.sin(tt * 1.1) * .06;
   sat.forEach(([o], i) => {
    if (!o.userData.home) return;
    o.userData.tick?.(tt);
    o.position.x = o.userData.home[0] + s.tiltY * (i % 2 ? .5 : -.5);
    o.position.y = o.userData.home[1] + Math.sin(tt * 1.3 + i * 1.9) * .18 + p * (i % 2 ? 2.5 : 1.8);
    o.rotation.set(Math.sin(tt * .9 + i) * .35 + s.tiltX, tt * .5 * (i % 2 ? 1 : -1) + s.tiltY + (i === 1 ? s.angle : 0), Math.sin(tt * .7 + i) * .3);
   });
  } else {
   s.obj.userData.tick?.(tt);
   s.holder.rotation.set(s.tiltX, s.tiltY + s.angle + Math.sin(tt * .7) * .25, 0);
   s.holder.position.y = Math.sin(tt * 1.2) * .08;
  }
  s.renderer.render(s.scene, s.camera);
 }
 function frame(now) {
  running = false;
  const dt = Math.min(64, now - last) / 16.67; last = now;
  if (!reduced) t += dt / 60;
  let active = false;
  scenes.forEach(s => { if (s.visible) { render(s, dt); active = true; } });
  const settling = scenes.some(s => s.visible && (Math.abs(s.spin) > .0005));
  if (active && (!reduced || dragging || settling)) wake();
 }
 function wake() { if (!running) { running = true; requestAnimationFrame(frame); } }

 const io = new IntersectionObserver(entries => { entries.forEach(e => { const s = scenes.find(x => x.canvas === e.target); if (s) s.visible = e.isIntersecting; }); wake(); }, { rootMargin: '80px' });
 scenes.forEach(s => io.observe(s.canvas));
 addEventListener('resize', () => { scenes.forEach(s => { s.w = 0; }); wake(); });
 addEventListener('scroll', wake, { passive: true });
 addEventListener('pointermove', e => {
  pointer.x = e.clientX; pointer.y = e.clientY;
  if (dragging) { dragging.spin += (e.clientX - lastX) * .0012; lastX = e.clientX; }
  wake();
 }, { passive: true });
 // Drag to spin: the hero listens on the whole hero (its text lets pointers through); other objects on their own frame.
 scenes.forEach(s => {
  const target = s.kind === 'hero' ? heroEl : s.canvas;
  target.addEventListener('pointerdown', e => {
   if (e.target.closest('a,button,input,select,textarea')) return;
   dragging = s; lastX = e.clientX; target.classList.add('dragging'); wake();
  });
 });
 const stop = () => { if (dragging) { (dragging.kind === 'hero' ? heroEl : dragging.canvas).classList.remove('dragging'); dragging = null; } };
 addEventListener('pointerup', stop); addEventListener('pointercancel', stop);
 wake();
}

if (canvases.length) start().catch(err => console.warn('3D scenes unavailable', err));
