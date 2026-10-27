const C="ky-1ff7a807d7",T="ky-tiles-v1",F=['index.html', 'manifest.json', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png'];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(f=>f==="index.html"?"./":f))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!==T).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
 // map tiles you have looked at stay available offline (OpenStreetMap)
 if(r.url.startsWith("https://tile.openstreetmap.org/")||r.url.startsWith("https://thumb.wikimedia.org/")||r.url.startsWith("https://upload.wikimedia.org/")){e.respondWith(caches.open(T).then(c=>c.match(r).then(x=>x||fetch(r).then(n=>{if(n.ok||n.type==="opaque")c.put(r,n.clone());return n}))));return}
 if(r.mode==="navigate"){e.respondWith(fetch(r).then(x=>{caches.open(C).then(c=>c.put("./",x.clone()));return x}).catch(()=>caches.match("./")));return}
 e.respondWith(caches.match(r).then(x=>x||fetch(r)))});