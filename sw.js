const C="ky-3f228b3200",F=['index.html', 'manifest.json', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png'];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(f=>f==="index.html"?"./":f))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
 if(r.mode==="navigate"){e.respondWith(fetch(r).then(x=>{caches.open(C).then(c=>c.put("./",x.clone()));return x}).catch(()=>caches.match("./")));return}
 e.respondWith(caches.match(r).then(x=>x||fetch(r)))});