import { Loading } from 'element-ui'

const defaultLoadingOpt = {
  lock: true,
  text: 'Loading',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)'
}

export default opt => {
  opt = Object.assign(defaultLoadingOpt, opt)
  let instance = null
  return {
    open() {
      instance = Loading.service(opt)
    },
    close() {
      if (instance) {
        instance.close()
        instance = null
      }
    }
  }
}
