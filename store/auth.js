import { getSESSION, removeSESSION, SESSION, setSESSION } from '~/utils'
import { $$sendMessageToParent } from '@/sat-vue-toolkit/functions'
export const state = () => {
  return {
    status: '',
    token: getSESSION(SESSION.TOKEN) || '',
    user: null,
  }
}

export const getters = {
  isLoggedIn: (state) => !!state.token,
  authStatus: (state) => state.status,
  user: (state) => state.user,
  token: (state) => state.token,
}

export const actions = {
  getUser({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/api/users/me')
        .then((resp) => {
          commit('updateUser', resp.data)
          resolve(resp.data)
        })
        .catch((err) => {
          commit('authError')
          reject(err)
        })
    })
  },
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('authRequest')
      this.$axios
        .post('/api/users/auth/get-code/', user)
        .then((resp) => {
          if (resp.data['2fa'] === true) {
            resolve(resp)
          } else {
            setToken(resp, commit, resolve, this.$axios)
          }
        })
        .catch((err) => {
          commit('authError')
          reject(err)
        })
    })
  },
  login2({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('authRequest')
      this.$axios
        .post('/api/users/auth/login/', data)
        .then((resp) => {
          setToken(resp, commit, resolve, this.$axios)
        })
        .catch((err) => {
          commit('authError')
          reject(err)
        })
    })
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('logout')
      resolve()
    })
  },
}

const setToken = (response, commit, resolve, $axios) => {
  const token = response.data.token
  const user = response.data.user
  setSESSION(SESSION.TOKEN, token)
  commit('authSuccess', { token, user })
  resolve(response)
}

// mutations
export const mutations = {
  updateUser(state, user) {
    state.user = user
  },
  authRequest(state) {
    state.status = 'loading'
  },
  authSuccess(state, { token, user }) {
    state.status = 'success'
    state.token = token
    state.user = user
    this.$axios.setToken(`JWT ${token}`)
    this.$api.defaults.headers.common['Authorization'] = `JWT ${token}`
    /*$$sendMessageToParent(
      { token },
      'jwt:login:compiled',
      this.app.context.isDev
    )*/
  },
  authError(state) {
    state.status = 'error'
  },
  logout(state) {
    state.status = ''
    state.token = ''
    removeSESSION(SESSION.TOKEN)
    this.$axios.setToken('')
    this.$api.setToken('')
    /*$$sendMessageToParent(
      { token: null },
      'jwt:logout:compiled',
      this.app.context.isDev
    )*/
  },
}
