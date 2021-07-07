const CACHE = 'v1';

console.log(CACHE);

self.addEventListener('install', evt => {
    console.log('!!! Установлен');
    self.skipWaiting();
});

// событие activate
self.addEventListener('activate', evt => {
  console.log('activate, удаляем старый кеш. ', CACHE);
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key =>  key !== CACHE)
            .map(key => caches.delete(key))
      );
    })
  );
});

// при событии fetch, мы используем кэш, и только потом обновляем его данным с сервера
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const method = event.request.method;
  // при каких условиях используем кеш
  if (
        method === 'GET' &&
        url.origin === self.location.origin &&
        /localhost"/i.test(url.pathname) === false &&
        /admin/i.test(url.pathname) === false &&
        /browser-sync/i.test(url.pathname) === false &&
        (
            /images/i.test(url.pathname) ||
            /templates/i.test(url.pathname)
        )
    ) {

      console.log(CACHE, url.pathname);

      // Мы используем `respondWith()`, чтобы мгновенно ответить без ожидания ответа с сервера.
      event.respondWith(fromCache(event.request));
      // `waitUntil()` нужен, чтобы предотвратить прекращение работы worker'a до того как кэш обновиться.
      event.waitUntil(update(event.request));


    }

});

const fromCache = request => {
    return caches.match(request).then((resp) => {
      return resp || fetch(request).then((response) => {
        return caches.open(CACHE).then((cache) => {
          cache.put(request, response.clone());
          return response;
        });
      });
    });
}


const update = request => {
    return caches.open(CACHE).then((cache) =>
        fetch(request).then((response) =>
            cache.put(request, response)
        )
    );
}