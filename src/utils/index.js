import dayjs from 'dayjs'
import lrz from 'lrz'
const cubic = value => Math.pow(value, 3)
const easeInOutCubic = value =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2

export function handleScroll(start, end) {
  let el = document.documentElement
  el.scrollTop = start
  start = el.scrollTop // 取有效值
  const dir = start - end > 0 ? 'up' : 'down'
  let beginTime = Date.now()
  const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
  const frameFunc = () => {
    const progress = (Date.now() - beginTime) / 500
    if (dir === 'up') {
      if (progress < 1) {
        el.scrollTop = end + (start - end) * (1 - easeInOutCubic(progress))
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
  // setTimeout(() => {
  //   beginTime = Date.now()
  //   rAF(frameFunc)
  // }, 500)
  rAF(frameFunc)
}

export function isSameYear(date1, date2) {
  return dayjs(date1).isSame(date2, 'year')
}

export function getYear(date) {
  return dayjs(date).get('year')
}

export function getMonth(date) {
  return dayjs(date).get('month') + 1
}

export function compress(img, opt) {
  return lrz(img, opt)
}

export function ensurePageLoaded(cb) {
  let preHeight = document.documentElement.scrollHeight
  let task = setInterval(() => {
    let currentHeight = document.documentElement.scrollHeight
    if (preHeight !== currentHeight) {
      preHeight = currentHeight
    } else {
      clearInterval(task)
      cb()
    }
  }, 50)
}

export function isEmail(val) {
  var pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
  var domains = [
    'qq.com',
    '163.com',
    'vip.163.com',
    '263.net',
    'yeah.net',
    'sohu.com',
    'sina.cn',
    'sina.com',
    'eyou.com',
    'gmail.com',
    'hotmail.com',
    '42du.cn'
  ]
  if (pattern.test(val)) {
    var domain = val.substring(val.indexOf('@') + 1)
    for (var i = 0; i < domains.length; i++) {
      if (domain === domains[i]) {
        return true
      }
    }
  }
  return false
}

export function normalizeMDContent(content) {
  // content = content.replace(
  //   /(?<!script)&gt;/g,
  //   '>'
  // )
  // safari 无法支持正则后置断言，降级处理
  content = content.replace(/&gt;/g, '>').replace(/(script)>/g, '$1&gt;')
  content = content.replace(/&lt;(?!(script|\/script))/g, '<')
  return content
}

// 嗅探浏览器是否支持webp
export function isSupportWebp() {
  try {
    return (
      document
        .createElement('canvas')
        .toDataURL('image/webp', 0.5)
        .indexOf('data:image/webp') === 0
    )
  } catch (err) {
    return false
  }
}
