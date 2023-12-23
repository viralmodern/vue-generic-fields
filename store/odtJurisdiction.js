const types = {
  getJurisdictionDetail: 'getJurisdictionDetail',
  loading: 'loading',
  complete: 'complete',
}
export default {
  state: () => ({
    jurisdiction: null,
  }),
  getters: {
    detail(state) {
      return state.jurisdiction
    },
  },
  actions: {
    async [types.getJurisdictionDetail](
      { commit, state, getters },
      jurisdiction
    ) {
      let res = await this.$api.get(`/api/jurisdictions/${jurisdiction}`)
      commit(types.getJurisdictionDetail, res['data'])
    },
  },
  mutations: {
    [types.getJurisdictionDetail](state, jurisdiction) {
      state.jurisdiction = jurisdiction
    },
  },
}
