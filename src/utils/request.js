import axios from 'axios'

const request = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URL}/api`,
  timeout: 5000
})

request.interceptors.request.use(
  config => {
    // if (getToken()) {
    //   config.headers['Authorization'] = `Bearer ${getToken()}`
    // }
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
    // const res = response.data
    // if (res.code !== 0) {
    //   Message({
    //     message: res.message || '请求失败',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   return Promise.reject(new Error(res.message || 'Has Error'))
    // } else {
    //   return response
    // }
    return response.data
  },
  error => {
    // const { response } = error
    // if (response.status === 401) {
    //   MessageBox.alert('登录超时，请再次登录', '提示', {
    //     confirmButtonText: '确定',
    //     type: 'warning'
    //   }).then(() => {
    //     store.dispatch('app/resetToken').then(() => {
    //       if (!router.history.current.query) {
    //         const redirect = router.history.current.path
    //         router.push({ path: `/login?redirect=${redirect}` }, () => {})
    //       }
    //     })
    //   })
    // } else {
    //   Message.error(response.data.message || error.message || 'Has Error')
    // }
    console.log(error)
    return Promise.reject(error)
  }
)

export default request

