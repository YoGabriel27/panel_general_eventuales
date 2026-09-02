/* Service worker mínimo: solo existe para que Chrome/Edge consideren
   esta página instalable como aplicación (en celular y en escritorio).
   No hace nada raro: pide todo por red como siempre, y si algún día no
   hay conexión, muestra la última versión que haya quedado guardada. */
const CACHE_NAME = "eventuales-panel-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(["./"])).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
