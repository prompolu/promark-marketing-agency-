(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const fine=matchMedia('(hover: hover) and (pointer: fine)');
 const cardFrames=new WeakMap();
 const versions=new WeakMap();const manualStates=new WeakMap();
 const active=new Set();const cards=[...document.querySelectorAll('[data-reactive-card]')];
 const stage=document.querySelector('[data-depth-root]');
 let frame=0;const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
 const onFrame=fn=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(fn);};
 function stopVideos(root){versions.set(root,(versions.get(root)||0)+1);manualStates.set(root,false);root.querySelectorAll('video[data-preview-src]').forEach(v=>{v.pause();v.classList.remove('clip-playing');if(v.readyState)v.currentTime=0;});root.classList.remove('preview-playing');}
 async function playVideos(root){
  const token=(versions.get(root)||0)+1;versions.set(root,token);
  const videos=[...root.querySelectorAll('video[data-preview-src]')];let played=false;
  for(const video of videos){
   if(versions.get(root)!==token)return false;
   if(!video.src)video.src=video.dataset.previewSrc;
   video.muted=true;
   try{await video.play();if(versions.get(root)!==token)return false;video.classList.add('clip-playing');played=true;}catch{ /* Keep the original poster if browser playback is unavailable. */ }
  }
  if(played&&versions.get(root)===token)root.classList.add('preview-playing');
  return played;
 }
 function resetCard(card){card.style.removeProperty('--card-tilt-x');card.style.removeProperty('--card-tilt-y');card.style.removeProperty('--card-edge-x');}
 function initialize(){
  if(stage){
   const range=stage.querySelector('input');let chosen=0;let pending=0;
   const world=stage.querySelector('.depth-world');const canvas=stage.querySelector('.depth-canvas');
   function pose(x,y){stage.style.setProperty('--scene-pitch',`${x}deg`);stage.style.setProperty('--scene-turn',`${y}deg`);}
   range.addEventListener('input',()=>{chosen=Number(range.value);range.setAttribute('aria-valuetext',`${chosen} degrés`);pose(0,chosen);});
   stage.querySelector('.scene-reset').addEventListener('click',()=>{chosen=0;range.value='0';range.setAttribute('aria-valuetext','0 degré');pose(0,0);});
   canvas.addEventListener('pointermove',e=>{if(reduced.matches||!fine.matches)return;cancelAnimationFrame(pending);pending=requestAnimationFrame(()=>{const r=canvas.getBoundingClientRect();const x=clamp((e.clientX-r.left)/r.width-.5,-.5,.5);const y=clamp((e.clientY-r.top)/r.height-.5,-.5,.5);pose(-y*8,chosen+x*14);});},{passive:true});
   canvas.addEventListener('pointerleave',()=>{cancelAnimationFrame(pending);pose(0,chosen);});
   const toggle=stage.querySelector('.hero-preview-toggle');
   toggle.addEventListener('click',async()=>{if(toggle.disabled)return;const playing=toggle.getAttribute('aria-pressed')==='true';if(playing){stopVideos(stage);toggle.setAttribute('aria-pressed','false');toggle.textContent='Animer les maquettes';}else{toggle.disabled=true;toggle.setAttribute('aria-busy','true');toggle.textContent='Chargement des aperçus…';try{const started=await playVideos(stage);toggle.setAttribute('aria-pressed',String(started));toggle.textContent=started?'Mettre les aperçus en pause':'Animer les maquettes';}finally{toggle.disabled=false;toggle.removeAttribute('aria-busy');}}});
   stage.dataset.ready='true';
  }
  for(const card of cards){
   const project=card.closest('.project');const button=project?.querySelector('.preview-toggle');manualStates.set(card,false);
   card.addEventListener('pointermove',e=>{if(reduced.matches||!fine.matches)return;cancelAnimationFrame(cardFrames.get(card));cardFrames.set(card,requestAnimationFrame(()=>{const r=card.getBoundingClientRect();const x=clamp((e.clientX-r.left)/r.width-.5,-.5,.5);const y=clamp((e.clientY-r.top)/r.height-.5,-.5,.5);card.style.setProperty('--card-tilt-x',`${-y*8}deg`);card.style.setProperty('--card-tilt-y',`${x*10}deg`);card.style.setProperty('--card-edge-x',`${(x+.5)*100}%`);}));},{passive:true});
   card.addEventListener('pointerenter',()=>{if(fine.matches&&!reduced.matches&&!manualStates.get(card))playVideos(card);});
   card.addEventListener('pointerleave',()=>{cancelAnimationFrame(cardFrames.get(card));resetCard(card);if(!manualStates.get(card))stopVideos(card);});
   button?.addEventListener('click',async()=>{if(button.disabled)return;if(manualStates.get(card)){stopVideos(card);button.setAttribute('aria-pressed','false');button.textContent='Animer l’aperçu';}else{manualStates.set(card,true);button.disabled=true;button.setAttribute('aria-busy','true');button.textContent='Chargement de l’aperçu…';try{const manual=await playVideos(card);manualStates.set(card,manual);button.setAttribute('aria-pressed',String(manual));button.textContent=manual?'Mettre l’aperçu en pause':'Animer l’aperçu';}finally{button.disabled=false;button.removeAttribute('aria-busy');}}});
   project?.querySelector('a.project-open')?.addEventListener('focus',()=>card.style.setProperty('--card-lift','12px'));
   project?.querySelector('a.project-open')?.addEventListener('blur',()=>card.style.removeProperty('--card-lift'));
  }
  const targets=[...cards,...(stage?[stage]:[])];
  function resetPlaybackUI(root){const button=root===stage?stage.querySelector('.hero-preview-toggle'):root.closest('.project')?.querySelector('.preview-toggle');if(button){button.setAttribute('aria-pressed','false');button.textContent=root===stage?'Animer les maquettes':'Animer l’aperçu';}}
  targets.forEach(root=>root.querySelectorAll('video[data-preview-src]').forEach(video=>video.addEventListener('ended',()=>{if([...root.querySelectorAll('video[data-preview-src]')].every(v=>v.ended)){stopVideos(root);resetPlaybackUI(root);}})));
  document.addEventListener('promark:project-open',()=>targets.forEach(root=>{stopVideos(root);resetPlaybackUI(root);}));
  document.addEventListener('visibilitychange',()=>{if(document.hidden)targets.forEach(root=>{stopVideos(root);resetPlaybackUI(root);});});
  const visibility=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)active.add(entry.target);else{active.delete(entry.target);stopVideos(entry.target);entry.target.style.removeProperty('--card-scroll');entry.target.style.removeProperty('--scene-scroll');const b=entry.target.closest('.project')?.querySelector('.preview-toggle');if(b){b.setAttribute('aria-pressed','false');b.textContent='Animer l’aperçu';}if(entry.target===stage){const toggle=stage.querySelector('.hero-preview-toggle');toggle.setAttribute('aria-pressed','false');toggle.textContent='Animer les maquettes';}}}},{rootMargin:'120px'});
  targets.forEach(t=>visibility.observe(t));
  function updateDepth(){if(reduced.matches)return;for(const target of active){const r=target.getBoundingClientRect();const progress=clamp((innerHeight/2-(r.top+r.height/2))/innerHeight,-1,1);target.style.setProperty(target===stage?'--scene-scroll':'--card-scroll',`${progress*(target===stage?24:12)}px`);}}
  addEventListener('scroll',()=>{if(!reduced.matches&&active.size)onFrame(updateDepth);},{passive:true});
  const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('section-entered');reveal.unobserve(entry.target);}}),{threshold:.08});
  if(!reduced.matches)document.querySelectorAll('main > [data-reveal]').forEach(s=>reveal.observe(s));
  document.body.dataset.reactiveReady='true';
  reduced.addEventListener('change',()=>{if(reduced.matches){cancelAnimationFrame(frame);reveal.disconnect();cards.forEach(c=>{resetCard(c);stopVideos(c);resetPlaybackUI(c);c.style.removeProperty('--card-scroll');});if(stage){stage.style.removeProperty('--scene-scroll');stage.style.setProperty('--scene-turn',`${Number(stage.querySelector('input').value)}deg`);stage.style.removeProperty('--scene-pitch');stopVideos(stage);resetPlaybackUI(stage);}}});
 }
 if('requestIdleCallback' in window)requestIdleCallback(initialize,{timeout:1200});else setTimeout(initialize,0);
})();
