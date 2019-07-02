import request from '@/utils/request'

export default {
  userAdd(data) {
    return request({
      url: '/useradd',
      method: 'post',
      data
    })
  },
  login(data) {
    return request({
      url: '/login',
      method: 'post',
      data
    })
  },
  userList(params) {
    return request({
      url: '/userlist',
      method: 'get',
      params
    })
  },
  petAdd(data) {
    return request({
      url: '/petadd',
      method: 'post',
      data
    })
  },
  petOn(data) {
    return request({
      url: '/peton',
      method: 'post',
      data
    })
  },
  petDown(data) {
    return request({
      url: '/petdown',
      method: 'post',
      data
    })
  }
}