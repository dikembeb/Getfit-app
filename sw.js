const CACHE = ‘gfdt-v1’;
const ASSETS = [
‘/’,
‘/index.html’,
‘https://cdn.jsdelivr.net/npm/preact@10.19.3/dist/preact.min.js’,
‘https://cdn.jsdelivr.net/npm/preact@10.19.3/compat/dist/compat.min.js’,
];

// Install — cache everything on first visit
self.addEventListener(‘install’, e => {
e.waitUntil(
caches.open(CACHE).then(cache => cache.addAll(ASSETS))
);
self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener(‘activate’, e => {
e.waitUntil(
caches.keys().then(keys =>
Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
)
);
self.clients.claim();
});

// Fetch — serve from cache, fall back to network
self.addEventListener(‘fetch’, e => {
e.respondWith(
caches.match(e.request).then(cached => {
return cached || fetch(e.request).then(response => {
// Cache new requests
if(response.ok){
const clone = response.clone();
caches.open(CACHE).then(cache => cache.put(e.request, clone));
}
return response;
});
})
);
});
