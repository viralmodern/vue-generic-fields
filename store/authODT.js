import { getSESSION, removeSESSION, SESSION, setSESSION } from '~/utils'
const TOKEN_COURTS = '4809f8560fe7894fe67c524f908317c584f264dc'
export const state = () => {
  return {
    user: null,
    token: getSESSION(SESSION.TOKEN),
    tokenODT: TOKEN_COURTS,
  }
}
export const getters = {
  authenticated: (state) => !!state.token,
  token: (state) => state.token,
  tokenODT: (state) => state.tokenODT,
  user: (state) => state.user || {},
}
export const actions = {
  async setToken({ commit, state }, token) {
    commit('setToken', token)
  },
  async setTokenODT({ commit, state }, token) {
    this.$api.setToken(`Token ${token}`)
  },
  async signOut({ commit }) {
    // this.$api.setToken(`JWT ${token}`)
    commit('signOut')
  },
}
export const mutations = {
  updateUser(state, user) {
    state.user = user
  },
  setToken(state, token) {
    state.token = token
    this.$api.setToken(`JWT ${token}`)
    setSESSION(SESSION.TOKEN, token)
  },
  signOut(state) {
    state.token = ''
    this.$api.setToken(``)
    this.$axios.setToken(``)
    removeSESSION(SESSION.TOKEN)
  },
}
