const CACHE_NAME = 'seniori-cache-v1';
const ASSETS = [
    '/senior--app/',
    '/senior--app/index.html',
    '/senior--app/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : undefined))))
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    event.respondWith(
        caches.match(req).then((cached) => cached || fetch(req).catch(() => cached))
    );
});
