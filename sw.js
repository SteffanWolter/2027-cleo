/* Cleo Explorer: offline shell, original plan and map. No personal data leaves the browser. */
const NAME='cleo-days-explorer-20261013-v2';
const CORE=["./", "./index.html", "./native.css", "./native.js", "./manifest.webmanifest", "./icon.svg", "./icon-192.png", "./icon-512.png", "./posters.html", "./event.html", "./resort.css", "./resort-data.js", "./resort.js", "./assets/resort-map.svg", "./assets/hotel-plan.webp", "./assets/hotel-plan-source.pdf", "./1000074218.jpg", "./1000074226.jpg", "./1000074216.jpg", "./1000074230.jpg", "./1000074217.jpg", "./1000074219.jpg", "./1000074220.jpg", "./1000074227.jpg", "./1000074225.jpg", "./1000074229.jpg", "./1000074224.jpg", "./1000074228.jpg", "./1000074214.jpg", "./1000074215.jpg"];
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
