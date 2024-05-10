const CACHE_NAME = "aula07-pwa-cache-v1";
const filesToCache = [
  "/",
  "index.html",
  "styles.css",
  "main.js",
  "manifest.json",
  "images/icon.svg",
  "images/icon-512.svg",
  "images/screenshot1.png",
  "images/screenshot2.png"
];

self.addEventListener("install", async (event) => {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(filesToCache);
  } catch (error) {
    console.error("Error installing Service Worker:", error);
  }
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
});

self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    try {
      const networkResponse = await fetch(event.request);
      return networkResponse;
    } catch (error) {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) return cachedResponse;
      const fallbackResponse = await cache.match('index.html');
      return fallbackResponse;
    }
  })());
});