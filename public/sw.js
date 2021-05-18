let cacheData = "appV1";
this.addEventListener("install", (event ) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/main.chunk.js",
        "/static/js/main.chunk.js.map",
        "/static/js/vendors~main.chunk.js.map",
        "/static/js/vendors~main.chunk.js",
        "/static/js/bundle.js",
        "/static/css/main.chunk.css",
        "/index.html",
        "/",
        "/start",
        // "/favicon.ico",
        "/manifest.json",
        // "/logo192.png",
        "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
      ]);
    })
  );
});
this.addEventListener("fetch", (event) => {
  // console.warn("url",event.request.url)

  if (!navigator.onLine) {
    if (event.request.url === "http://localhost:3000/static/js/bundle.js") {
      event.waitUntil(
        this.registration.showNotification("Internet", {
          body: "You are in offline mode",
        })
      );
    }
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        let requestUrl = event.request.clone();
        fetch(requestUrl);
      })
    );
  }
});

// let cacheData1 : string = "appV1";
// this.addEventListener("install" , (event : any) => {
//     event.waitUntil(
//         caches.open(cacheData1).then((cache) => {
//             cache.addAll([

//             ])
//         })
//     )
// })
// this.addEventListener("fetch", (event: any) => {

//     // console.warn("url",event.request.url)

// console.log('sami')
//     if (!navigator.onLine) {
//         if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
//             event.waitUntil(
//                 this.registration.showNotification("Internet", {
//                     body: "internet not working",
//                 })
//             )
//         }
//         event.respondWith(
//             caches.match(event.request).then((resp) => {
//                 if (resp) {
//                     return resp
//                 }
//                 let requestUrl = event.request.clone();
//                 fetch(requestUrl)
//             })
//         )
//     }
// })

// if('serviceWorker' in navigator){
//     navigator.serviceWorker.register(swUrl).then(function() {
//       console.log('servic worker has been register')
//     }).catch((error) =>{
//        console.log('service worker has not been register')
//     })
//   }
//   else{
//     console.log('some error')
//   }
