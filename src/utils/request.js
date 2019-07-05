import axios from 'axios'
import router from '@/router'
import { Loading, Message } from 'element-ui'
import store from '@/store'

let loading

const request = axios.create({
  baseURL: process.env.VUE_APP_HOST + process.env.VUE_APP_API_URL,
  timeout: 10000 // 请求超时
})

request.interceptors.request.use(
  config => {
    // 这里可以添加一些自定义的config设置，如token
    loading = Loading.service({
      lock: true,
      text: '加载中'
    })
    return config
  },
  error => {
    // 这里处理一些请求出错的情况
    if (loading) loading.close()
    Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    if (loading) loading.close()
    const res = response.data
    // 这里处理一些response 正常放回时的逻辑
    if (res.status !== 1) {
      Message({
        message: res.error_msg,
        type: 'error'
      })
      if (res.error_msg.includes('权限')) {
        store.dispatch('logout').then(() => {
          router.push({path: '/login'})
        })
      }
    }
    return res
  },
  error => {
    if (loading) loading.close()
    // 这列处理一些response出错的逻辑
    return Promise.reject(error)
  }
)

export default request