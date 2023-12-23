import Vue from 'vue'

export const observableData = Vue.observable({
  data: null,
  trackers: [],
  loading: false,
  tracker: null,
})

export const actions = {
  async fetchObserverDetail(id) {
    try {
      if (id) {
        observableData.tracker = id
      }
      id = id || observableData.tracker
      let res = observableData.trackers.filter((tracker) => tracker.pk == id)[0]
      console.error(id)
      mutations.updateDetail(res)
      return Promise.resolve(res)
    } catch (e) {
      return Promise.reject(true)
    } finally {
    }
  },
  async fetchPublicTrackers($api) {
    try {
      observableData.loading = true
      let res = await $api.get(`/api/public-trackers/`)
      observableData.trackers = res['data']
      await this.fetchObserverDetail()
    } catch (e) {
    } finally {
      observableData.loading = false
    }
  },
}
export const mutations = {
  updateDetail(detail) {
    observableData.data = detail
  },
}
