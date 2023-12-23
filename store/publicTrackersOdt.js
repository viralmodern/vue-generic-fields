const types = {
  resetPublicTrackers: 'resetPublicTrackers',
  getTrackerDetail: 'getTrackerDetail',
  loading: 'loading',
  complete: 'complete',
}
export const state = () => {
  return {
    loading: false,
    list: [],
    res: null,
    trackerDetail: null,
  }
}
export const getters = {
  loading: (state) => state.loading,
  trackerDetail: (state) => state.trackerDetail,
  options: (state) => state.res || {},
  list: (state) => {
    try {
      let list = state.res['results']
      return list
    } catch (e) {
      return []
    }
  }, // bookmarked
  listBookmarked: (state, getters) => {
    try {
      return getters.list
    } catch (e) {
      console.log(e.message)
      return []
    }
  }, // bookmarked

  // todo configs pinned nav link odt
  findTrackerById: (state, getters) => (id) => {
    try {
      return getters.list.find((c) => c.pk == id)
    } catch (e) {
      return null
    }
  },
}

export const actions = {
  async [types.resetPublicTrackers]({ commit, state, getters }, options = {}) {
    let params = {
      params: options.queryParams,
    }
    let unBookmark = Boolean(options.unBookmark)
    let response = { ...getters.options }
    let objectPk = null
    if (options && options.url) {
      objectPk = options.url.split('/')[3]
    }
    if (unBookmark && objectPk) {
      response['results'] = response['results'].filter(
        (rs) => rs.object_pk != objectPk
      )
      response['count'] = response['count'] - 1
    } else {
      let res = await this.$api.get('/api/public-trackers/bookmarks/', params)
      response = { ...res['data'] }
      let results = [...response['results']],
        list = [...results]
      if (Boolean(options.queryParams) && Boolean(options.queryParams.page)) {
        list = [...getters.list, ...results]
        response['results'] = [...list]
      }
    }
    commit(types.resetPublicTrackers, { res: response })
  },
  async [types.getTrackerDetail]({ commit, state, getters }, id) {
    let res = await this.$api.get(`/api/public-trackers/${id}/`)
    commit(types.getTrackerDetail, res['data'])
  },
}

export const mutations = {
  [types.loading](state) {
    state.loading = true
  },
  [types.complete](state) {
    state.loading = false
  },
  [types.resetPublicTrackers](state, { list, res }) {
    state.res = res
  },
  [types.getTrackerDetail](state, tracker) {
    state.trackerDetail = tracker
  },
}
