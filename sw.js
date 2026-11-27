const CACHE_NAME = 'mech-tkmce-v3.4-unified-focus-and-resources';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './mech_design_system.css',
  './mech_core_data.js',
  './mech_simulations.js',
  './mech_app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './assets/rod.svg',
  './assets/beam.svg',
  './assets/mohr.svg',
  './assets/column.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});
