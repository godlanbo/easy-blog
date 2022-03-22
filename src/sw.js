console.log('godlanbo\'s service worker is running')

import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
// import { precacheAndRoute, matchPrecache } from 'workbox-precaching'

// 文档请求缓存
registerRoute(
  ({ request }) => {
    return request.destination === 'document'
  },
  // Use a Stale While Revalidate caching strategy
  new StaleWhileRevalidate({
    // Put all cached files in a cache named 'document'
    cacheName: 'document',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200]
      })
    ]
  })
)
// // 根html缓存
// precacheAndRoute(['/index.html'])
// // Catch routing errors, like if the user is offline
// setCatchHandler(async ({ event }) => {
//   // Return the precached offline page if a document is being requested
//   console.log(event)
//   if (event.request.destination === 'document') {
//     return matchPrecache('/index.html')
//   }

//   return Response.error()
// })
// 图片字体等静态资源缓存
registerRoute(
  /.+\.(?:png|gif|jpg|jpeg|svg|ico|ttf|woff|woff2)$/,
  new CacheFirst({
    cacheName: 'assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
)
// css js 资源缓存
registerRoute(
  /.+\.(?:js|css)$/,
  new StaleWhileRevalidate({
    cacheName: 'resource',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200]
      })
    ]
  })
)
// xhr 请求缓存
registerRoute(
  ({ request, url }) => {
    return request.destination.length === 0 && url.href.match(/.+\/api\//)
  },
  // Use a Stale While Revalidate caching strategy
  new NetworkFirst({
    // Put all cached files in a cache named 'request'
    cacheName: 'request',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200]
      })
    ]
  })
)
