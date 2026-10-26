// Homepage hero: a faceted stone in real-time 3D that follows the cursor and can be spun by dragging.
// Three.js is fetched at build time by scripts/fetch-assets.mjs. Without it, or without WebGL, the hero keeps its tiles and type.
const canvas = document.querySelector('.hero-stone');
const hero = document.querySelector('.hero');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

function hash(x, y, z) { const h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return h - Math.floor(h); }
function noise(x, y, z) {
 const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
 const xf = x - xi, yf = y - yi, zf = z - zi;
 const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
 const lerp = (a, b, t) => a + (b - a) * t;
 const c = (dx, dy, dz) => hash(xi + dx, yi + dy, zi + dz);
 return lerp(lerp(lerp(c(0, 0, 0), c(1, 0, 0), u), lerp(c(0, 1, 0), c(1, 1, 0), u), v), lerp(lerp(c(0, 0, 1), c(1, 0, 1), u), lerp(c(0, 1, 1), c(1, 1, 1), u), v), w);
}
function fbm(x, y, z) { let s = 0, a = .5, f = 1; for (let i = 0; i < 4; i++) { s += a * noise(x * f, y * f, z * f); a *= .5; f *= 2.03; } return s; }

async function start() {
 const THREE = await import('./vendor/three.module.min.js');
 const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
 renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
 renderer.outputColorSpace = THREE.SRGBColorSpace;
 renderer.toneMapping = THREE.ACESFilmicToneMapping;
 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(32, 1, .1, 50);
 scene.add(new THREE.HemisphereLight(0xdfe3ff, 0x08080b, .55));
 const key = new THREE.DirectionalLight(0xffffff, 2.3); key.position.set(-3, 4, 5); scene.add(key);
 const rim = new THREE.DirectionalLight(0xd7ff00, 3); rim.position.set(4.5, 1, -3.5); scene.add(rim);
 const fill = new THREE.DirectionalLight(0x8f9bff, .5); fill.position.set(2, -3, 3); scene.add(fill);

 // Sculpt the stone: noisy radius, then flat chisel cuts for rock-like facets.
 const geo = new THREE.IcosahedronGeometry(1.5, 5);
 const pos = geo.attributes.position, p = new THREE.Vector3();
 const cuts = [[.9, .3, .2, 1.12], [-.4, .85, .3, 1.15], [-.6, -.55, .5, 1.08], [.2, -.4, -.9, 1.1], [-.8, .1, -.6, 1.2], [.4, .9, -.3, 1.1]].map(([x, y, z, d]) => ({ n: new THREE.Vector3(x, y, z).normalize(), d }));
 for (let i = 0; i < pos.count; i++) {
  p.fromBufferAttribute(pos, i).normalize();
  let r = 1.5 * (.82 + .42 * fbm(p.x * 1.7 + 3.1, p.y * 1.7 + 1.3, p.z * 1.7 + 7.7));
  r += .06 * (noise(p.x * 9, p.y * 9, p.z * 9) - .5);
  p.multiplyScalar(r); p.y *= .86;
  for (const { n, d } of cuts) { const k = p.dot(n); if (k > d) p.addScaledVector(n, -(k - d) * .9); }
  pos.setXYZ(i, p.x, p.y, p.z);
 }
 geo.computeVertexNormals();
 const stone = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x55575f, roughness: .88, metalness: .06, flatShading: true }));
 stone.rotation.set(.35, -.6, .1);
 const group = new THREE.Group(); group.add(stone); scene.add(group);

 let tiltX = 0, tiltY = 0, targetX = 0, targetY = 0, spin = 0, dragging = false, lastX = 0, visible = true, last = performance.now(), running = false;
 function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.position.z = w < 760 ? 12 : 9;
  camera.updateProjectionMatrix();
  wake();
 }
 function frame(now) {
  running = false;
  if (!visible) return;
  const dt = Math.min(64, now - last) / 16.67; last = now;
  const scrolled = clamp(-hero.getBoundingClientRect().top / hero.offsetHeight);
  if (!reduced) stone.rotation.y += (.0028 + spin) * dt; else stone.rotation.y += spin * dt;
  spin *= .94;
  tiltX += (targetX - tiltX) * .05 * dt; tiltY += (targetY - tiltY) * .05 * dt;
  group.rotation.set(tiltX + scrolled * .8, tiltY, 0);
  group.position.y = scrolled * 1.6;
  group.scale.setScalar(1 - scrolled * .18);
  renderer.render(scene, camera);
  if (!reduced || dragging || Math.abs(spin) > .0001 || Math.abs(targetY - tiltY) > .001) wake();
 }
 function wake() { if (!running) { running = true; requestAnimationFrame(frame); } }
 addEventListener('resize', resize);
 addEventListener('pointermove', e => {
  targetY = (e.clientX / innerWidth - .5) * .9; targetX = (e.clientY / innerHeight - .5) * .6;
  if (dragging) { spin += (e.clientX - lastX) * .0009; lastX = e.clientX; }
  wake();
 });
 canvas.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; canvas.classList.add('dragging'); canvas.setPointerCapture(e.pointerId); });
 const stop = () => { dragging = false; canvas.classList.remove('dragging'); };
 canvas.addEventListener('pointerup', stop);
 canvas.addEventListener('pointercancel', stop);
 addEventListener('scroll', wake, { passive: true });
 new IntersectionObserver(([e]) => { visible = e.isIntersecting; wake(); }).observe(hero);
 resize();
 document.documentElement.classList.add('has-stone');
}

if (canvas) start().catch(err => { console.warn('3D hero unavailable', err); });
