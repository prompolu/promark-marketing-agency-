import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,cp,readFile,readdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {siteConfig} from '../scripts/site-config.mjs';
import {productionOrigin,deploymentBasePath,seoHead} from '../scripts/seo.mjs';

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
 assert.equal(org.email,'marketingagencypromark@gmail.com');
 assert.equal(org.telephone,'+212684681567');
 assert.equal(org.contactPoint.url,'https://wa.me/212684681567');
 for(const field of ['aggregateRating','foundingDate','sameAs','priceRange'])assert.equal(org[field],undefined);
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

test('Default build uses the confirmed domain while the packaged preview stays noindex',async()=>{
 const directory=await mkdtemp(join(tmpdir(),'promark-domain-'));
 try{
  await cp(new URL('../scripts',import.meta.url),join(directory,'scripts'),{recursive:true});
  await cp(new URL('../public',import.meta.url),join(directory,'public'),{recursive:true});
  const environment={...process.env};delete environment.SITE_URL;
  execFileSync(process.execPath,[join(directory,'scripts/build.mjs')],{env:environment,stdio:'pipe'});
  const html=await readFile(join(directory,'dist/index.html'),'utf8');
  assert.equal(siteConfig.origin,'https://promarketing.com');
  assert(html.includes('rel="canonical" href="https://promarketing.com/"'));
  assert(html.includes('content="index,follow,max-image-preview:large"'));
  const sitemap=await readFile(join(directory,'dist/sitemap.xml'),'utf8');
  assert.equal((sitemap.match(/<loc>https:\/\/promarketing.com\//g)||[]).length,8);
  execFileSync('python',[join(directory,'scripts/package-preview.py')],{stdio:'pipe'});
  execFileSync('python',['-c',`import zipfile
with zipfile.ZipFile('${directory}/preview/PROMARK-preview.zip') as z:
 assert b'content="noindex,follow"' in z.read('PROMARK-preview/index.html')
 assert b'Disallow: /' in z.read('PROMARK-preview/robots.txt')
 assert 'PROMARK-preview/sitemap.xml' not in z.namelist()
`],{stdio:'pipe'});
 }finally{await rm(directory,{recursive:true,force:true});}
});

test('Repository paths stay inside the chosen deployment prefix',()=>{
 assert.equal(deploymentBasePath('/promark-marketing-agency-/'),'/promark-marketing-agency-');
 assert.equal(deploymentBasePath('/'),'');
 for(const value of ['repo','//other.example','/../repo','/repo?x=1','/repo#x','/repo%2Fother'])assert.throws(()=>deploymentBasePath(value));
});
test('GitHub project-site build prefixes local links, assets, posters and SEO URLs',async()=>{
 const directory=await mkdtemp(join(tmpdir(),'promark-pages-'));
 try{
  await cp(new URL('../scripts',import.meta.url),join(directory,'scripts'),{recursive:true});
  await cp(new URL('../public',import.meta.url),join(directory,'public'),{recursive:true});
  execFileSync(process.execPath,[join(directory,'scripts/build.mjs')],{env:{...process.env,SITE_URL:'https://agency.example',SITE_BASE_PATH:'/agency'},stdio:'pipe'});
  const home=await readFile(join(directory,'dist/index.html'),'utf8');
  assert(home.includes('href="https://agency.example/agency/"'));
  assert(home.includes('src="/agency/app.js"'));
  assert(home.includes('href="/agency/contact/"'));
  assert(home.includes('href="/agency/realisations/prompolu-web/"'));
  assert(!/(href|src|poster)="\/(?!agency\/|\/)/.test(home));
  const project=await readFile(join(directory,'dist/realisations/prompolu-web/index.html'),'utf8');
  assert(project.includes('poster="/agency/media/prompolu-site.jpg"'));
  const sitemap=await readFile(join(directory,'dist/sitemap.xml'),'utf8');
  assert.equal((sitemap.match(/<loc>https:\/\/agency.example\/agency\//g)||[]).length,8);
  const error=await readFile(join(directory,'dist/404.html'),'utf8');assert(error.includes('href="/agency/"'));
 }finally{await rm(directory,{recursive:true,force:true});}
});
