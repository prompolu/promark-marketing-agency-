// Add only an isolated review folder. Every existing production file is preserved.
import {execFileSync} from 'node:child_process';
import {mkdtemp,rm,readdir,readFile,writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
const root=resolve(new URL('..',import.meta.url).pathname);
const folder='preview/reactive-v2';
const prefix='/promark-marketing-agency-/'+folder;
const run=(command,args,options={})=>execFileSync(command,args,{cwd:root,encoding:'utf8',...options});
if(!existsSync(join(root,'.preview-only')))throw new Error('Review publishing requires the .preview-only branch marker.');
run('npm',['run','check'],{stdio:'inherit'});run('npm',['test'],{stdio:'inherit'});
run('npm',['run','build'],{stdio:'inherit',env:{...process.env,PREVIEW_MODE:'review',SITE_URL:'',SITE_BASE_PATH:prefix,CONTACT_FORM_ENDPOINT:''}});
const html=await readFile(join(root,'dist/index.html'),'utf8');
if(!html.includes('noindex,follow')||!html.includes('APERÇU 3D')||!html.includes(prefix+'/effects.js')||html.includes('action="https://formspree.io/'))throw new Error('Preview safety checks failed.');
run('git',['fetch','origin','gh-pages']);
const parent=run('git',['rev-parse','FETCH_HEAD']).trim();
const original=run('git',['ls-tree','-r',parent]).trim().split('\n');
const temporary=await mkdtemp(join(tmpdir(),'promark-review-index-'));
try{
 const env={...process.env,GIT_INDEX_FILE:join(temporary,'index')};
 const git=(args,options={})=>run('git',args,{env,...options});
 git(['read-tree',parent]);
 const oldReview=git(['ls-tree','-r','--name-only',parent,folder]).trim().split('\n').filter(Boolean);
 for(const file of oldReview)git(['update-index','--force-remove',file]);
 const published=[];
 async function add(directory,relative=''){
  for(const entry of await readdir(directory,{withFileTypes:true})){
   if(entry.isSymbolicLink())throw new Error('Unexpected symlink in generated preview.');
   const file=join(directory,entry.name),name=relative?relative+'/'+entry.name:entry.name;
   if(entry.isDirectory())await add(file,name);
   else{
    const bytes=await readFile(file);const blob=git(['hash-object','-w','--stdin'],{input:bytes}).trim();
    const target=folder+'/'+name;git(['update-index','--add','--cacheinfo','100644',blob,target]);published.push(target);
   }
  }
 }
 await add(join(root,'dist'));
 const tree=git(['write-tree']).trim();
 const after=git(['ls-tree','-r',tree]).trim().split('\n');
 const outside=lines=>lines.filter(line=>!line.split('\t')[1].startsWith(folder+'/'));
 if(JSON.stringify(outside(original))!==JSON.stringify(outside(after)))throw new Error('Production preservation check failed; refusing publication.');
 const commit=git(['-c','user.name=Codex','-c','user.email=codex@openai.com','commit-tree',tree,'-p',parent,'-m','Add isolated reactive 3D review; preserve production bytes']).trim();
 git(['push','origin',`${commit}:refs/heads/gh-pages`]);
 const evidence={preview_url:'https://prompolu.github.io'+prefix+'/',parent,commit,folder,published_files:published.length,production_files_preserved:outside(original).length,all_production_files_byte_identical:true};
 await writeFile(join(root,'preview/review-publication.json'),JSON.stringify(evidence,null,2)+'\n');
 console.log(JSON.stringify(evidence));
}finally{await rm(temporary,{recursive:true,force:true});}
