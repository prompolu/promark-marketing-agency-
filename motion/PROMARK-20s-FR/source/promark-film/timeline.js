/* One deterministic, editable master. Absolute seconds follow the approved 20s brief. */
window.__timelines=window.__timelines||{};
const tl=gsap.timeline({paused:true,defaults:{ease:'power3.out'}});
window.__timelines.promark=tl;
const show=(s,t)=>tl.set(s,{opacity:1},t);
const hide=(s,t)=>tl.set(s,{opacity:0},t);
const enter=(s,v,t)=>tl.from(s,{...v,immediateRender:!["#selected","#final",".social-ill",".web-ill",".motion-ill"].includes(s)},t);
// 00.00–02.30 / opening: mask + restrained character cascade + SVG stroke.
enter('.intro-meta',{y:-15,opacity:0,duration:.45,ease:'sine.out'},.10);
enter('.first-line',{yPercent:115,duration:.55,ease:'expo.out'},.15);
enter('.char',{yPercent:115,rotation:2,opacity:0,duration:.36,stagger:.023,ease:'power3.out'},.22);
enter('.opening-bottom>span',{x:-30,opacity:0,duration:.5,ease:'power2.out'},.45);
enter('.opening-star',{scale:.75,rotation:-35,opacity:0,duration:.5,ease:'back.out(.5)'},.50);
const underline=document.querySelector('#underline-path');const length=underline.getTotalLength();
tl.set(underline,{strokeDasharray:length,strokeDashoffset:length},0).to(underline,{strokeDashoffset:0,duration:.4,ease:'sine.inOut'},.95);
show('#sentence-dot',2.0);tl.to('#sentence-dot',{x:-333,y:-66,duration:.29,ease:'power3.inOut'},2.0);
// Dot expands to the original logo's black canvas; colors invert.
show('.transition-disc',2.28);tl.to('.transition-disc',{scale:155,duration:.30,ease:'expo.inOut'},2.28);
show('#brand',2.42);hide('#opening',2.58);hide('.transition-disc',2.59);
enter('.brand-top',{opacity:0,x:-24,duration:.3,ease:'sine.out'},2.58);
enter('.reveal-logo',{opacity:0,scale:.92,y:24,duration:.38,ease:'power3.out'},2.56);
enter('.brand-tag span',{opacity:0,y:24,duration:.25,stagger:.105,ease:'power2.out'},2.79);
enter('.brand-footer>span',{opacity:0,x:28,duration:.32,ease:'expo.out'},2.9);
enter('.brand-star',{opacity:0,rotation:-40,scale:.6,duration:.28,ease:'back.out(.4)'},3.1);
// 03.45 / asterisk crosses the canvas, carrying a horizontal page push.
show('.transition-star',3.45);tl.to('.transition-star',{x:1370,y:-390,rotation:135,scale:1.2,duration:.34,ease:'power3.inOut'},3.45);
show('#services',3.55);tl.from('#services',{x:1920,duration:.32,ease:'expo.inOut',immediateRender:false},3.55);hide('#brand',3.87);hide('.transition-star',3.9);
enter('.services-meta',{y:-15,opacity:0,duration:.25,ease:'sine.out'},3.72);
enter('.strip-viewport',{y:50,opacity:0,duration:.28,ease:'expo.out'},3.72);
enter('.portrait',{y:110,opacity:0,rotationY:-15,duration:.3,stagger:.045,ease:'power3.out'},3.76);
enter('.concept-note',{opacity:0,duration:.2,ease:'power1.out'},3.95);
enter('.service-progress',{scaleX:0,duration:.25,ease:'power2.out'},3.9);
// Each label travels as part of the same long strip, with clean reading pauses.
[[4.27,-1560],[4.92,-3120],[5.62,-4680]].forEach(([t,x])=>tl.to('.strip',{x,duration:.20,ease:'power4.inOut'},t));
[['.social-ill','.content-ill',4.31],['.web-ill','.social-ill',4.96],['.motion-ill','.web-ill',5.66]].forEach(([next,prev,t])=>{show(next,t);enter(next,{y:65,scale:.96,opacity:0,duration:.22,ease:'power3.out'},t);tl.to(prev,{opacity:0,duration:.14,ease:'sine.in'},t);});
enter('.social-grid>div',{scale:.85,duration:.18,stagger:.023,ease:'back.out(.4)'},4.34);
enter('.browser',{rotation:4,scale:.94,duration:.26,ease:'power2.out'},5.0);
tl.from('.motion-star',{rotation:-60,scale:.7,duration:.35,ease:'expo.out',immediateRender:false},5.73);
tl.to('.service-progress span',{scaleX:.25,duration:.1},3.75).to('.service-progress span',{scaleX:.5,duration:.17},4.35).to('.service-progress span',{scaleX:.75,duration:.17},5).to('.service-progress span',{scaleX:1,duration:.17},5.7);
// 06.50 / rows are revealed by an editorial vertical shutter.
show('#system',6.38);tl.from('#system',{y:1080,duration:.25,ease:'power4.inOut',immediateRender:false},6.38);hide('#services',6.65);
enter('.system-meta',{x:-25,opacity:0,duration:.25,ease:'sine.out'},6.53);
enter('.service-row',{x:-80,opacity:0,duration:.36,stagger:.1,ease:'expo.out'},6.55);
enter('.round',{scale:.6,rotation:-30,duration:.35,stagger:.1,ease:'back.out(.35)'},6.6);
enter('.system-note',{opacity:0,y:20,duration:.3,ease:'power2.out'},7.02);
tl.to('.r3',{backgroundColor:'#141515',color:'#f5f4ee',duration:.12,ease:'sine.inOut'},7.24).to('.r3 .num',{color:'#f5f4ee',duration:.12},7.24);
tl.to('.r3',{backgroundColor:'#f5f4ee',color:'#141515',duration:.12},7.61).to('.r3 .num',{color:'#62645c',duration:.12},7.61);
tl.to('.r4',{backgroundColor:'#141515',color:'#f5f4ee',duration:.12},7.63).to('.r4 .num',{color:'#f5f4ee',duration:.12},7.63);
// Last arrow becomes the gallery's frame.
show('.transition-frame',8.27);tl.to('.transition-frame',{x:-680,y:-260,scaleX:26,scaleY:16,borderRadius:0,backgroundColor:'#000',duration:.31,ease:'expo.inOut'},8.27);
show('#gallery',8.48);hide('#system',8.6);hide('.transition-frame',8.61);
enter('.gallery-heading',{opacity:0,y:-18,duration:.28,ease:'sine.out'},8.56);
enter('.gallery-rail .portfolio-card',{y:120,opacity:0,duration:.39,stagger:.055,ease:'power3.out'},8.56);
enter('.gallery-bottom',{opacity:0,x:35,duration:.35,ease:'power2.out'},8.75);
// Acceleration, a short blur at peak travel, then clean deceleration.
tl.to('.gallery-rail',{y:-180,duration:.22,ease:'power2.in'},9.23).to('.gallery-rail',{y:-1020,duration:.45,ease:'none'},9.45).to('.gallery-rail',{y:-1200,duration:.52,ease:'power3.out'},9.9);
tl.to('.gallery-rail',{filter:'blur(4px)',duration:.18,ease:'sine.in'},9.35).to('.gallery-rail',{filter:'blur(0px)',duration:.3,ease:'sine.out'},9.95);
// 11.40 / selected card comes forward. Same real project, no invented outcomes.
show('#selected',11.25);enter('#selected',{y:1080,duration:.30,ease:'power4.inOut'},11.25);hide('#gallery',11.53);
enter('.selected-heading h2',{y:30,opacity:0,duration:.35,ease:'expo.out'},11.38);
enter('.selected-heading .eyebrow',{x:35,opacity:0,duration:.3,ease:'power2.out'},11.5);
enter('.hero-card',{scale:.60,y:85,rotationY:7,rotation:-4,opacity:0,duration:.65,ease:'power3.out'},11.35);
enter('.category',{x:-25,opacity:0,duration:.3,ease:'sine.out'},11.95);
// Card contracts into a line; this is the brief's object-motivated transition.
show('.transition-line',13.14);tl.from('.transition-line',{scaleY:350,duration:.3,ease:'expo.inOut',immediateRender:false},13.14);
show('#method',13.27);tl.from('#method',{y:1080,duration:.3,ease:'power4.inOut',immediateRender:false},13.27);hide('#selected',13.58);hide('.transition-line',13.6);
enter('.method-meta',{opacity:0,y:-18,duration:.25,ease:'sine.out'},13.42);
enter('#method h2',{y:45,opacity:0,duration:.35,ease:'expo.out'},13.45);
enter('.process-rule',{scaleX:0,duration:1.05,ease:'power2.out'},13.58);
enter('.step p',{y:25,opacity:0,duration:.28,stagger:.16,ease:'power3.out'},13.66);
enter('.step-no',{opacity:0,x:-15,duration:.25,stagger:.16,ease:'sine.out'},13.66);
enter('.node',{scale:0,duration:.24,stagger:.16,ease:'back.out(.4)'},13.63);
for(let i=1;i<=4;i++)tl.to(`.step:nth-of-type(${i+1}) .node`,{backgroundColor:'#d7ff00',duration:.13},13.7+(i-1)*.37);
enter('.method-footer',{opacity:0,x:20,duration:.3,ease:'power2.out'},14.15);
// 15.20 / last node moves to center and expands to a new page and CTA.
show('.transition-node',15.2);tl.to('.transition-node',{x:-410,y:-120,scale:70,duration:.3,ease:'expo.inOut'},15.2);
show('#invitation',15.38);hide('#method',15.52);hide('.transition-node',15.53);
enter('.invite-meta',{x:-20,opacity:0,duration:.25,ease:'sine.out'},15.48);
enter('.invite-copy>h2',{y:45,opacity:0,duration:.34,ease:'power3.out'},15.43);
enter('.invite-second',{yPercent:120,duration:.36,ease:'expo.out'},15.53);
enter('.cta',{scaleX:.08,scaleY:.2,opacity:0,duration:.35,ease:'power3.out'},15.69);
enter('.cta>span,.cta>svg',{opacity:0,x:-16,duration:.25,stagger:.04,ease:'sine.out'},15.87);
enter('.invite-star',{rotation:-45,scale:.6,opacity:0,duration:.38,ease:'back.out(.35)'},15.65);
// Button surface expands; black original logo canvas resolves over lime.
show('.transition-button',17.0);tl.to('.transition-button',{x:400,y:-160,scaleX:3.6,scaleY:12,duration:.3,ease:'expo.inOut'},17.0);
show('#final',17.24);enter('#final',{opacity:0,duration:.2,ease:'sine.out'},17.24);hide('#invitation',17.44);hide('.transition-button',17.45);
enter('.final-logo',{scale:.97,y:12,opacity:0,duration:.30,ease:'power3.out'},17.35);
enter('.final-message p',{y:15,opacity:0,duration:.26,stagger:.045,ease:'expo.out'},17.43);
enter('.final-location',{opacity:0,duration:.22,ease:'sine.out'},17.53);
enter('.final-cta',{opacity:0,y:12,duration:.22,ease:'power2.out'},17.58);
enter('.final-rule',{scaleX:0,duration:.2,ease:'power1.out'},17.59);
// No outro fade. Entire composition holds completely still from 17.80 through 20.00.
