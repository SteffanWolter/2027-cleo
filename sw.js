/* Cleo Explorer: offline shell, original plan and map. No personal data leaves the browser. */
const NAME='cleo-days-auto-841f116ea136';
const CORE=["./","./index.html","./native.css","./native.js","./manifest.webmanifest","./icon.svg","./icon-192.png","./icon-512.png","./posters.html","./event.html","./resort.css","./resort-data.js","./resort.js","./dining-program.css","./dining-program.js","./pwa-update.js","./app-version.json","./assets/resort-map.svg","./assets/hotel-plan.webp"];
self.addEventListener('install',e=>e.waitUntil(caches.open(NAME).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(a=>Promise.all(a.filter(n=>n.startsWith('cleo-days-')&&n!==NAME).map(n=>caches.delete(n)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||!e.request.url.startsWith(self.registration.scope))return;
  e.respondWith((async()=>{
    const cache=await caches.open(NAME),controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),4500);
    try{const r=await fetch(e.request,{signal:controller.signal});clearTimeout(timer);if(r.ok)try{await cache.put(e.request,r.clone())}catch{}return r}
    catch{clearTimeout(timer);const hit=await cache.match(e.request)||await cache.match(e.request,{ignoreSearch:true});if(hit)return hit;if(e.request.mode==='navigate')return await cache.match('./index.html');return new Response('Offline: asset not cached',{status:503,headers:{'Content-Type':'text/plain'}})}
  })());
});

self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')self.skipWaiting()});
