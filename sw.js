let cacheName = 'offline v3 cache'; //sets versions for our cache
let cacheFiles = [ 
	'/',
	'/index.html',
	'/restaurant.html',
	'css/styles.css',
	'js/dbhelper.js',
	'js/main.js',
	'js/restaurant_info.js',
	'img/1.jpg',
	'img/2.jpg',
	'img/3.jpg',
	'img/4.jpg',
	'img/5.jpg',
	'img/6.jpg',
	'img/7.jpg',
	'img/8.jpg',
	'img/9.jpg',
	'img/10.jpg',
	'data/restaurants.json'
]

self.addEventListener('install', event => {
	console.log('[ServiceWorker] Installed');
		//install event has to wait until promise is resolved
	event.waitUntil( //wait until cache is opened and all files added
		caches.open(cacheName) //caches API, opens cacheName. if new name, this creates cache
		.then(cache => {
			console.log('[ServiceWorker] Caching cacheFiles');
			return cache.addAll(cacheFiles); //if one file fails to add, none are added
			})
		.catch( error => console.log('error: SW install problem' + error))
	)
});

self.addEventListener('fetch', event => {
	console.log('[ServiceWorker] fetched');

	event.respondWith(

		//gets something out of any cache, starting with the oldest
	    caches.match(event.request).then(function(response) {
	      if (response) {
	       return response ||fetch(event.request); //check cache first, if not there, then fetch from network
	   	  }
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
	);
});
