const CACHE_NAME = 'minwarak-offline-v5';
const urlsToCache = [
    '/',
    '/index.html',
    '/admin.html',
    '/script.js',
    '/styles.css',
    '/codes.json',
    '/announcements.json',
    '/categories.json',
    '/manifest.json',
    '/assets/default_category.webp',
    '/assets/stickers/sticker1.png',
    '/assets/stickers/sticker2.png',
    '/assets/icon.png',
    '/assets/icon-512.png',
    '/assets/أنمي/category_image.webp',
    '/assets/شخصيات عامة/category_image.webp',
    '/assets/أفلام/category_image.webp',
    '/assets/رياضة/category_image.webp',
    '/assets/ديزني/category_image.webp',
    '/assets/معالم/category_image.webp',
    '/assets/الطيبين/category_image.webp',
    '/assets/ممثلين/category_image.webp',
    '/assets/شعارات/category_image.webp',
    '/assets/أنمي/metadata.json',
    '/assets/أنمي/names.json',
    '/assets/شخصيات عامة/metadata.json',
    '/assets/شخصيات عامة/names.json',
    '/assets/أفلام/metadata.json',
    '/assets/أفلام/names.json',
    '/assets/رياضة/metadata.json',
    '/assets/رياضة/names.json',
    '/assets/ديزني/metadata.json',
    '/assets/ديزني/names.json',
    '/assets/معالم/metadata.json',
    '/assets/معالم/names.json',
    '/assets/الطيبين/metadata.json',
    '/assets/الطيبين/names.json',
    '/assets/ممثلين/metadata.json',
    '/assets/ممثلين/names.json',
    '/assets/شعارات/metadata.json',
    '/assets/شعارات/names.json',
    '/assets/أنمي/image1.webp', '/assets/أنمي/image2.webp', '/assets/أنمي/image3.webp', '/assets/أنمي/image4.webp', '/assets/أنمي/image5.webp',
    '/assets/أنمي/image6.webp', '/assets/أنمي/image7.webp', '/assets/أنمي/image8.webp', '/assets/أنمي/image9.webp', '/assets/أنمي/image10.webp',
    '/assets/أنمي/image11.webp', '/assets/أنمي/image12.webp', '/assets/أنمي/image13.webp', '/assets/أنمي/image14.webp', '/assets/أنمي/image15.webp',
    '/assets/أنمي/image16.webp', '/assets/أنمي/image17.webp', '/assets/أنمي/image18.webp', '/assets/أنمي/image19.webp', '/assets/أنمي/image20.webp',
    '/assets/شخصيات عامة/image1.webp', '/assets/شخصيات عامة/image2.webp', '/assets/شخصيات عامة/image3.webp', '/assets/شخصيات عامة/image4.webp', '/assets/شخصيات عامة/image5.webp',
    '/assets/شخصيات عامة/image6.webp', '/assets/شخصيات عامة/image7.webp', '/assets/شخصيات عامة/image8.webp', '/assets/شخصيات عامة/image9.webp', '/assets/شخصيات عامة/image10.webp',
    '/assets/شخصيات عامة/image11.webp', '/assets/شخصيات عامة/image12.webp', '/assets/شخصيات عامة/image13.webp', '/assets/شخصيات عامة/image14.webp', '/assets/شخصيات عامة/image15.webp',
    '/assets/شخصيات عامة/image16.webp', '/assets/شخصيات عامة/image17.webp', '/assets/شخصيات عامة/image18.webp', '/assets/شخصيات عامة/image19.webp', '/assets/شخصيات عامة/image20.webp',
    '/assets/أفلام/image1.webp', '/assets/أفلام/image2.webp', '/assets/أفلام/image3.webp', '/assets/أفلام/image4.webp', '/assets/أفلام/image5.webp',
    '/assets/أفلام/image6.webp', '/assets/أفلام/image7.webp', '/assets/أفلام/image8.webp', '/assets/أفلام/image9.webp', '/assets/أفلام/image10.webp',
    '/assets/أفلام/image11.webp', '/assets/أفلام/image12.webp', '/assets/أفلام/image13.webp', '/assets/أفلام/image14.webp', '/assets/أفلام/image15.webp',
    '/assets/أفلام/image16.webp', '/assets/أفلام/image17.webp', '/assets/أفلام/image18.webp', '/assets/أفلام/image19.webp', '/assets/أفلام/image20.webp',
    '/assets/رياضة/image1.webp', '/assets/رياضة/image2.webp', '/assets/رياضة/image3.webp', '/assets/رياضة/image4.webp', '/assets/رياضة/image5.webp',
    '/assets/رياضة/image6.webp', '/assets/رياضة/image7.webp', '/assets/رياضة/image8.webp', '/assets/رياضة/image9.webp', '/assets/رياضة/image10.webp',
    '/assets/رياضة/image11.webp', '/assets/رياضة/image12.webp', '/assets/رياضة/image13.webp', '/assets/رياضة/image14.webp', '/assets/رياضة/image15.webp',
    '/assets/رياضة/image16.webp', '/assets/رياضة/image17.webp', '/assets/رياضة/image18.webp', '/assets/رياضة/image19.webp', '/assets/رياضة/image20.webp',
    '/assets/ديزني/image1.webp', '/assets/ديزني/image2.webp', '/assets/ديزني/image3.webp', '/assets/ديزني/image4.webp', '/assets/ديزني/image5.webp',
    '/assets/ديزني/image6.webp', '/assets/ديزني/image7.webp', '/assets/ديزني/image8.webp', '/assets/ديزني/image9.webp', '/assets/ديزني/image10.webp',
    '/assets/ديزني/image11.webp', '/assets/ديزني/image12.webp', '/assets/ديزني/image13.webp', '/assets/ديزني/image14.webp', '/assets/ديزني/image15.webp',
    '/assets/ديزني/image16.webp', '/assets/ديزني/image17.webp', '/assets/ديزني/image18.webp', '/assets/ديزني/image19.webp', '/assets/ديزني/image20.webp',
    '/assets/معالم/image1.webp', '/assets/معالم/image2.webp', '/assets/معالم/image3.webp', '/assets/معالم/image4.webp', '/assets/معالم/image5.webp',
    '/assets/معالم/image6.webp', '/assets/معالم/image7.webp', '/assets/معالم/image8.webp', '/assets/معالم/image9.webp', '/assets/معالم/image10.webp',
    '/assets/معالم/image11.webp', '/assets/معالم/image12.webp', '/assets/معالم/image13.webp', '/assets/معالم/image14.webp', '/assets/معالم/image15.webp',
    '/assets/معالم/image16.webp', '/assets/معالم/image17.webp', '/assets/معالم/image18.webp', '/assets/معالم/image19.webp', '/assets/معالم/image20.webp',
    '/assets/الطيبين/image1.webp', '/assets/الطيبين/image2.webp', '/assets/الطيبين/image3.webp', '/assets/الطيبين/image4.webp', '/assets/الطيبين/image5.webp',
    '/assets/الطيبين/image6.webp', '/assets/الطيبين/image7.webp', '/assets/الطيبين/image8.webp', '/assets/الطيبين/image9.webp', '/assets/الطيبين/image10.webp',
    '/assets/الطيبين/image11.webp', '/assets/الطيبين/image12.webp', '/assets/الطيبين/image13.webp', '/assets/الطيبين/image14.webp', '/assets/الطيبين/image15.webp',
    '/assets/الطيبين/image16.webp', '/assets/الطيبين/image17.webp', '/assets/الطيبين/image18.webp', '/assets/الطيبين/image19.webp', '/assets/الطيبين/image20.webp',
    '/assets/ممثلين/image1.webp', '/assets/ممثلين/image2.webp', '/assets/ممثلين/image3.webp', '/assets/ممثلين/image4.webp', '/assets/ممثلين/image5.webp',
    '/assets/ممثلين/image6.webp', '/assets/ممثلين/image7.webp', '/assets/ممثلين/image8.webp', '/assets/ممثلين/image9.webp', '/assets/ممثلين/image10.webp',
    '/assets/ممثلين/image11.webp', '/assets/ممثلين/image12.webp', '/assets/ممثلين/image13.webp', '/assets/ممثلين/image14.webp', '/assets/ممثلين/image15.webp',
    '/assets/ممثلين/image16.webp', '/assets/ممثلين/image17.webp', '/assets/ممثلين/image18.webp', '/assets/ممثلين/image19.webp', '/assets/ممثلين/image20.webp',
    '/assets/شعارات/image1.webp', '/assets/شعارات/image2.webp', '/assets/شعارات/image3.webp', '/assets/شعارات/image4.webp', '/assets/شعارات/image5.webp',
    '/assets/شعارات/image6.webp', '/assets/شعارات/image7.webp', '/assets/شعارات/image8.webp', '/assets/شعارات/image9.webp', '/assets/شعارات/image10.webp',
    '/assets/شعارات/image11.webp', '/assets/شعارات/image12.webp', '/assets/شعارات/image13.webp', '/assets/شعارات/image14.webp', '/assets/شعارات/image15.webp',
    '/assets/شعارات/image16.webp', '/assets/شعارات/image17.webp', '/assets/شعارات/image18.webp', '/assets/شعارات/image19.webp', '/assets/شعارات/image20.webp',
    '/assets/أنمي/audio1.mp3', '/assets/أنمي/audio2.mp3', '/assets/أنمي/audio3.mp3', '/assets/أنمي/audio4.mp3', '/assets/أنمي/audio5.mp3',
    '/assets/أنمي/audio6.mp3', '/assets/أنمي/audio7.mp3', '/assets/أنمي/audio8.mp3', '/assets/أنمي/audio9.mp3', '/assets/أنمي/audio10.mp3',
    '/assets/أنمي/audio11.mp3', '/assets/أنمي/audio12.mp3', '/assets/أنمي/audio13.mp3', '/assets/أنمي/audio14.mp3', '/assets/أنمي/audio15.mp3',
    '/assets/أنمي/audio16.mp3', '/assets/أنمي/audio17.mp3', '/assets/أنمي/audio18.mp3', '/assets/أنمي/audio19.mp3', '/assets/أنمي/audio20.mp3',
    '/assets/شخصيات عامة/audio1.mp3', '/assets/شخصيات عامة/audio2.mp3', '/assets/شخصيات عامة/audio3.mp3', '/assets/شخصيات عامة/audio4.mp3', '/assets/شخصيات عامة/audio5.mp3',
    '/assets/شخصيات عامة/audio6.mp3', '/assets/شخصيات عامة/audio7.mp3', '/assets/شخصيات عامة/audio8.mp3', '/assets/شخصيات عامة/audio9.mp3', '/assets/شخصيات عامة/audio10.mp3',
    '/assets/شخصيات عامة/audio11.mp3', '/assets/شخصيات عامة/audio12.mp3', '/assets/شخصيات عامة/audio13.mp3', '/assets/شخصيات عامة/audio14.mp3', '/assets/شخصيات عامة/audio15.mp3',
    '/assets/شخصيات عامة/audio16.mp3', '/assets/شخصيات عامة/audio17.mp3', '/assets/شخصيات عامة/audio18.mp3', '/assets/شخصيات عامة/audio19.mp3', '/assets/شخصيات عامة/audio20.mp3',
    '/assets/أفلام/audio1.mp3', '/assets/أفلام/audio2.mp3', '/assets/أفلام/audio3.mp3', '/assets/أفلام/audio4.mp3', '/assets/أفلام/audio5.mp3',
    '/assets/أفلام/audio6.mp3', '/assets/أفلام/audio7.mp3', '/assets/أفلام/audio8.mp3', '/assets/أفلام/audio9.mp3', '/assets/أفلام/audio10.mp3',
    '/assets/أفلام/audio11.mp3', '/assets/أفلام/audio12.mp3', '/assets/أفلام/audio13.mp3', '/assets/أفلام/audio14.mp3', '/assets/أفلام/audio15.mp3',
    '/assets/أفلام/audio16.mp3', '/assets/أفلام/audio17.mp3', '/assets/أفلام/audio18.mp3', '/assets/أفلام/audio19.mp3', '/assets/أفلام/audio20.mp3',
    '/assets/رياضة/audio1.mp3', '/assets/رياضة/audio2.mp3', '/assets/رياضة/audio3.mp3', '/assets/رياضة/audio4.mp3', '/assets/رياضة/audio5.mp3',
    '/assets/رياضة/audio6.mp3', '/assets/رياضة/audio7.mp3', '/assets/رياضة/audio8.mp3', '/assets/رياضة/audio9.mp3', '/assets/رياضة/audio10.mp3',
    '/assets/رياضة/audio11.mp3', '/assets/رياضة/audio12.mp3', '/assets/رياضة/audio13.mp3', '/assets/رياضة/audio14.mp3', '/assets/رياضة/audio15.mp3',
    '/assets/رياضة/audio16.mp3', '/assets/رياضة/audio17.mp3', '/assets/رياضة/audio18.mp3', '/assets/رياضة/audio19.mp3', '/assets/رياضة/audio20.mp3',
    '/assets/ديزني/audio1.mp3', '/assets/ديزني/audio2.mp3', '/assets/ديزني/audio3.mp3', '/assets/ديزني/audio4.mp3', '/assets/ديزني/audio5.mp3',
    '/assets/ديزني/audio6.mp3', '/assets/ديزني/audio7.mp3', '/assets/ديزني/audio8.mp3', '/assets/ديزني/audio9.mp3', '/assets/ديزني/audio10.mp3',
    '/assets/ديزني/audio11.mp3', '/assets/ديزني/audio12.mp3', '/assets/ديزني/audio13.mp3', '/assets/ديزني/audio14.mp3', '/assets/ديزني/audio15.mp3',
    '/assets/ديزني/audio16.mp3', '/assets/ديزني/audio17.mp3', '/assets/ديزني/audio18.mp3', '/assets/ديزني/audio19.mp3', '/assets/ديزني/audio20.mp3',
    '/assets/الطيبين/audio1.mp3', '/assets/الطيبين/audio2.mp3', '/assets/الطيبين/audio3.mp3', '/assets/الطيبين/audio4.mp3', '/assets/الطيبين/audio5.mp3',
    '/assets/الطيبين/audio6.mp3', '/assets/الطيبين/audio7.mp3', '/assets/الطيبين/audio8.mp3', '/assets/الطيبين/audio9.mp3', '/assets/الطيبين/audio10.mp3',
    '/assets/الطيبين/audio11.mp3', '/assets/الطيبين/audio12.mp3', '/assets/الطيبين/audio13.mp3', '/assets/الطيبين/audio14.mp3', '/assets/الطيبين/audio15.mp3',
    '/assets/الطيبين/audio16.mp3', '/assets/الطيبين/audio17.mp3', '/assets/الطيبين/audio18.mp3', '/assets/الطيبين/audio19.mp3', '/assets/الطيبين/audio20.mp3',
    '/assets/ممثلين/audio1.mp3', '/assets/ممثلين/audio2.mp3', '/assets/ممثلين/audio3.mp3', '/assets/ممثلين/audio4.mp3', '/assets/ممثلين/audio5.mp3',
    '/assets/ممثلين/audio6.mp3', '/assets/ممثلين/audio7.mp3', '/assets/ممثلين/audio8.mp3', '/assets/ممثلين/audio9.mp3', '/assets/ممثلين/audio10.mp3',
    '/assets/ممثلين/audio11.mp3', '/assets/ممثلين/audio12.mp3', '/assets/ممثلين/audio13.mp3', '/assets/ممثلين/audio14.mp3', '/assets/ممثلين/audio15.mp3',
    '/assets/ممثلين/audio16.mp3', '/assets/ممثلين/audio17.mp3', '/assets/ممثلين/audio18.mp3', '/assets/ممثلين/audio19.mp3', '/assets/ممثلين/audio20.mp3',
    '/assets/شعارات/audio1.mp3', '/assets/شعارات/audio2.mp3', '/assets/شعارات/audio3.mp3', '/assets/شعارات/audio4.mp3', '/assets/شعارات/audio5.mp3',
    '/assets/شعارات/audio6.mp3', '/assets/شعارات/audio7.mp3', '/assets/شعارات/audio8.mp3', '/assets/شعارات/audio9.mp3', '/assets/شعارات/audio10.mp3',
    '/assets/شعارات/audio11.mp3', '/assets/شعارات/audio12.mp3', '/assets/شعارات/audio13.mp3', '/assets/شعارات/audio14.mp3', '/assets/شعارات/audio15.mp3',
    '/assets/شعارات/audio16.mp3', '/assets/شعارات/audio17.mp3', '/assets/شعارات/audio18.mp3', '/assets/شعارات/audio19.mp3', '/assets/شعارات/audio20.mp3'
];

self.addEventListener('install', event => {
    self.skipWaiting(); // ← يسمح بالتحديث الفوري
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching files...');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Caching failed:', error);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('Serving from cache:', event.request.url);
                    return response;
                }

                console.log('Fetching from network:', event.request.url);
                return fetch(event.request).then(networkResponse => {
                    if (networkResponse && networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, networkResponse.clone());
                        });
                    }
                    return networkResponse;
                }).catch(() => {
                    console.warn('Network fetch failed, serving fallback for:', event.request.url);

                    if (event.request.destination === 'document') {
                        return caches.match('/index.html');
                    }

                    if (event.request.destination === 'image') {
                        return caches.match('/assets/default_category.webp');
                    }

                    if (event.request.destination === 'audio') {
                        return caches.match(event.request).then(audioResponse => {
                            return audioResponse || new Response('', { status: 200, statusText: 'OK' });
                        });
                    }

                    if (event.request.url.includes('.json')) {
                        return new Response('{}', { status: 200, statusText: 'OK' });
                    }

                    return new Response('', { status: 200, statusText: 'OK' });
                });
            })
    );
});