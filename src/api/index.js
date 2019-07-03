import request from '@/utils/request'

export default {
  // 用户登录
  login(data) {
    return request({
      url: '/login',
      method: 'post',
      data
    })
  },

  // 退出登录
  logout() {
    return request({
      url: '/logout',
      method: 'post'
    })
  },

  // 申请列表
  applyList(params) {
    return request({
      url: '/applylist',
      method: 'get',
      params
    })
  },

  // 用户列表
  userList(params) {
    return request({
      url: '/userlist',
      method: 'get',
      params
    })
  },
  
  // 审核用户开户
  userAudit(data) {
    return request({
      url: '/useraudit',
      method: 'post',
      data
    })
  },

  // 宠物列表
  petList(params) {
    return request({
      url: '/petlist',
      method: 'get',
      params
    })
  }
}