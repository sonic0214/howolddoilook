const CACHE_NAME = 'lumin-ai-v2';
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

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Skip cross-origin requests
  if (!request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip API calls and invalid URLs
  if (request.url.includes('/api/') || request.url.includes('undefined')) {
    return;
  }

  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a stream and can only be consumed once
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          (response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it's a stream
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        ).catch(() => {
          // Return offline page if available
          return caches.match('/');
        });
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
    })
  );
});