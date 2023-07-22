const cacheName = 'daysWithoutSmoking-v1';
const cacheAssets = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    // Add the paths to the app icons here
];

// Install event
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if (cache !== cacheName) {
                            console.log('Service Worker: Clearing Old Cache');
                            return caches.delete(cache);
                        }
                    })
                );
            })
    );
});

// Fetch event
self.addEventListener('fetch', (e) => {
    console.log('Service Worker: Fetching');

    e.respondWith(
        fetch(e.request)
            .then(res => {
                const resClone = res.clone();
                caches.open(cacheName)
                    .then(cache => {
                        cache.put(e.request, resClone);
                    });
                return res;
            })
            .catch(() => caches.match(e.request).then(res => res))
    );
});
