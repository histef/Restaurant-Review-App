
	self.addEventListener('install', event => console.log('[ServiceWorker] Installed'));

	self.addEventListener('fetch', event => {
		console.log('[ServiceWorker] fetched');
		event.respondWith(
			new Response('test: hijacking')
			);
	});

	self.addEventListener('activate', event => {
		console.log('[ServiceWorker] activated');
	});
