/* Listening Library service worker: keeps the app shell and code libraries available offline.
   Audio and book data are stored by the app itself (IndexedDB + Google Drive), not here. */
var SHELL = 'll-shell-2';
var LIBS = 'll-libs-1';
var SHELL_FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(SHELL).then(function (c) { return c.addAll(SHELL_FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== SHELL && k !== LIBS; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request; if (req.method !== 'GET') return;
  var u = new URL(req.url);
  // App pages: network first (so updates arrive), cached copy when offline
  if (u.origin === location.origin) {
    e.respondWith(fetch(req).then(function (r) {
      if (r.ok) { var cp = r.clone(); caches.open(SHELL).then(function (c) { c.put(req, cp); }); }
      return r;
    }).catch(function () { return caches.match(req).then(function (m) { return m || caches.match('index.html'); }); }));
    return;
  }
  // Code libraries, fonts and the shared Sutton design files: cache first
  if (/(^|\.)cdn\.jsdelivr\.net$|^esm\.sh$|^fonts\.(googleapis|gstatic)\.com$|^cdnjs\.cloudflare\.com$/.test(u.hostname) || (u.hostname === 'robbmx07.github.io' && /\/design\//.test(u.pathname))) {
    e.respondWith(caches.match(req).then(function (m) {
      var net = fetch(req).then(function (r) { if (r.ok || r.type === 'opaque') { var cp = r.clone(); caches.open(LIBS).then(function (c) { c.put(req, cp); }); } return r; });
      return m || net;
    }));
  }
});
