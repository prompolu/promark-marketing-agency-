import {serviceDetails} from './services.mjs';
// Publish only the generated static build. No custom domain is attached.
import {execFileSync} from 'node:child_process';
import {mkdtemp,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
const repository=resolve(new URL('..',import.meta.url).pathname);
const run=(command,args,options={})=>execFileSync(command,args,{cwd:repository,encoding:'utf8',...options});
run('npm',['run','check'],{stdio:'inherit'});
run('npm',['test'],{stdio:'inherit'});
run('npm',['run','build'],{stdio:'inherit',env:{...process.env,SITE_URL:'https://prompolu.github.io',SITE_BASE_PATH:'/promark-marketing-agency-'}});
await writeFile(join(repository,'dist','.nojekyll'),'');
const temporary=await mkdtemp(join(tmpdir(),'promark-pages-index-'));
try{
 const env={...process.env,GIT_INDEX_FILE:join(temporary,'index')};
 const git=args=>run('git',args,{env});
 const remote=git(['ls-remote','--heads','origin','gh-pages']).trim();
 let parent='';
 if(remote){parent=remote.split(/\s+/)[0];git(['fetch','origin','gh-pages']);}
 const worktree=`--work-tree=${join(repository,'dist')}`;
 git([worktree,'read-tree','--empty']);
 git([worktree,'add','--all','--force']);
 const tree=git(['write-tree']).trim();
 const files=git(['ls-tree','-r','--name-only',tree]).trim().split('\n');
 if(!files.includes('index.html')||!files.includes('.nojekyll')||files.includes('package.json')||files.filter(f=>f.endsWith('index.html')).length!==8+serviceDetails.length)throw new Error('Static deployment tree failed validation.');
 const args=['-c','user.name=Codex','-c','user.email=codex@openai.com','commit-tree',tree];
 if(parent)args.push('-p',parent);
 args.push('-m','Deploy Promark static website to GitHub Pages');
 const commit=git(args).trim();
 console.log(`Publishing ${files.length} generated files to gh-pages (${commit}).`);
 git(['push','origin',`${commit}:refs/heads/gh-pages`]);
 console.log('GitHub Pages deployment branch pushed. Verify Pages build and public URL before reporting live status.');
}finally{await rm(temporary,{recursive:true,force:true});}
