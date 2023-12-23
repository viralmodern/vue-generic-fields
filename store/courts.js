import AllCourts from '@/mock/AllCourts'

const types = {
  pending: 'pending',
  completed: 'completed',
  resetList: 'resetList',
  updateList: 'updateList',
  removeFromList: 'removeFromList',
}
// state
export const state = () => {
  return {
    pending: false,
    list: AllCourts,
  }
}
export const getters = {
  pending: (state) => state.pending,
  // Return all but deleted
  list: (state) => state.list.filter((cr) => !cr.archive),
}

const base = '/api/courts/'
export const actions = {
  // Loads & transforms all channels
  async load({ commit }) {
    // eslint-disable-line
    let courts = []
    try {
      commit(types.pending)
      let res = await this.$api.get(base)
      courts = res.data
      // courts = courts.map(m => new Court(m))
      commit(types.resetList, courts)
    } catch (e) {
    } finally {
      commit(types.completed)
    }
  },
}

export const mutations = {
  [types.pending](state) {
    state.pending = true
  },
  [types.completed](state) {
    state.pending = false
  },

  [types.resetList](state, courts) {
    state.list = courts
  },
}
