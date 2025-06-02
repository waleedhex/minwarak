const CACHE_NAME = 'minwarak-offline-v1';
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
    '/assets/default_category.jpg',
    '/assets/stickers/sticker1.png',
    '/assets/stickers/sticker2.png',
    '/assets/icon.png',
    '/assets/icon-512.png',
    '/assets/أنمي/category_image.jpg',
    '/assets/شخصيات عامة/category_image.jpg',
    '/assets/أفلام/category_image.jpg',
    '/assets/رياضة/category_image.jpg',
    '/assets/ديزني/category_image.jpg',
    '/assets/معالم/category_image.jpg',
    '/assets/الطيبين/category_image.jpg',
    '/assets/ممثلين/category_image.jpg',
    '/assets/شعارات/category_image.jpg',
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
    '/assets/أنمي/image1.jpg', '/assets/أنمي/image2.jpg', '/assets/أنمي/image3.jpg', '/assets/أنمي/image4.jpg', '/assets/أنمي/image5.jpg',
    '/assets/أنمي/image6.jpg', '/assets/أنمي/image7.jpg', '/assets/أنمي/image8.jpg', '/assets/أنمي/image9.jpg', '/assets/أنمي/image10.jpg',
    '/assets/أنمي/image11.jpg', '/assets/أنمي/image12.jpg', '/assets/أنمي/image13.jpg', '/assets/أنمي/image14.jpg', '/assets/أنمي/image15.jpg',
    '/assets/أنمي/image16.jpg', '/assets/أنمي/image17.jpg', '/assets/أنمي/image18.jpg', '/assets/أنمي/image19.jpg', '/assets/أنمي/image20.jpg',
    '/assets/شخصيات عامة/image1.jpg', '/assets/شخصيات عامة/image2.jpg', '/assets/شخصيات عامة/image3.jpg', '/assets/شخصيات عامة/image4.jpg', '/assets/شخصيات عامة/image5.jpg',
    '/assets/شخصيات عامة/image6.jpg', '/assets/شخصيات عامة/image7.jpg', '/assets/شخصيات عامة/image8.jpg', '/assets/شخصيات عامة/image9.jpg', '/assets/شخصيات عامة/image10.jpg',
    '/assets/شخصيات عامة/image11.jpg', '/assets/شخصيات عامة/image12.jpg', '/assets/شخصيات عامة/image13.jpg', '/assets/شخصيات عامة/image14.jpg', '/assets/شخصيات عامة/image15.jpg',
    '/assets/شخصيات عامة/image16.jpg', '/assets/شخصيات عامة/image17.jpg', '/assets/شخصيات عامة/image18.jpg', '/assets/شخصيات عامة/image19.jpg', '/assets/شخصيات عامة/image20.jpg',
    '/assets/أفلام/image1.jpg', '/assets/أفلام/image2.jpg', '/assets/أفلام/image3.jpg', '/assets/أفلام/image4.jpg', '/assets/أفلام/image5.jpg',
    '/assets/أفلام/image6.jpg', '/assets/أفلام/image7.jpg', '/assets/أفلام/image8.jpg', '/assets/أفلام/image9.jpg', '/assets/أفلام/image10.jpg',
    '/assets/أفلام/image11.jpg', '/assets/أفلام/image12.jpg', '/assets/أفلام/image13.jpg', '/assets/أفلام/image14.jpg', '/assets/أفلام/image15.jpg',
    '/assets/أفلام/image16.jpg', '/assets/أفلام/image17.jpg', '/assets/أفلام/image18.jpg', '/assets/أفلام/image19.jpg', '/assets/أفلام/image20.jpg',
    '/assets/رياضة/image1.jpg', '/assets/رياضة/image2.jpg', '/assets/رياضة/image3.jpg', '/assets/رياضة/image4.jpg', '/assets/رياضة/image5.jpg',
    '/assets/رياضة/image6.jpg', '/assets/رياضة/image7.jpg', '/assets/رياضة/image8.jpg', '/assets/رياضة/image9.jpg', '/assets/رياضة/image10.jpg',
    '/assets/رياضة/image11.jpg', '/assets/رياضة/image12.jpg', '/assets/رياضة/image13.jpg', '/assets/رياضة/image14.jpg', '/assets/رياضة/image15.jpg',
    '/assets/رياضة/image16.jpg', '/assets/رياضة/image17.jpg', '/assets/رياضة/image18.jpg', '/assets/رياضة/image19.jpg', '/assets/رياضة/image20.jpg',
    '/assets/ديزني/image1.jpg', '/assets/ديزني/image2.jpg', '/assets/ديزني/image3.jpg', '/assets/ديزني/image4.jpg', '/assets/ديزني/image5.jpg',
    '/assets/ديزني/image6.jpg', '/assets/ديزني/image7.jpg', '/assets/ديزني/image8.jpg', '/assets/ديزني/image9.jpg', '/assets/ديزني/image10.jpg',
    '/assets/ديزني/image11.jpg', '/assets/ديزني/image12.jpg', '/assets/ديزني/image13.jpg', '/assets/ديزني/image14.jpg', '/assets/ديزني/image15.jpg',
    '/assets/ديزني/image16.jpg', '/assets/ديزني/image17.jpg', '/assets/ديزني/image18.jpg', '/assets/ديزني/image19.jpg', '/assets/ديزني/image20.jpg',
    '/assets/معالم/image1.jpg', '/assets/معالم/image2.jpg', '/assets/معالم/image3.jpg', '/assets/معالم/image4.jpg', '/assets/معالم/image5.jpg',
    '/assets/معالم/image6.jpg', '/assets/معالم/image7.jpg', '/assets/معالم/image8.jpg', '/assets/معالم/image9.jpg', '/assets/معالم/image10.jpg',
    '/assets/معالم/image11.jpg', '/assets/معالم/image12.jpg', '/assets/معالم/image13.jpg', '/assets/معالم/image14.jpg', '/assets/معالم/image15.jpg',
    '/assets/معالم/image16.jpg', '/assets/معالم/image17.jpg', '/assets/معالم/image18.jpg', '/assets/معالم/image19.jpg', '/assets/معالم/image20.jpg',
    '/assets/الطيبين/image1.jpg', '/assets/الطيبين/image2.jpg', '/assets/الطيبين/image3.jpg', '/assets/الطيبين/image4.jpg', '/assets/الطيبين/image5.jpg',
    '/assets/الطيبين/image6.jpg', '/assets/الطيبين/image7.jpg', '/assets/الطيبين/image8.jpg', '/assets/الطيبين/image9.jpg', '/assets/الطيبين/image10.jpg',
    '/assets/الطيبين/image11.jpg', '/assets/الطيبين/image12.jpg', '/assets/الطيبين/image13.jpg', '/assets/الطيبين/image14.jpg', '/assets/الطيبين/image15.jpg',
    '/assets/الطيبين/image16.jpg', '/assets/الطيبين/image17.jpg', '/assets/الطيبين/image18.jpg', '/assets/الطيبين/image19.jpg', '/assets/الطيبين/image20.jpg',
    '/assets/ممثلين/image1.jpg', '/assets/ممثلين/image2.jpg', '/assets/ممثلين/image3.jpg', '/assets/ممثلين/image4.jpg', '/assets/ممثلين/image5.jpg',
    '/assets/ممثلين/image6.jpg', '/assets/ممثلين/image7.jpg', '/assets/ممثلين/image8.jpg', '/assets/ممثلين/image9.jpg', '/assets/ممثلين/image10.jpg',
    '/assets/ممثلين/image11.jpg', '/assets/ممثلين/image12.jpg', '/assets/ممثلين/image13.jpg', '/assets/ممثلين/image14.jpg', '/assets/ممثلين/image15.jpg',
    '/assets/ممثلين/image16.jpg', '/assets/ممثلين/image17.jpg', '/assets/ممثلين/image18.jpg', '/assets/ممثلين/image19.jpg', '/assets/ممثلين/image20.jpg',
    '/assets/شعارات/image1.jpg', '/assets/شعارات/image2.jpg', '/assets/شعارات/image3.jpg', '/assets/شعارات/image4.jpg', '/assets/شعارات/image5.jpg',
    '/assets/شعارات/image6.jpg', '/assets/شعارات/image7.jpg', '/assets/شعارات/image8.jpg', '/assets/شعارات/image9.jpg', '/assets/شعارات/image10.jpg',
    '/assets/شعارات/image11.jpg', '/assets/شعارات/image12.jpg', '/assets/شعارات/image13.jpg', '/assets/شعارات/image14.jpg', '/assets/شعارات/image15.jpg',
    '/assets/شعارات/image16.jpg', '/assets/شعارات/image17.jpg', '/assets/شعارات/image18.jpg', '/assets/شعارات/image19.jpg', '/assets/شعارات/image20.jpg',
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
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching files');
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
        })
    );
    self.clients.claim();
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
                    console.error('Network fetch failed, serving fallback:', event.request.url);
                    if (event.request.destination === 'document') {
                        return caches.match('/index.html');
                    }
                    if (event.request.destination === 'image') {
                        return caches.match('/assets/default_category.jpg');
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