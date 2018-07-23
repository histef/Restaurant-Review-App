
	self.addEventListener('install', event => console.log('[ServiceWorker] Installed'));

	self.addEventListener('fetch', event => {
		console.log('[ServiceWorker] fetched');
		event.respondWith(
			fetch(event.request).then(()=>{
				if (response.status === 404){
					return new Response("Non-existent page");
				}
				return response;
			}).catch(()=>{
				return new Response('Server connection failed');				
			})
		);
	});

	self.addEventListener('activate', event => {
		console.log('[ServiceWorker] activated');
	});
