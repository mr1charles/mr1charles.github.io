// Storm Royale service worker (replaces Godot's default after export, see tools/patch_web.py).
// Network-first: players always get the newest build when online; the cache is only an offline fallback.
// A new version takes over immediately (skipWaiting + clients.claim) and the page reloads once.
const CACHE_NAME = 'storm-royale-20260926170838';
const OFFLINE_URL = 'index.offline.html';
const FILES = ["index.apple-touch-icon.png", "index.audio.position.worklet.js", "index.audio.worklet.js", "index.html", "index.icon.png", "index.js", "index.offline.html", "index.pck", "index.wasm"];

self.addEventListener('install', (event) => {
	self.skipWaiting();
	event.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll([OFFLINE_URL])).catch(() => {}));
});

self.addEventListener('activate', (event) => {
	event.waitUntil((async () => {
		const keys = await caches.keys();
		await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
		await self.clients.claim();
	})());
});

self.addEventListener('fetch', (event) => {
	const req = event.request;
	if (req.method !== 'GET') return;
	const url = new URL(req.url);
	if (url.origin !== self.location.origin) return;
	const name = url.pathname.split('/').pop() || 'index.html';
	const ours = req.mode === 'navigate' || FILES.includes(name);
	if (!ours) return;
	event.respondWith((async () => {
		const cache = await caches.open(CACHE_NAME);
		try {
			const fresh = await fetch(req, { cache: 'no-cache' });
			if (fresh.ok) cache.put(req, fresh.clone());
			return fresh;
		} catch (e) {
			const hit = await cache.match(req);
			if (hit) return hit;
			if (req.mode === 'navigate') return (await cache.match(OFFLINE_URL)) || Response.error();
			return Response.error();
		}
	})());
});
