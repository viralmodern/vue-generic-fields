import { getSESSION, SESSION } from '~/utils'
import { ALL_CAF } from '~/mock/fields'

const types = {
  pending: 'pending',
  completed: 'completed',
  updateCaf: 'resetList',
  setOptions: 'setOptions'
}

export const state = () => ({
  pending: false,
  completed: false,
  // cafs: getSESSION(SESSION.ALL_CAF) || null,
  cafs: ALL_CAF,
  listAllCaf: [],
  cafMatters: {},
  options: {}
})

export const getters = {
  pending: (state) => state.pending,
  completed: (state) => state.completed,
  cafs: (state) => state.cafMatters,
  options: (state) => state.options,
  findCafsByMatter: (state) => (matterID) => {
    try {
      return []
    } catch (e) {
      console.log(e.message)
      return []
    }
  },
  findCafByMatter: (state) => (matterId) => {
    try {
      let idCafActive = state.options['cafMatters'][matterId]
      console.log(state.options['cafMatters'], matterId, idCafActive)
      let list = ALL_CAF.map((caf) => {
        let temp = { ...caf }
        if (idCafActive.includes(temp.id)) {
          temp.activate = true
        }
        return temp
      })
      console.log('BBT', list)
      return list || []
    } catch (e) {
      console.error(e.message)
      return []
    }
  }
}
export const actions = {
  async load({ commit, state }) {},
  async initCafByMatter({ commit, state }, { matterId }) {
    let resInit = await this.$api.get(`/api/users/me`)
    let options = { ...resInit['data']['settings']['options'] }
    // let options = { ...state.options }
    // try {
    if (options.cafMatters) {
      if (options.cafMatters[matterId]) {
        return commit(types.setOptions, options)
      } else {
        options.cafMatters[matterId] = []
      }
    } else {
      options['cafMatters'] = {
        [matterId]: []
      }
    }
    commit(types.pending)
    let res = await this.$api.patch(`/api/users/me`, {
      settings: { options }
    })
    let cafMatters = res['data']['settings']['options']
    commit(types.setOptions, cafMatters)
  },
  // {matterID, caf}
  async updateCAF({ commit, state }, { matterID, caf }) {
    return new Promise(async (resolve) => {
      try {
      } catch (e) {}
    })
  },
  async addCaf({ commit, state }, { matterId, cafId }) {
    commit(types.pending)
    let resMe = await this.$api.get(`/api/users/me`)
    let options = { ...resMe['data']['settings']['options'] }
    let cafMatters = options.cafMatters
    let temp = cafMatters[matterId]
    if (temp && Array.isArray(temp)) {
      if (!temp.includes(cafId)) {
        temp.push(cafId)
      }
      cafMatters[matterId] = temp
      options.cafMatters = cafMatters
      let res = await this.$api.patch(`/api/users/me`, {
        settings: { options }
      })
      commit(types.setOptions, res['data']['settings']['options'])
    }
    commit(types.completed)
  },
  async removeCaf({ commit, state }, { matterId, cafId }) {
    try {
      let resMe = await this.$api.get(`/api/users/me`)
      let options = { ...resMe['data']['settings']['options'] }
      commit(types.pending)
      let cafMatters = options.cafMatters
      let temp = cafMatters[matterId]
      if (temp && Array.isArray(temp)) {
        if (temp.includes(cafId)) {
          let indexOf = temp.indexOf(cafId)
          if (indexOf >= 0) temp.splice(indexOf, 1)
        }
        cafMatters[matterId] = temp
        options.cafMatters = cafMatters
        let res = await this.$api.patch(`/api/users/me`, {
          settings: { options }
        })
        commit(types.setOptions, res['data']['settings']['options'])
      }
    } catch (e) {
    } finally {
      commit(types.completed)
    }
  }
}

export const mutations = {
  [types.pending](state, options) {
    state.pending = true
    state.completed = false
  },
  [types.completed](state, options) {
    state.pending = false
    state.completed = true
  },

  [types.setOptions](state, options) {
    state.options = options
  },

  [types.updateCaf](state, cafMatters) {
    if (cafMatters) {
      state.cafMatters = cafMatters
    }
  }
}
