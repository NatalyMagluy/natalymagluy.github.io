// The SW will be shutdown when not in use to save memory,
// be aware that any global state is likely to disappear
console.log("SW startup");

self.addEventListener('install', function(event) {
  console.log("SW installed");
  event.waitUntil(
    caches.open('myapp-static-v1').then(function(cache) {
      /*return cache.add(
        '/'
      );*/
    })
  )
});

self.addEventListener('activate', function(event) {
  console.log("SW activated");
});

self.addEventListener('fetch', function(event) {
  console.log("Caught a fetch!");
  event.respondWith(
    caches.match(event.request).then(function(response) {
        console.log(response);
        if (!response) {
          response = fetch(event.request);
          response.then(function (data) {
            caches.open('myapp-static-v1').then(function (cache) {
              return cache.add(event.request, data);
            });
          });
        }
        return response;
    })
  );
  /**/
});
