const menu=document.querySelector('.menu-toggle'), nav=document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.nav-wrap'))closeMenu();});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
const projects=JSON.parse(document.querySelector('#project-data').textContent);
const dialog=document.querySelector('#project-dialog');
const assetRoot=new URL('./',document.querySelector('script[src]').src);
const mediaURL=(file,ext)=>new URL(`media/${file}.${ext}`,assetRoot).href;
const contactURL=new URL('contact/',assetRoot).href;
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',event=>{
 if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0)return;
 event.preventDefault();
 button.closest('.project')?.classList.add('is-selected');
 const p=projects.find(project=>project.id===button.dataset.project);
 const gallery=p.videos.map(v=>`<figure class="client-film ${v.portrait?'portrait-film':''}"><video controls playsinline preload="none" poster="${mediaURL(v.file,'jpg')}" aria-label="${p.client} — ${v.title}" aria-describedby="summary-${v.file}"><source src="${mediaURL(v.file,'mp4')}" type="video/mp4">Votre navigateur ne peut pas lire cette vidéo. <a href="${mediaURL(v.file,'mp4')}">Télécharger la vidéo</a></video><figcaption id="summary-${v.file}"><strong>${v.title}</strong><span>${v.duration}</span><p>${v.summary}</p></figcaption></figure>`).join('');
 document.querySelector('#dialog-content').innerHTML=`<p class="eyebrow">${p.client.toUpperCase()} / ${p.label}</p><h2 id="dialog-title">${p.title}</h2><div class="dialog-details"><div><h3>Contexte</h3><p>${p.context}</p></div><div><h3>Objectif</h3><p>${p.objective}</p></div><div><h3>Travail livré</h3><p>${p.delivery}</p></div></div><nav class="project-actions" aria-label="Liens du projet">${p.website?`<a class="inline-link" href="${p.website}" target="_blank" rel="noopener noreferrer">Visiter prompolu.com <span class="arrow-icon" aria-hidden="true"></span><span class="sr-only">(nouvel onglet)</span></a>`:''}<a class="inline-link" href="${new URL(`realisations/${p.id}/`,assetRoot).href}">Lire l’étude de cas complète <span class="arrow-icon" aria-hidden="true"></span></a></nav><div class="client-films">${gallery}</div><a class="button dark" href="${contactURL}">Parlons de votre projet <span class="arrow-icon" aria-hidden="true"></span></a>`;
 dialog.showModal();document.dispatchEvent(new CustomEvent('promark:project-open'));
 dialog.querySelectorAll('video').forEach(video=>{video.addEventListener('play',()=>dialog.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();}));video.addEventListener('error',()=>{video.insertAdjacentHTML('afterend','<p role="status">Lecture indisponible. Utilisez le lien de téléchargement de la vidéo.</p>');});});
}));
dialog.addEventListener('close',()=>{dialog.querySelectorAll('video').forEach(v=>v.pause());document.querySelectorAll('.project.is-selected').forEach(p=>p.classList.remove('is-selected'));});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});let count=0;document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});document.querySelector('#filter-status').textContent=`${count} projet${count>1?'s':''} affiché${count>1?'s':''}.`;}));
// Finite sequences: no persistent movement, no autoplay sound, no flashing.
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const motionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-playing');motionObserver.unobserve(entry.target);}}),{threshold:0.25});
function observeMotions(root=document){root.querySelectorAll('.motion-art').forEach(art=>{art.classList.remove('is-playing');if(!motionPreference.matches)motionObserver.observe(art);});}
observeMotions();
document.querySelectorAll('.motion-replay').forEach(button=>button.addEventListener('click',()=>{const art=button.closest('.project,.hero-art').querySelector('.motion-art');art.classList.remove('is-playing');if(!motionPreference.matches){void art.offsetWidth;art.classList.add('is-playing');}}));
motionPreference.addEventListener('change',()=>{motionObserver.disconnect();observeMotions();});

document.addEventListener('play',event=>{if(event.target.tagName==='VIDEO'&&!event.target.hasAttribute('data-preview-src'))document.querySelectorAll('video').forEach(v=>{if(v!==event.target)v.pause();});},true);
