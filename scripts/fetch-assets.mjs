// Downloads the pinned third-party files the design needs into public/ (they are not committed).
// Each file is checked against its SHA-256 so a changed upstream file fails the build instead of shipping.
import {createHash} from 'node:crypto';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
const assets = [
 ['vendor/three.module.min.js', 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js', '3e690ac7d180b0aadf0891bea39eec643e29e2d3e75c99b18689518665f69ba6'],
 ['fonts/geist.woff2', 'https://cdn.jsdelivr.net/npm/@fontsource-variable/geist@5.3.0/files/geist-latin-wght-normal.woff2', '19f9c92546aa300c312235e3125af1b81394d8db9a4bc4a425cd5b641d2d54e1'],
 ['fonts/geist-mono.woff2', 'https://cdn.jsdelivr.net/npm/@fontsource-variable/geist-mono@5.3.0/files/geist-mono-latin-wght-normal.woff2', '684ad5b531f81d43c1e8c7038262d5db7cdc1f68006e04d6c7769efa8d33c8cc'],
 ['fonts/anton.woff2', 'https://cdn.jsdelivr.net/npm/@fontsource/anton@5.2.5/files/anton-latin-400-normal.woff2', 'f9ad420bf51c2930fc2a49d44209d202cb18acb2d8b82853a01023e69eab6885'],
 ['fonts/caveat.woff2', 'https://cdn.jsdelivr.net/npm/@fontsource-variable/caveat@5.2.5/files/caveat-latin-wght-normal.woff2', '26294b6b2c91b3970aca8fbbcb3e6c553ecb1ebb355b7ffbd30fa2f5370fe733'],
 ['fonts/OFL-anton-caveat.txt', 'https://cdn.jsdelivr.net/npm/@fontsource/anton@5.2.5/LICENSE', '18aabf190848725e2576eefb5c29ba06aac1029d02132252a7f312eac2e50cf3'],
 ['fonts/OFL.txt', 'https://cdn.jsdelivr.net/npm/@fontsource-variable/geist@5.3.0/LICENSE', '71609cbb5c78b5870d712eab73a31d76622635c6ed034ab5cee3b9ecbda8685f'],
];
const sha256 = data => createHash('sha256').update(data).digest('hex');
for (const [path, url, expected] of assets) {
 const target = new URL(`../public/${path}`, import.meta.url);
 try { if (sha256(await readFile(target)) === expected) { console.log(`ok      ${path}`); continue; } } catch {}
 const response = await fetch(url);
 if (!response.ok) throw new Error(`${path}: HTTP ${response.status} from ${url}`);
 const data = Buffer.from(await response.arrayBuffer());
 if (sha256(data) !== expected) throw new Error(`${path}: checksum mismatch, refusing to use ${url}`);
 await mkdir(new URL('.', target), {recursive: true});
 await writeFile(target, data);
 console.log(`fetched ${path}`);
}
