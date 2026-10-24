(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
 function initialize(){
  const stage=document.querySelector('.brand-stage');
  if(stage){
   const scene=stage.querySelector('.brand-scene');
   const cube=stage.querySelector('.brand-cube');
   const range=stage.querySelector('input');
   let chosen=-24,pending=0;
   function pose(x,y){cube.style.setProperty('--scene-x',`${x}deg`);cube.style.setProperty('--scene-y',`${y}deg`);}
   range.addEventListener('input',()=>{chosen=Number(range.value);pose(-16,chosen);});
   stage.querySelector('.scene-reset').addEventListener('click',()=>{chosen=-24;range.value='-24';pose(-16,chosen);});
   scene.addEventListener('pointermove',event=>{
    if(reduced.matches||!finePointer.matches)return;
    cancelAnimationFrame(pending);
    pending=requestAnimationFrame(()=>{const rect=scene.getBoundingClientRect();const x=Math.max(-.5,Math.min(.5,(event.clientX-rect.left)/rect.width-.5));const y=Math.max(-.5,Math.min(.5,(event.clientY-rect.top)/rect.height-.5));pose(-16-y*14,chosen+x*24);});
   },{passive:true});
   scene.addEventListener('pointerleave',()=>{cancelAnimationFrame(pending);pose(-16,chosen);});
   reduced.addEventListener('change',()=>{cancelAnimationFrame(pending);pose(-16,chosen);});
   stage.dataset.ready='true';
  }
  const sections=document.querySelectorAll('main > [data-reveal]');
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('section-entered');observer.unobserve(entry.target);}}},{threshold:.08});
  if(!reduced.matches)sections.forEach(section=>observer.observe(section));
  reduced.addEventListener('change',()=>{if(reduced.matches){observer.disconnect();sections.forEach(s=>s.classList.remove('section-entered'));}});
 }
 if('requestIdleCallback' in window)requestIdleCallback(initialize,{timeout:1200});else setTimeout(initialize,0);
})();
