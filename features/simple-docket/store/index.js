const type = {
  SET_PENDING: 'SET_PENDING',
  SET_COMPLETED: 'SET_COMPLETED',
  SET_ATTRIBUTES: 'SET_ATTRIBUTES',
}
export default {
  namespaced: true,
  state: {
    attributes: [],
    pending: false,
  },
  getters: {
    pending: (state) => state.pending,
  },
  actions: {
    async load({ commit }) {
      return new Promise(async (resolve) => {
        commit(type.SET_PENDING)
      })
    },
  },
  mutations: {
    SET_PENDING(state, payload) {
      state.pending = true
    },
    SET_COMPLETED(state, payload) {
      state.pending = false
    },
    SET_ATTRIBUTES(state, payload) {
      state.attributes = payload
    },
  },
}
