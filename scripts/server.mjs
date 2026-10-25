import {siteConfig} from './site-config.mjs';
import {deploymentBasePath} from './seo.mjs';
import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {resolve,extname,sep} from 'node:path';
const root=resolve('dist');
const basePath=deploymentBasePath(process.env.SITE_BASE_PATH ?? (process.env.SITE_URL===undefined?siteConfig.basePath:''));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.mp4':'video/mp4','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.webp':'image/webp','.woff2':'font/woff2'};
http.createServer(async(req,res)=>{
 res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
 res.setHeader('X-Content-Type-Options','nosniff');
 res.setHeader('X-Frame-Options','DENY');
 res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; media-src 'self'; connect-src 'self' https://formspree.io; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'self' mailto: https://formspree.io");
 try {
  const requestURL=new URL(req.url,'http://localhost');
  const requestedPath=decodeURIComponent(requestURL.pathname);
  const pathname=basePath&&(requestedPath===basePath||requestedPath.startsWith(basePath+'/'))?(requestedPath.slice(basePath.length)||'/'):requestedPath;
  let file=resolve(root,'.'+pathname);
  if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end();return;}
  const isDirectory=(await stat(file)).isDirectory();
  let canonicalPath=requestURL.pathname;
  if(pathname.endsWith('/index.html'))canonicalPath=requestURL.pathname.slice(0,-10);
  else if(isDirectory&&!requestURL.pathname.endsWith('/'))canonicalPath+='/';
  if(canonicalPath!==requestURL.pathname){res.writeHead(308,{Location:canonicalPath+requestURL.search}).end();return;}
  if(isDirectory)file=resolve(file,'index.html');
  const size=(await stat(file)).size;
  const headers={'Content-Type':types[extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Accept-Ranges':'bytes'};
  if(req.headers.range){
   const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
   if(!match||(!match[1]&&!match[2])){res.writeHead(416,{'Content-Range':`bytes */${size}`}).end();return;}
   const start=match[1]?Number(match[1]):Math.max(0,size-Number(match[2]));
   const end=match[1]&&match[2]?Math.min(Number(match[2]),size-1):size-1;
   if(start>=size||start>end){res.writeHead(416,{'Content-Range':`bytes */${size}`}).end();return;}
   res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':end-start+1});
   if(req.method==='HEAD')res.end();else createReadStream(file,{start,end}).pipe(res);return;
  }
  res.writeHead(200,{...headers,'Content-Length':size});
  if(req.method==='HEAD')res.end();else createReadStream(file).pipe(res);
 }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'}).end(await readFile(resolve(root,'404.html')));}
}).listen(Number(process.env.PORT)||3000,'0.0.0.0',()=>console.log('Promark server listening on port '+(process.env.PORT||3000)));
