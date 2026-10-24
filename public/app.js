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
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
 const p=projects.find(project=>project.id===button.dataset.project);
 const gallery=p.videos.map(v=>`<figure class="client-film ${v.portrait?'portrait-film':''}"><video controls playsinline preload="none" poster="${mediaURL(v.file,'jpg')}" aria-label="${p.client} — ${v.title}" aria-describedby="summary-${v.file}"><source src="${mediaURL(v.file,'mp4')}" type="video/mp4">Votre navigateur ne peut pas lire cette vidéo. <a href="${mediaURL(v.file,'mp4')}">Télécharger la vidéo</a></video><figcaption id="summary-${v.file}"><strong>${v.title}</strong><span>${v.duration}</span><p>${v.summary}</p></figcaption></figure>`).join('');
 document.querySelector('#dialog-content').innerHTML=`<p class="eyebrow">${p.client.toUpperCase()} / ${p.label}</p><h2 id="dialog-title">${p.title}</h2><div class="dialog-details"><div><h3>Contexte</h3><p>${p.context}</p></div><div><h3>Objectif</h3><p>${p.objective}</p></div><div><h3>Travail livré</h3><p>${p.delivery}</p></div></div>${p.website?`<a class="inline-link" href="${p.website}" target="_blank" rel="noopener noreferrer">Visiter prompolu.com <span aria-hidden="true">↗</span><span class="sr-only">(nouvel onglet)</span></a>`:''}<div class="client-films">${gallery}</div><a class="button dark" href="${contactURL}">Parlons de votre projet <span class="arrow-icon" aria-hidden="true"></span></a>`;
 dialog.showModal();
 dialog.querySelectorAll('video').forEach(video=>{video.addEventListener('play',()=>dialog.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();}));video.addEventListener('error',()=>{video.insertAdjacentHTML('afterend','<p role="status">Lecture indisponible. Utilisez le lien de téléchargement de la vidéo.</p>');});});
}));
dialog.addEventListener('close',()=>dialog.querySelectorAll('video').forEach(v=>v.pause()));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});let count=0;document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});document.querySelector('#filter-status').textContent=`${count} projet${count>1?'s':''} affiché${count>1?'s':''}.`;}));
const form=document.querySelector('#contact-form');
if(form){
 const selection=new URLSearchParams(location.search).get('service');if([...form.service.options].some(o=>o.value===selection))form.service.value=selection;
 const fields=[...form.querySelectorAll('input,select,textarea')];
 function validate(field){let error='';if(field.required&&!field.value.trim())error='Veuillez renseigner ce champ.';else if(field.validity.typeMismatch)error='Indiquez une adresse email valide.';else if(field.name==='description'&&field.value.trim().length<20)error='Décrivez votre projet en au moins 20 caractères.';field.setAttribute('aria-invalid',String(Boolean(error)));document.getElementById(field.id+'-error').textContent=error;return !error;}
 fields.forEach(field=>field.addEventListener('input',()=>{document.querySelector('#form-status').textContent='';if(field.hasAttribute('aria-invalid'))validate(field);}));
 form.addEventListener('submit',e=>{e.preventDefault();const valid=fields.map(validate).every(Boolean);if(!valid){fields.find(f=>f.getAttribute('aria-invalid')==='true').focus();document.querySelector('#form-status').textContent='Vérifiez les champs indiqués avant de télécharger votre demande.';return;}
 const labels={name:'Nom',company:'Entreprise',email:'Email',phone:'Téléphone',service:'Service souhaité',description:'Description du projet'};
 const text='DEMANDE DE PROJET — PROMARK\nDocument préparé localement. Cette demande n’a pas été envoyée.\n\n'+fields.map(f=>labels[f.name]+' : '+(f.tagName==='SELECT'?f.selectedOptions[0].text:f.value)).join('\n\n');
 const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='demande-projet-promark.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);document.querySelector('#form-status').textContent='Votre fichier a été préparé. Aucune demande n’a été envoyée à Promark.';
 });
}

// Finite sequences: no persistent movement, no autoplay sound, no flashing.
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const motionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-playing');motionObserver.unobserve(entry.target);}}),{threshold:0.25});
function observeMotions(root=document){root.querySelectorAll('.motion-art').forEach(art=>{art.classList.remove('is-playing');if(!motionPreference.matches)motionObserver.observe(art);});}
observeMotions();
document.querySelectorAll('.motion-replay').forEach(button=>button.addEventListener('click',()=>{const art=button.closest('.project,.hero-art').querySelector('.motion-art');art.classList.remove('is-playing');if(!motionPreference.matches){void art.offsetWidth;art.classList.add('is-playing');}}));
motionPreference.addEventListener('change',()=>{motionObserver.disconnect();observeMotions();});
