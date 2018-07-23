let cacheName = 'offline v2 cache'; //sets versions for our cache
let cacheFiles = [
	'/',
	'/index.html',
	'/restaurant.html',
	'css/styles.css',
	'js/dbhelper.js',
	'js/main.js',
	'js/restaurant_info.js'
]

self.addEventListener('install', event => {
	console.log('[ServiceWorker] Installed');
		//install event has to wait until promise is resolved
	event.waitUntil(
		caches.open(cacheName) //caches API
		.then(cache => {
			console.log('[ServiceWorker] Caching cacheFiles');
			return cache.addAll(cacheFiles);
			})
		.catch( error => console.log('error: here"s the problem'))
	)
});

self.addEventListener('fetch', event => {
	console.log('[ServiceWorker] fetched');

	event.respondWith(

	    caches.match(event.request).then(function(response) {
	      if (response) {
	       return response;
	      } return fetch(event.request);
	    })
    );

	// 	fetch(event.request).then(response=>{
	// 		if (response.status === 404){
	// 			return new Response("Non-existent page");
	// 		}
	// 		return response;
	// 	}).catch(()=>{
	// 		return new Response('Server connection failed');				
	// 	})
	// );
});

self.addEventListener('activate', event => {
	console.log('[ServiceWorker] activated');
	event.waitUntil(
	//clear old cache versions
	caches.keys().then(cacheNames => Promise.all(cacheNames.map(thisCacheName => {
			if (thisCacheName !== cacheName){
				console.log("[ServiceWorker] Removing Cached Files from", thisCacheName);
				return caches.delete(thisCacheName);
			}
		})))
	)
});
