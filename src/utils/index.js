const cubic = value => Math.pow(value, 3)
const easeInOutCubic = value => value < 0.5
  ? cubic(value * 2) / 2
  : 1 - cubic((1 - value) * 2) / 2

export function handleScroll(start, end) {
  const el = document.documentElement
  const dir = start - end > 0 ? 'up' : 'down'
  const beginTime = Date.now()
  const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
  const frameFunc = () => {
    const progress = (Date.now() - beginTime - 100) / 500
    if (dir === 'up') {
      if (progress < 1) {
        el.scrollTop = (start - end) * (1 - easeInOutCubic(progress))
        rAF(frameFunc)
      } else {
        el.scrollTop = end
      }
    } else {
      if (progress < 1) {
        el.scrollTop = end - (end - start) * (1 - easeInOutCubic(progress))
        rAF(frameFunc)
      } else {
        el.scrollTop = end
      }
    }
  }
  rAF(frameFunc)
}