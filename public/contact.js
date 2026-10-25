(() => {
 const form=document.querySelector('#contact-form');
 if(!form)return;
 form.noValidate=true;
 const contact=JSON.parse(document.querySelector('#contact-data').textContent);
 const status=document.querySelector('#form-status');
 const submit=form.querySelector('[type="submit"]');
 const originalButton=submit.innerHTML;
 const fields=[...form.querySelectorAll('input:not([name="_gotcha"]),select,textarea')];
 const selection=new URLSearchParams(location.search).get('service');
 if([...form.elements.service.options].some(o=>o.value===selection))form.elements.service.value=selection;
 function validate(field){
  let error='';
  if(field.required&&!field.value.trim())error='Veuillez renseigner ce champ.';
  else if(field.validity.typeMismatch)error='Indiquez une adresse email valide.';
  else if(field.name==='description'&&field.value.trim().length<20)error='Décrivez votre projet en au moins 20 caractères.';
  field.setAttribute('aria-invalid',String(Boolean(error)));
  document.getElementById(field.id+'-error').textContent=error;
  return !error;
 }
 fields.forEach(f=>f.addEventListener('input',()=>{status.textContent='';if(f.hasAttribute('aria-invalid'))validate(f);}));
 function prepare(){
  if(!fields.map(validate).every(Boolean)){fields.find(f=>f.getAttribute('aria-invalid')==='true').focus();status.textContent='Vérifiez les champs indiqués avant de préparer votre demande.';return null;}
  const labels={name:'Nom',company:'Entreprise',email:'Email',phone:'Téléphone',service:'Service souhaité',description:'Description du projet'};
  const values=Object.fromEntries(fields.map(f=>[f.name,f.tagName==='SELECT'?f.selectedOptions[0].text:f.value.trim()]));
  return {values,text:'DEMANDE DE PROJET — PROMARK\n\n'+Object.entries(values).map(([key,value])=>labels[key]+' : '+value).join('\n\n')};
 }
 function busy(value){form.setAttribute('aria-busy',String(value));submit.disabled=value;form.querySelector('.download-draft').disabled=value;submit.innerHTML=value?'Envoi en cours…':originalButton;}
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(submit.disabled)return;
  const draft=prepare();if(!draft)return;
  if(form.elements._gotcha.value){status.textContent='Impossible de transmettre cette demande. Contactez-nous par email ou WhatsApp.';return;}
  if(!contact.formEndpoint){
   const subject=('Projet Promark — '+draft.values.company).replace(/[\r\n]/g,' ');
   const a=document.createElement('a');a.href='mailto:'+contact.email+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(draft.text);a.click();
   status.textContent='Un brouillon a été demandé à votre application email. Vérifiez le message et envoyez-le depuis votre messagerie. Aucun envoi automatique n’a été effectué.';return;
  }
  busy(true);status.textContent='Transmission de votre demande…';
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),15000);
  try{
   const response=await fetch(contact.formEndpoint,{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify({...draft.values,_subject:('Projet Promark — '+draft.values.company).replace(/[\r\n]/g,' '),_gotcha:''}),signal:controller.signal});
   const result=await response.json().catch(()=>null);
   if(!response.ok||result?.ok!==true)throw new Error(response.status===429?'rate-limit':'rejected');
   status.textContent='Votre demande a été transmise au service de réception de Promark. Merci pour votre message.';
   form.reset();fields.forEach(f=>{f.removeAttribute('aria-invalid');document.getElementById(f.id+'-error').textContent='';});
   form.dispatchEvent(new CustomEvent('promark:enquiry',{bubbles:true,detail:{channel:'form',state:'accepted'}}));
  }catch(error){
   status.textContent=error.message==='rate-limit'?'Trop de tentatives rapprochées. Réessayez plus tard ou contactez-nous sur WhatsApp.':error.name==='AbortError'?'La réception n’a pas pu être confirmée à temps. Pour éviter un doublon, contactez-nous avant de réessayer.':'L’envoi n’a pas pu être confirmé. Vos informations sont conservées dans le formulaire. Réessayez ou contactez-nous par email ou WhatsApp.';
  }finally{clearTimeout(timeout);busy(false);}
 });
 form.querySelector('.download-draft').addEventListener('click',()=>{
  const draft=prepare();if(!draft)return;
  const url=URL.createObjectURL(new Blob([draft.text+'\n\nDocument préparé localement. Cette demande n’a pas été envoyée.'],{type:'text/plain;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download='demande-projet-promark.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  status.textContent='Votre fichier a été préparé. Envoyez-le à '+contact.email+'. Aucune demande n’a été envoyée automatiquement.';
 });
 // Enable draft actions only after the submit handler is attached.
 submit.disabled=false;form.querySelector('.download-draft').disabled=false;
})();
