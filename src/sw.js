console.log('hello sw')

import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
// import { precacheAndRoute } from 'workbox-precaching';

// precacheAndRoute(self.serviceWorkerOption.assets);

registerRoute(
  /.+\.(?:png|gif|jpg|jpeg|svg|ico)$/,
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
)

registerRoute(
  /.+\.(?:js|css)$/,
  new StaleWhileRevalidate({
    cacheName: 'resource',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      })
    ]
  })
)


