const assets = [
    "/",
    "/assets/logo.png",
    "/home.html",
    "/assets/js/home.js",
    "/login.html"
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