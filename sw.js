// Guarda o aplicativo no aparelho para funcionar sem internet
const CACHE="vistoria-v1";
const ARQUIVOS=["./","index.html","manifest.json","apple-touch-icon.png","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARQUIVOS)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  e.respondWith(fetch(e.request).then(r=>{ if(r.ok&&(e.request.url.startsWith(self.location.origin)||e.request.url.includes("fonts.g"))){ const cp=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)); } return r; }).catch(()=>caches.match(e.request).then(m=>m||caches.match("index.html"))));
});
