import {
  LAYOUT_OPINION_DETAIL,
  LINKS_ODT,
} from '~/features/odt/configs/linksOdt'
const types = {
  resetSettingsOptionsUser: 'resetSettingsOptionsUser',
  updateSettingsOptionsUser: 'updateSettingsOptionsUser',
  removeSettingsOptionsUser: 'removeSettingsOptionsUser',
  updatePinned: 'updatePinned',
  loading: 'loading',
  complete: 'complete',
}
export const state = () => {
  return {
    optionsUser: null,
    loading: false,
  }
}
export const getters = {
  loading: (state) => state.loading,
  optionsUser: (state) => state.optionsUser,
  // todo configs pinned page
  pinnedServe: (state) => {
    try {
      return state.optionsUser['pinned']
    } catch (e) {
      return []
    }
  },
  isPinned: (state) => (fullPath) => {
    try {
      return (
        state.optionsUser['pinned'].filter((p) => p.fullPath === fullPath)
          .length > 0
      )
    } catch (e) {
      return false
    }
  },
  // todo configs pinned nav link odt
  linksOdt: (state) => {
    try {
      return LINKS_ODT.filter((l) => !l.hide)
      // return state.optionsUser['navOdt'].filter((l) => !l.hide)
    } catch (e) {
      return LINKS_ODT.filter((l) => !l.hide)
    }
  },
  // todo configs layout opinion
  configsOpinionDetailLayout: (state) => {
    try {
      return state.optionsUser['LAYOUT_OPINION_DETAIL'].filter((l) => !l.hide)
    } catch (e) {
      return LAYOUT_OPINION_DETAIL.filter((l) => !l.hide)
    }
  },
  // todo configs recent history docket entries
  configsRecentHistoryDocketEntries: (state) => {
    try {
      let k = 'RECENT_HISTORY_DOCKET_ENTRIES'
      let isHistory = state.optionsUser.hasOwnProperty(k)
      return (isHistory && state.optionsUser[k]) || []
    } catch (e) {
      return []
    }
  },
  // todo configs recent history opinions
  configsRecentHistoryOpinions: (state) => {
    try {
      let k = 'RECENT_HISTORY_OPINIONS'
      let isHistory = state.optionsUser.hasOwnProperty(k)
      return (isHistory && state.optionsUser[k]) || []
    } catch (e) {
      return []
    }
  },
  // todo configs recent history opinions
  configsRecentHistoryTracker: (state) => {
    try {
      let k = 'RECENT_HISTORY_TRACKER'
      let isHistory = state.optionsUser.hasOwnProperty(k)
      return (isHistory && state.optionsUser[k]) || []
    } catch (e) {
      return []
    }
  },
}

export const actions = {
  async [types.resetSettingsOptionsUser]({ commit, state }) {
    try {
      commit(types.loading)
      let res = await this.$api.get(`/api/users/me`)
      let settingsOptionsUser = res['data']['settings']['options']
      commit(types.resetSettingsOptionsUser, settingsOptionsUser)
      return Promise.resolve(settingsOptionsUser)
    } catch (e) {
      return Promise.resolve(false)
    } finally {
      commit(types.complete)
    }
  },
  async [types.updateSettingsOptionsUser](
    { commit, state, rootGetters },
    options
  ) {
    try {
      if (!rootGetters['auth/isLoggedIn']) return
      commit(types.loading)
      let res = await this.$api.patch(`/api/users/me`, {
        settings: { options: { ...state.optionsUser, ...options } },
        // settings: { options: { ...options } },
      })
      let settingsOptionsUser = res['data']['settings']['options']
      commit(types.resetSettingsOptionsUser, settingsOptionsUser)
      return Promise.resolve(settingsOptionsUser)
    } catch (e) {
      return Promise.resolve(false)
    } finally {
      commit(types.complete)
    }
  },
  async [types.removeSettingsOptionsUser]({ commit, state }, options) {
    try {
      commit(types.loading)
      let res = await this.$api.patch(`/api/users/me`, {
        settings: { options: {} },
      })
      let settingsOptionsUser = res['data']['settings']['options']
      commit(types.resetSettingsOptionsUser, settingsOptionsUser)
      return Promise.resolve(settingsOptionsUser)
    } catch (e) {
      return Promise.resolve(false)
    } finally {
      commit(types.complete)
    }
  },

  async [types.updatePinned](
    { commit, state },
    { page, deleted = false, reset = false }
  ) {
    try {
      commit(types.loading)
      let options = { ...state.optionsUser }
      let pinned = options['pinned'] || []
      if (deleted) {
        options = {
          ...options,
          pinned: [...pinned.filter((pin) => pin.fullPath !== page.fullPath)],
        }
        console.log('UNPINNED', options)
      } else {
        options = { ...options, pinned: [page, ...pinned] }
        console.log('PINNED', options)
      }
      if (reset) {
        options = { ...options, pinned: [] }
      }
      let res = await this.$api.patch(`/api/users/me`, {
        settings: { options },
      })
      let settingsOptionsUser = res['data']['settings']['options']
      commit(types.resetSettingsOptionsUser, settingsOptionsUser)
    } catch (e) {
      await this.$api.patch(`/api/users/me`, {
        settings: { options: {} },
      })
    } finally {
      commit(types.complete)
    }
  },
}

export const mutations = {
  [types.loading](state) {
    state.loading = true
  },
  [types.complete](state) {
    state.loading = false
  },
  [types.resetSettingsOptionsUser](state, options) {
    state.optionsUser = options
  },
}
