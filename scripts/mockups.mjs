export function posterPicture(file,alt,priority=false){
 return `<picture><source type="image/webp" srcset="/media/${file}-640.webp 640w, /media/${file}-1280.webp 1280w" sizes="(max-width: 760px) calc(100vw - 70px), 560px"><img src="/media/${file}.jpg" alt="${alt}" width="1280" height="720" loading="${priority?'eager':'lazy'}" ${priority?'fetchpriority="high"':''}></picture>`;
}
export function phoneMockup(){
 return `<div class="phone-device"><div class="phone-speaker" aria-hidden="true"></div><div class="phone-screen"><picture><source type="image/webp" srcset="/media/prompolu-s140-360.webp 360w, /media/prompolu-s140-720.webp 720w" sizes="160px"><img src="/media/prompolu-s140.jpg" alt="Création verticale Prompolu S140RP" width="720" height="1280" loading="lazy"></picture><video muted playsinline preload="none" data-preview-src="/media/prompolu-s140.mp4" aria-hidden="true" tabindex="-1"></video></div><span class="phone-home" aria-hidden="true"></span></div>`;
}
export function renderDevicePreview(p,priority=false){
 const video=p.videos[0].file;
 return `<div class="art media-art device-stage" data-reactive-card><div class="device-surface ${p.id==='prompolu-motion'?'device-pair':''}"><div class="browser-device"><div class="browser-chrome" aria-hidden="true"><span class="window-dots"><i></i><i></i><i></i></span><span>${p.category==='web'?'SITE WEB / CATALOGUE':'FILM / MOTION DESIGN'}</span><span>↗</span></div><div class="device-screen">${posterPicture(p.poster,p.alt,priority)}<video muted playsinline preload="none" data-preview-src="/media/${video}.mp4" aria-hidden="true" tabindex="-1"></video></div></div>${p.id==='prompolu-motion'?phoneMockup():''}</div><span class="card-edge" aria-hidden="true"></span><span class="watch-label">${p.category==='web'?'DÉCOUVRIR LE PROJET':'VOIR LES FILMS'} <span class="arrow-icon" aria-hidden="true"></span></span></div>`;
}
