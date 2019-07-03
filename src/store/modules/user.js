import localStore from 'storejs'
import api from '@/api'

const state = {
  user: {}
}

const mutations = {
  set_user: (state, data) => {
    state.user = data
    localStore.set('user', data)
  }
}

const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.login(data).then(res => {
        if (res.status === 1) {
          commit('set_user', res.user)
          resolve()
        }
      }).catch(() => {
        reject()
      })
    })
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit('set_user', {})
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