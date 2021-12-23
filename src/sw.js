console.log('hello sw')

import { registerRoute, setCatchHandler } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { precacheAndRoute, matchPrecache } from 'workbox-precaching'

// 根html缓存
precacheAndRoute(['/index.html'])
// Catch routing errors, like if the user is offline
setCatchHandler(async ({ event }) => {
  // Return the precached offline page if a document is being requested
  console.log(event)
  if (event.request.destination === 'document') {
    return matchPrecache('/index.html')
  }

  return Response.error()
})
// 图片缓存
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
    // console.log(request, url)
    return request.destination.length === 0 && url.href.match(/.+\/api\//)
  },
  // Use a Stale While Revalidate caching strategy
  new StaleWhileRevalidate({
    // Put all cached files in a cache named 'assets'
    cacheName: 'request',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200]
      })
    ]
  })
)
