import axios from 'axios'
import { getToken } from './auth'
import { Message } from 'element-ui'
import router from './../router/index'
import loadGenerator from './loading'

const request = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URL}/api`,
  timeout: 5000
})

const load = loadGenerator()

request.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    load.open()
    return config
  },
  error => {
    // do something with request error
    // Message.error(error.message)
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  response => {
    load.close()
    const res = response.data
    if (res.code !== 0) {
      Message({
        message: res.message || '请求失败',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Has Error'))
    }
    return res
  },
  error => {
    load.close()
    const { response } = error
    if (response?.status === 401) {
      Message({
        type: 'error',
        message: '登录超时，请重新登录',
        duration: 5 * 1000
      })
      router.push({ path: `/login?redirect=${router.history._startLocation}` })
    }
    if (response?.status === 500) {
      Message({
        type: 'error',
        message: '非法操作',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default request
