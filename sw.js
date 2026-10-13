/* Cleo Days full offline pack · 14 hotel photos and native mobile shell */
const NAME="cleo-days-poster-calendar-v7-20261013";
const CORE=["./","./index.html","./posters.html","./event.html","./native.css","./native.js","./manifest.webmanifest","./icon.svg","./icon-192.png","./icon-512.png"];
self.addEventListener("install",event=>event.waitUntil(caches.open(NAME).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(names=>Promise.all(names.filter(n=>n.startsWith("cleo-days-")&&n!==NAME).map(n=>caches.delete(n)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{if(event.request.method!=="GET"||!event.request.url.startsWith(self.registration.scope))return;event.respondWith((async()=>{const cache=await caches.open(NAME);try{const r=await fetch(event.request);if(r.ok)try{await cache.put(event.request,r.clone())}catch(_){}return r}catch(_){return await cache.match(event.request)||((event.request.mode==="navigate")?await cache.match("./index.html"):null)||new Response("Offline",{status:503})}})())});
