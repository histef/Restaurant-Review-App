
	self.addEventListener('install', () => {
		console.log('[ServiceWorker] Installed')
	});

	self.addEventListener('fetch', (event) => {
		console.log('[ServiceWorker] Fetching')
		event.respondWith(
			new Response('fetch section')
			);
	});

	self.addEventListener('activate', () => {
		console.log('[ServiceWorker] Activated')
	});
