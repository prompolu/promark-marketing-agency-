import {contactConfig} from './site-config.mjs';
export function productionOrigin(value) {
 if(!value) return '';
 const url=new URL(value);
 if(url.protocol!=='https:'||url.username||url.password||url.pathname!=='/'||url.search||url.hash)throw new Error('SITE_URL must be a confirmed HTTPS origin, without credentials, path, query or fragment.');
 return url.origin;
}
export function deploymentBasePath(value='') {
 if(!value||value==='/')return '';
 if(!/^\/(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-]+\/?$/.test(value))throw new Error('SITE_BASE_PATH must be a clean absolute path with no query, fragment or traversal.');
 return value.replace(/\/$/,'');
}
export const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const metadata={
 '':['Agence marketing à Fès : web & motion design | Promark','Promark, agence marketing et créative à Fès : création de contenu, réseaux sociaux, sites web et motion design. Découvrez nos projets et notre approche.'],
 services:['Contenu, sites web & motion design à Fès | Promark','Création de contenu et vidéos, gestion des réseaux sociaux, sites vitrines et motion design à Fès. Périmètre défini ensemble, prestations sur devis.'],
 realisations:['Réalisations : Prompolu & Saraprocmaroc | Promark','Découvrez nos projets pour Prompolu et Saraprocmaroc : création de site web, accompagnement SEO et GEO, films produits et vidéos animées.'],
 'a-propos':['Promark, agence créative basée à Fès au Maroc','Découvrez l’approche Promark : une agence marketing à Fès, des livrables définis, une identité cohérente et une collaboration directe avec les entreprises.'],
 contact:['Parlons de votre projet créatif à Fès | Promark','Préparez votre demande pour Promark : contenu, réseaux sociaux, site web ou motion design. Décrivez votre activité, vos objectifs et le service souhaité.']
};
export const projectTitles={
 'prompolu-web':'Prompolu : création de site web, SEO & GEO | Promark',
 'prompolu-motion':'Motion design pour Prompolu : films produits | Promark',
 'saraproc-motion':'Vidéo animée pour Saraprocmaroc | Promark'
};
export function pageMetadata(slug,fallbackTitle,fallbackDescription){return metadata[slug]||[projectTitles[slug.split('/').at(-1)]||`${fallbackTitle} | Promark`,fallbackDescription];}
export function seoHead({origin,slug,title,description,project}){
 const canonical=origin?`${origin}/${slug?slug+'/':''}`:'';
 const imagePath=project?`/media/${project.poster}.jpg`:'/social/cover.jpg';
 const imageAlt=project?project.alt:'Promark, agence marketing et créative à Fès — présentation du site.';
 const tags=`<meta name="robots" content="${origin?'index,follow,max-image-preview:large':'noindex,follow'}"><meta property="og:site_name" content="Promark"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHTML(title)}"><meta name="twitter:description" content="${escapeHTML(description)}">`;
 if(!origin)return tags;
 const organization={'@type':'Organization','@id':`${origin}/#organization`,name:'Promark',url:origin+'/',email:contactConfig.email,telephone:contactConfig.phone,contactPoint:{'@type':'ContactPoint',contactType:'customer enquiries',email:contactConfig.email,telephone:contactConfig.phone,url:contactConfig.whatsapp},description:'Agence de marketing et de création basée à Fès, au Maroc.',location:{'@type':'Place',name:'Fès, Maroc',address:{'@type':'PostalAddress',addressLocality:'Fès',addressCountry:'MA'}}};
 const website={'@type':'WebSite','@id':`${origin}/#website`,url:origin+'/',name:'Promark',inLanguage:'fr-MA',publisher:{'@id':organization['@id']}};
 const page={'@type':slug==='contact'?'ContactPage':slug==='a-propos'?'AboutPage':slug==='realisations'?'CollectionPage':'WebPage','@id':canonical+'#webpage',url:canonical,name:title,description,inLanguage:'fr-MA',isPartOf:{'@id':website['@id']},publisher:{'@id':organization['@id']}};
 const graph=[organization,website,page];
 if(slug){
  const items=[{'@type':'ListItem',position:1,name:'Accueil',item:origin+'/'}];
  if(project)items.push({'@type':'ListItem',position:2,name:'Réalisations',item:origin+'/realisations/'});
  items.push({'@type':'ListItem',position:items.length+1,name:project?`${project.client} — ${project.title}`:title.split('|')[0].trim(),item:canonical});
  const breadcrumb={'@type':'BreadcrumbList','@id':canonical+'#breadcrumb',itemListElement:items};graph.push(breadcrumb);page.breadcrumb={'@id':breadcrumb['@id']};
 }
 if(project){page.mainEntity={'@type':'CreativeWork',name:`${project.client} — ${project.title}`,description:project.delivery,creator:{'@id':organization['@id']},about:{'@type':'Organization',name:project.client,...(project.website?{url:project.website}:{})}};}
 const json=JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c');
 return tags+`<link rel="canonical" href="${escapeHTML(canonical)}"><meta property="og:url" content="${escapeHTML(canonical)}"><meta property="og:image" content="${origin}${imagePath}"><meta property="og:image:width" content="${project?'1280':'1200'}"><meta property="og:image:height" content="${project?'720':'630'}"><meta property="og:image:alt" content="${escapeHTML(imageAlt)}"><meta name="twitter:image" content="${origin}${imagePath}"><meta name="twitter:image:alt" content="${escapeHTML(imageAlt)}"><script type="application/ld+json">${json}</script>`;
}
