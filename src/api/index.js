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
  },

  // 市场宠物列表
  marketPetList(params) {
    return request({
      url: '/market/petlist',
      method: 'get',
      params
    })
  },

  // 市场用户列表
  marketUserList(params) {
    return request({
      url: '/market/userlist',
      method: 'get',
      params
    })
  },

  // 全部订单列表
  tradeList(params) {
    return request({
      url: '/tradelist',
      method: 'get',
      params
    })
  },

  // 全部仲裁列表
  arbitrationList(params) {
    return request({
      url: '/arbitrationlist',
      method: 'get',
      params
    })
  },

  // 操作仲裁
  judge(data) {
    return request({
      url: '/judge',
      method: 'post',
      data
    })
  }
}