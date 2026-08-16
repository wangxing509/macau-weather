/* 澳門天氣 App —— Service Worker
   GitHub Pages 静态托管：缓存静态资源；实时天气接口采用网络优先、离线回退。 */
"use strict";
const CACHE = "macau-weather-v1";
const STATIC = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(STATIC).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = req.url;
  const isLive = url.includes("new-api.smg.gov.mo") || url.includes("cms.smg.gov.mo");

  if (isLive) {
    // 实时接口：GET 走网络优先（成功后缓存），离线时回退缓存快照；POST 直接透传
    if (req.method !== "GET") return;
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(req, clone));
          }
          return res;
        })
        .catch(() =>
          caches.match(req).then((m) => m || caches.match("./index.html"))
        )
    );
    return;
  }

  // 静态资源：缓存优先
  e.respondWith(
    caches.match(req).then((m) =>
      m ||
      fetch(req).then((res) => {
        if (res && res.ok && req.method === "GET") {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(req, clone));
        }
        return res;
      })
    )
  );
});
