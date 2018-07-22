/******Register Service Worker*****/

if ("serviceWorker" in navigator){
	navigator.serviceWorker.register('/sw.js')
	//success
	.then(registration => console.log('Service Worker Registered'))
	//failure
	.catch(err => console.log('Service Worker registration failed', err));
}