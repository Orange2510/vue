import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 1.定义公共的地址前缀
// 2.发送请求自动携带公共参数
// 3.响应数据直接就是data数据
// 4.then方法得到的就是功能成功，catch方法得到就是功能失败
// 5.友好提示错误
// 6.请求进度提示
const request = axios.create({
  baseURL: '/mock',
  timeout: 10000,
})
const errorMessages = {
  401: '未授权',
  403: '禁止访问',
  404: '资源找不到',
  500: '服务器内部错误',
}
// 设置请求拦截器
request.interceptors.request.use(
  // 进度条开始
  NProgress.start(),
  // 成功回调
  (config) => {
    // 添加公共参数
    config.headers.token = 'token'
    return config
  }
)
// 设置响应拦截器
request.interceptors.response.use(
  // 成功回调
  (response) => {
    // 进度条结束
    NProgress.done()
    if (response.data.code) {
      // console.log(response)
      return response.data.data
    }
    // 功能失败返回promise触发catch
    return Promise.reject(response.data.message || '功能失败了')
  },
  // 失败回调
  (error) => {
    // 进度条结束
    NProgress.done()
    // error.response有值代表响应回来
    if (error.response) {
      console.log(error)
      return Promise.reject(
        errorMessages[error.response.status] || '未知错误，请联系管理员解决'
      )
    }
    // 响应没有回来
    if (error.message.indexOf('timeout') > -1) {
      return Promise.reject('网络超时')
    } else if (error.message.indexOf('Network Error') > -1) {
      return Promise.reject('断网了')
    } else {
      return Promise.reject('未知错误')
    }
  }
)
export default request
