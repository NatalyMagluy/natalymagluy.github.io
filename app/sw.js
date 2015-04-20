'use strict';
importScripts('serviceworker-cache-polyfill.js');

var CACHE_VERSION = 1,
    CURRENT_CACHES = {
      'static': 'static-cache-v' + CACHE_VERSION,
      'reddit': 'reddit-cache-v' + CACHE_VERSION
    };

self.addEventListener('activate', function(event) {
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (expectedCacheNames.indexOf(cacheName) == -1) {
            // If this cache name isn't present in the array of "expected" cache names, then delete it.
            console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('message', function(event) {
  console.log('Handling message event:', event);
  if(event.data.command === 'delete') {
    caches.keys().then(function(cacheNames) {
      Promise.all(
        cacheNames.map(function (cacheName) {
          console.log('Deleting out of date cache:', cacheName);
          return caches.delete(cacheName);
        })
      ).then(function (success) {
          event.ports[0].postMessage({
            error: success ? null : 'Item was not found in the cache.'
          });
        });
    });
  } else {
    throw 'Unknown command: ' + event.data.command;
  }
});


self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(CURRENT_CACHES['static']).then(function(cache) {
    return cache.addAll([]);
  }));
});


self.addToCache = function(cacheName, request, response){
  return caches.open(cacheName).then(function(cache){
    return cache.put(request, response);
  });
};

self.addEventListener('fetch', function(event) {
  var req = event.request.clone(),
      redditUrl = /https?\:\/\/www\.reddit\.com\/r\/.+\.json/;
      url = req.url;

  event.respondWith(
    caches.match(event.request).then(function(response) {
      if(response) {
        console.log('serve from cache');
        return response;
      }
      console.log('fetch data');
      return fetch(event.request).then(function(res) {
        if(res.url.match(redditUrl)) {
          self.addToCache(CURRENT_CACHES['reddit'], req, res.clone());
        }
        return res;
      }).catch(function(error) {
        console.error('fetch failed: ', error);
      });
    })
  );
});
