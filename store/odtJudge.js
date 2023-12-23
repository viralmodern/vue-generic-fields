const types = {
  getDetail: 'getDetail',
  loading: 'loading',
  complete: 'complete',
}
export default {
  state: () => ({
    detail: null,
  }),
  getters: {
    detail(state) {
      return state.detail
    },
  },
  actions: {
    async [types.getDetail]({ commit, state, getters }, rowId) {
      if (typeof rowId === 'object') {
        commit(types.getDetail, rowId)
      } else {
        let res = await this.$api.get(`/api/jurisdictions/${rowId}`)
        commit(types.getDetail, res['data'])
      }
    },
  },
  mutations: {
    [types.getDetail](state, row) {
      state.detail = row
    },
  },
}
