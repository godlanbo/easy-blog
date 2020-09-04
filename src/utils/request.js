import axios from 'axios'
import { getToken } from './auth';
import { Message } from 'element-ui';
import router from './../router/index';

const request = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URL}/api`,
  timeout: 5000
})

request.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    // do something with request error
    // Message.error(error.message)
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  response => {
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
    const { response } = error
    if (response.status === 401) {
      Message({
        type: 'error',
        message: '登录超时，请重新登录',
        duration: 5 * 1000
      })
      router.push({ path: `/login?redirect=${router.history._startLocation}` })
    }
    return Promise.reject(error)
  }
)

export default request

