// 初始化锚点
export default function initHashLocation() {
  let hash = location.hash
  let decodeHash = decodeURIComponent(hash)
  let targetScrollTop = document.querySelector(decodeHash).offsetTop
  window.scrollTo(0, targetScrollTop)
}
