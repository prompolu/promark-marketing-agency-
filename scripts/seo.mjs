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
 '':['Agence marketing digital à Fès : web & vidéo | Promark','Promark, agence marketing digital à Fès : création de contenu, gestion des réseaux sociaux, sites web et motion design. Parlons de votre projet.'],
 services:['Services marketing à Fès : contenu, web & vidéo | Promark','Création de contenu, gestion des réseaux sociaux, sites vitrines et motion design à Fès. Un périmètre défini ensemble, sur devis. Découvrez nos services.'],
 realisations:['Réalisations : sites web & vidéos animées | Promark','Les projets de Promark à Fès : site web et SEO/GEO pour Prompolu, films produits en motion design et vidéo animée pour Saraprocmaroc. Voir les projets.'],
 'a-propos':['À propos de Promark, agence marketing à Fès','Promark, agence marketing et création à Fès : des livrables définis, une identité cohérente et un dialogue direct avec les entreprises. Notre approche.'],
 contact:['Contact et devis : agence marketing à Fès | Promark','Contenu, réseaux sociaux, site web ou motion design : décrivez votre activité et votre objectif. Contactez Promark par formulaire, e-mail ou WhatsApp.']
};
export const projectTitles={
 'prompolu-web':'Prompolu : site web, SEO et GEO | Étude de cas Promark',
 'prompolu-motion':'Prompolu : films produits en motion design | Promark',
 'saraproc-motion':'Saraprocmaroc : vidéo animée produits | Promark'
};
export const projectHeadings={
 'prompolu-web':'Prompolu : création du site web et accompagnement SEO/GEO',
 'prompolu-motion':'Prompolu : films produits en motion design',
 'saraproc-motion':'Saraprocmaroc : vidéo animée de présentation produits'
};
export const projectDescriptions={
 'prompolu-web':'Comment Promark a créé le site de Prompolu, spécialiste des profilés aluminium, et accompagné son référencement SEO et GEO pour Google et les outils d’IA.',
 'prompolu-motion':'Quatre créations animées pour Prompolu : film de marque, animation « Nos gammes » et deux formats verticaux autour du profilé S140RP. Voir les vidéos.',
 'saraproc-motion':'Une vidéo animée de 60 secondes, avec musique, pour présenter les produits d’hygiène Saraproc Maroc. Découvrez le projet et le film réalisé par Promark.'
};
export function pageMetadata(slug,fallbackTitle,fallbackDescription){const id=slug.split('/').at(-1);return metadata[slug]||[projectTitles[id]||`${fallbackTitle} | Promark`,projectDescriptions[id]||fallbackDescription];}
export function seoHead({origin,slug,title,description,project,service}){
 const canonical=origin?`${origin}/${slug?slug+'/':''}`:'';
 const imagePath=project?`/media/${project.poster}.jpg`:'/social/cover.jpg';
 const imageAlt=project?project.alt:'Promark, agence marketing et créative à Fès — présentation du site.';
 const tags=`<meta name="robots" content="${origin?'index,follow,max-image-preview:large':'noindex,follow'}"><meta property="og:site_name" content="Promark"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHTML(title)}"><meta name="twitter:description" content="${escapeHTML(description)}">`;
 if(!origin)return tags;
 const organization={'@type':'Organization','@id':`${origin}/#organization`,name:'Promark',url:origin+'/',logo:origin+'/logo.svg',email:contactConfig.email,telephone:contactConfig.phone,contactPoint:{'@type':'ContactPoint',contactType:'customer enquiries',email:contactConfig.email,telephone:contactConfig.phone,url:contactConfig.whatsapp},description:'Agence de marketing et de création basée à Fès, au Maroc.',location:{'@type':'Place',name:'Fès, Maroc',address:{'@type':'PostalAddress',addressLocality:'Fès',addressCountry:'MA'}}};
 const website={'@type':'WebSite','@id':`${origin}/#website`,url:origin+'/',name:'Promark',inLanguage:'fr-MA',publisher:{'@id':organization['@id']}};
 const page={'@type':slug==='contact'?'ContactPage':slug==='a-propos'?'AboutPage':slug==='realisations'?'CollectionPage':'WebPage','@id':canonical+'#webpage',url:canonical,name:title,description,inLanguage:'fr-MA',isPartOf:{'@id':website['@id']},publisher:{'@id':organization['@id']}};
 const graph=[organization,website,page];
 if(slug){
  const items=[{'@type':'ListItem',position:1,name:'Accueil',item:origin+'/'}];
  if(service)items.push({'@type':'ListItem',position:2,name:'Services',item:origin+'/services/'});
  if(project)items.push({'@type':'ListItem',position:2,name:'Réalisations',item:origin+'/realisations/'});
  items.push({'@type':'ListItem',position:items.length+1,name:project?`${project.client} — ${project.title}`:service?service.name:title.split('|')[0].trim(),item:canonical});
  const breadcrumb={'@type':'BreadcrumbList','@id':canonical+'#breadcrumb',itemListElement:items};graph.push(breadcrumb);page.breadcrumb={'@id':breadcrumb['@id']};
 }
 if(service){page.mainEntity={'@type':'Service','@id':canonical+'#service',name:service.name,description:service.summary,provider:{'@id':organization['@id']},areaServed:{'@type':'Country',name:'Maroc'}};}
 if(project){page.mainEntity={'@type':'CreativeWork',name:`${project.client} — ${project.title}`,description:project.delivery,creator:{'@id':organization['@id']},about:{'@type':'Organization',name:project.client,...(project.website?{url:project.website}:{})}};}
 const json=JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c');
 return tags+`<link rel="canonical" href="${escapeHTML(canonical)}"><meta property="og:url" content="${escapeHTML(canonical)}"><meta property="og:image" content="${origin}${imagePath}"><meta property="og:image:width" content="${project?'1280':'1200'}"><meta property="og:image:height" content="${project?'720':'630'}"><meta property="og:image:alt" content="${escapeHTML(imageAlt)}"><meta name="twitter:image" content="${origin}${imagePath}"><meta name="twitter:image:alt" content="${escapeHTML(imageAlt)}"><script type="application/ld+json">${json}</script>`;
}
