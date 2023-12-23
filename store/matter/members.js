// initial state

const types = {
  pending: 'pending',
  completed: 'completed',
  resetList: 'resetList',
  updateList: 'updateList'
}

export const state = () => ({
  pending: false,
  members: []
})
export const getters = {
  pending: (state) => state.pending,
  members: (state) => state.members
}

export const actions = {
  async loadMembers({ commit, state }, { matterID }) {
    // eslint-disable-line
    commit(types.pending)
    return new Promise((resolve) => {
      let members = []
      this.$axios
        .get(`/api/matters/${matterID}/members/`)
        .then((rs) => {
          console.log('members', rs.data)
          members = rs.data
          commit(types.resetList, members)
          resolve(members)
        })
        .finally(() => {
          commit(types.completed)
        })
    })
  },
  async addMemberToMatter({ commit }, { matterID, members }) {
    commit(types.pending)
    try {
      let result = await this.$axios.post(
        `/api/matters/${matterID}/members/`,
        members
      )
      console.log(result)
      return result
    } catch (e) {
      console.log(e.response)
    }
  },
  async deleteMemberMatter({ commit, state }, { matterID, userID }) {
    // eslint-disable-line
    commit(types.pending)
    return new Promise((resolve) => {
      this.$axios
        .delete(`/api/matters/${matterID}/members/${userID}/`)
        .then((rs) => {
          console.log('deleteMemberMatter', rs.data)
          resolve(rs.data)
        })
        .catch((err) => {
          resolve(false)
        })
        .finally(() => {
          commit(types.completed)
        })
    })
  }
}

export const mutations = {
  [types.resetList](state, members) {
    state.members = members
  },
  [types.pending](state) {
    state.pending = true
  },
  [types.completed](state) {
    state.pending = false
  }
}
