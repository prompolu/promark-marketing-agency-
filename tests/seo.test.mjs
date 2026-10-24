import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,cp,readFile,readdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {productionOrigin,seoHead} from '../scripts/seo.mjs';

test('Production URLs require a full HTTPS origin',()=>{
 assert.equal(productionOrigin(''),'');
 assert.equal(productionOrigin('https://agency.example/'),'https://agency.example');
 for(const invalid of ['.com','agency.example','http://agency.example','https://name:password@agency.example','https://agency.example/services/','https://agency.example/?source=test','https://agency.example/#section'])assert.throws(()=>productionOrigin(invalid));
});
test('Structured metadata encodes content and preserves only confirmed entity facts',()=>{
 const head=seoHead({origin:'https://agency.example',slug:'services',title:'Sites & contenu',description:'Un "projet" <clair>'});
 assert(head.includes('Sites &amp; contenu'));
 const json=JSON.parse(head.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1]);
 const org=json['@graph'].find(x=>x['@type']==='Organization');
 assert.equal(org.location.address.addressLocality,'Fès');
 for(const field of ['telephone','email','aggregateRating','foundingDate','sameAs','priceRange'])assert.equal(org[field],undefined);
 assert(!head.includes('FAQPage'));
});
test('Production build emits unique, indexable pages and complete, matching sitemap/schema',async()=>{
 const directory=await mkdtemp(join(tmpdir(),'promark-seo-'));
 try{
  await cp(new URL('../scripts',import.meta.url),join(directory,'scripts'),{recursive:true});
  await cp(new URL('../public',import.meta.url),join(directory,'public'),{recursive:true});
  const build=origin=>execFileSync(process.execPath,[join(directory,'scripts/build.mjs')],{env:{...process.env,SITE_URL:origin},stdio:'pipe'});
  build('https://agency.example');
  const files=[];
  async function crawl(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const p=join(dir,entry.name);if(entry.isDirectory())await crawl(p);else if(entry.name==='index.html')files.push(p);}}
  await crawl(join(directory,'dist'));assert.equal(files.length,8);
  const sitemap=await readFile(join(directory,'dist/sitemap.xml'),'utf8');const titles=new Set();
  for(const file of files){const html=await readFile(file,'utf8');assert.equal((html.match(/<h1[ >]/g)||[]).length,1);const title=html.match(/<title>(.*?)<\/title>/)[1];assert(!titles.has(title));titles.add(title);
   const canonical=html.match(/rel="canonical" href="([^"]+)"/)[1];assert(canonical.startsWith('https://agency.example/'));assert(sitemap.includes(`<loc>${canonical}</loc>`));assert(html.includes('content="index,follow,max-image-preview:large"'));assert(html.includes('property="og:image"'));JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1]);
   if(file.includes('/realisations/')&&!file.endsWith('/realisations/index.html')){assert(html.includes('Travail réalisé')||html.includes('travail réalisé'));assert(html.includes('<video controls'));assert(html.includes('Fil d’Ariane'));}
  }
  assert.equal((sitemap.match(/<loc>/g)||[]).length,8);
  const home=await readFile(join(directory,'dist/index.html'),'utf8');assert(home.includes('href="/realisations/prompolu-web/"'));assert(home.includes('agence de marketing et de création à Fès'));assert(home.includes('fetchpriority="high"'));
  const errorPage=await readFile(join(directory,'dist/404.html'),'utf8');assert(errorPage.includes('noindex,follow'));
  const robots=await readFile(join(directory,'dist/robots.txt'),'utf8');assert(robots.includes('Allow: /'));assert(!robots.includes('Disallow: /'));
  build('');await assert.rejects(readFile(join(directory,'dist/sitemap.xml')));
  assert((await readFile(join(directory,'dist/index.html'),'utf8')).includes('content="noindex,follow"'));
  assert((await readFile(join(directory,'dist/robots.txt'),'utf8')).includes('Disallow: /'));
 }finally{await rm(directory,{recursive:true,force:true});}
});
