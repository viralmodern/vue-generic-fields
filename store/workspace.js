// initial state
import { Member } from '~/models/workspace'

const types = {
  pending: 'pending',
  completed: 'completed',
  resetList: 'resetList',
  updateList: 'updateList',
  resetMembers: 'resetMembers',

  resetLabels: 'resetLabels',
}

export const state = () => ({
  pending: false,
  members: [],
  labels: [],
  projects: [],
})

export const getters = {
  pending: (state) => state.pending,
  workspaceMembers: (state) => state.members,
  workspaceProjects: (state) => state.projects,

  findMemberByID: (state) => (ID) => {
    // console.log('findMemberByID',state.members, ID)
    return state.members.find((u) => Math.abs(ID) === u.userID) || {}
  },
  findProjectByAssignedID: (state) => (ID) => {
    return state.projects.filter((p) =>
      p.members.find((u) => u.pk === Math.abs(ID) && u.role === 1)
    )
  },
  findProjectByManagedID: (state) => (ID) =>
    state.projects.filter((p) =>
      p.members.find((u) => u.pk === Math.abs(ID) && u.role !== 1)
    ),
  workspaceLabels: (state) => state.labels,
}

export const actions = {
  async loadMembers({ commit, state }) {
    // eslint-disable-line
    // commit(types.pending)
    return new Promise((resolve) => {
      let members = []
      this.$axios
        .get('/api/workspace/members/')
        .then((rs) => {
          console.log('members', rs.data)
          members = rs.data.map((m) => new Member(m))
          commit(types.resetMembers, members)
          resolve(members)
        })
        .finally(() => {
          resolve('done')
        })
    })
  },
  loadLabels({ commit }) {
    return new Promise((resolve) => {
      commit(types.pending)
      this.$axios
        .get(`/api/workspace-tagables/`)
        .then((rs) => {
          let labels = rs.data.results
          commit(types.resetLabels, labels)
          resolve(labels)
        })
        .catch((err) => {
          resolve(err)
        })
        .finally(() => {
          resolve('done')
          commit(types.completed)
        })
    })
  },
  fetchMemberDetail({ commit, state }, { userID }) {
    return new Promise((resolve) => {
      this.$axios
        .get(`/api/workspace/members/${userID}/`)
        .then((rs) => {
          resolve(rs.data)
        })
        .catch((err) => {
          resolve(err.response)
        })
        .finally(() => {})
    })
  },
}

export const mutations = {
  [types.pending](state) {
    state.pending = true
  },
  [types.completed](state) {
    state.pending = false
  },

  [types.resetMembers](state, members) {
    state.members = members
  },
  [types.resetLabels](state, labels) {
    state.labels = labels
  },
}
