const assets = [
    "/",
    "/assets/logo.png",
    "/assets/css/theme.css",
    "/assets/img/fb.png",
    "/assets/img/g.png",
    "/assets/js/cash.min.js",
    "/manifest.json",
    "/assets/img/avatar.jpg",
    "/assets/fontAwesome/js/all.js",
    
    "/home.html",
    "/assets/css/home.css",
    "/assets/js/home.js",

    "/assets/img/iconos/coctel.png",
    "/assets/img/iconos/comida-rapida.png",
    "/assets/img/iconos/gadgets.png",
    "/assets/img/iconos/salud.png",
    "/assets/img/iconos/tienda.png",

    "/login.html",
    '/assets/css/login.css',
    "/assets/js/login.js"
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
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