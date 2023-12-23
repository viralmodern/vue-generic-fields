import { Matter } from '~/models/matter'
const base = '/api/matters/'
const types = {
  pending: 'pending',
  completed: 'completed',
  resetList: 'resetList',
  updateList: 'updateList',
  channelJoin: 'channelJoin',
  channelPart: 'channelPart',
  removeFromList: 'removeFromList',

  resetFields: 'resetFields',
  updateFields: 'updateFields',

  setGroupBy: 'setGroupBy',
  resetGroup: 'resetGroup',
  updateGroup: 'updateGroup',

  // detail
  resetDetail: 'resetDetail',
  resetDocket: 'resetDocket',
}
// state
export const state = () => {
  return {
    pending: false,
    list: [],
    group_list: {},
    group_by: null,
    matterDetail: {},
  }
}

export const getters = {
  pending: (state) => state.pending,
  list: (state) => state.list,
  findMatterBookMark: (state) => state.list.filter((m) => m.bookmark),
  matterDetail: (state) => state.matterDetail,
}

export const actions = {
  // Loads & transforms all channels
  async deleteMatter({ commit, state }, { matterID }) {
    try {
      commit(types.pending)
      let rs = await this.$api.delete(`${base}${matterID}/`)
      commit(types.removeFromList, { matterID })
    } catch (e) {
    } finally {
      commit(types.completed)
    }
  },
  async fetchMatterDetail({ commit, state }, { matterID }) {
    try {
      commit(types.pending)
      let rs = await this.$api.get(`${base}${matterID}/`)
      let matter = new Matter(rs.data)
      commit(types.resetDetail, matter)
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

  [types.removeFromList](state, { matterID }) {},
  [types.resetDetail](state, matter) {
    state.matterDetail = matter
  },
}
