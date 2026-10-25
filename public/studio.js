(() => {
 document.documentElement.classList.add('js');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const fine=matchMedia('(hover:hover) and (pointer:fine)');
 const toggle=document.querySelector('.physical-switch');
 toggle?.addEventListener('click',()=>{const enabled=toggle.getAttribute('aria-checked')!=='true';toggle.setAttribute('aria-checked',String(enabled));toggle.closest('.studio-hero').classList.toggle('light-off',!enabled);});
 const scene=document.querySelector('.switch-scene');let pending=0;
 scene?.addEventListener('pointermove',e=>{if(reduced.matches||!fine.matches)return;cancelAnimationFrame(pending);pending=requestAnimationFrame(()=>{const r=scene.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;toggle.style.transform=`rotateY(${-22+x*20}deg) rotateX(${9-y*15}deg) rotateZ(-7deg)`;});});
 function reset(){cancelAnimationFrame(pending);toggle?.style.removeProperty('transform');}
 scene?.addEventListener('pointerleave',reset);reduced.addEventListener('change',reset);
 const clock=document.querySelector('.studio-clock time');if(clock){const visible=matchMedia('(min-width:901px)');let formatter;const tick=()=>{if(!visible.matches||document.hidden)return;formatter??=new Intl.DateTimeFormat('fr-MA',{timeZone:'Africa/Casablanca',hour:'2-digit',minute:'2-digit'});clock.textContent=formatter.format(new Date());};tick();visible.addEventListener('change',tick);setInterval(tick,60000);}
 // Native dialog supplies focus containment, Escape and restoration to the trigger.
 const trigger=document.querySelector('.menu-toggle'),source=document.querySelector('#navigation');
 const modal=document.createElement('dialog');modal.className='menu-overlay';modal.setAttribute('aria-labelledby','menu-title');modal.innerHTML='<button type="button" class="dialog-close" aria-label="Fermer le menu">Fermer ×</button><h2 id="menu-title">Explorer Promark</h2><nav aria-label="Navigation principale">'+source.innerHTML+'</nav><p class="eyebrow">FÈS, MAROC · DES IDÉES QUI PRENNENT FORME.</p>';document.body.append(modal);
 trigger.addEventListener('click',()=>{source.classList.remove('is-open');trigger.setAttribute('aria-expanded','true');trigger.setAttribute('aria-controls','studio-menu');modal.id='studio-menu';modal.showModal();});
 modal.querySelector('button').addEventListener('click',()=>modal.close());modal.addEventListener('close',()=>trigger.setAttribute('aria-expanded','false'));modal.addEventListener('click',e=>{if(e.target!==modal)return;const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();});
})();
(() => {
 const dialog=document.querySelector('.contact-overlay');if(!dialog)return;
 const target=new URL('contact/',new URL('./',document.querySelector('script[src]').src));
 document.querySelectorAll('a[href]').forEach(link=>{if(link.href!==target.href)return;link.addEventListener('click',e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();document.querySelector('.menu-overlay[open]')?.close();dialog.showModal();});});
 dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
})();
