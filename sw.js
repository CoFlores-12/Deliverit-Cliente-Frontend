const assets = [
    "/",
    "/assets/logo.png",

    "/home.html",
    "/assets/css/home.css",
    "/assets/js/home.js",

    "/login.html",
    '/assets/css/login.css',
    "/assets/js/login.js"
];

self.addEventListener("install", installEvent => {
    installEvent.waitUtil(
        caches.open("Deliverit-caches").then(cache => {
            cache.addAll(assets);
        })
    )
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request);
      })
    );
});