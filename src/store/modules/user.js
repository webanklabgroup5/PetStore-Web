import localStore from 'storejs'

const state = {
  user: {
    token: ''
  }
}

const mutations = {
  set_user: (state,data) => {
    state.user = data
    localStore.set('user',data)
  }
}

const actions = {
  login ({commit} , data) {
    return new Promise (resolve=> {
      commit('set_user', {token: '123456', type : data.type})
      resolve()
    })
  },
  logout ({commit}) {
    return new Promise(resolve => {
      commit('set_user', {token: ''})
      resolve()
    })
  }
}

const getters = {
  token: state => {
    return state.user.token
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}