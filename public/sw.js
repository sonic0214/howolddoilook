const CACHE_NAME = 'lumin-ai-v3';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/og-image.jpg',
  '/font-awesome-minimal.css',
  'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap',
  // Essential icon files
  '/icon-192.png',
  '/icon-512.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Cache each resource individually to avoid failures if one doesn't exist
        return Promise.allSettled(
          urlsToCache.map(url =>
            cache.add(url).catch(error => {
              console.warn('Failed to cache resource:', url, error);
            })
          )
        );
      })
  );
});

// Fetch event - prefer fresh HTML and keep static assets cached
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Always use network-first for navigations so HTML stays fresh
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);
          if (cachedPage) {
            return cachedPage;
          }
          return caches.match('/') || caches.match('/index.html');
        })
    );
    return;
  }

  // Ignore non-GET or cross-origin requests
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip API calls and invalid URLs
  if (request.url.includes('/api/') || request.url.includes('undefined')) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});
