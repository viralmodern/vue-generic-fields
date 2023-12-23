import Vue from 'vue'
export const observableData = Vue.observable({
  data: null,
})

export const actions = {
  async fetchObserverDetail(id, $api) {
    try {
      let res = await $api.get(`/api/trackers/${id}/`)
      mutations.updateDetail(res['data'])
      return Promise.resolve(res['data'])
    } catch (e) {
      return Promise.reject(true)
    } finally {
    }
  },
}
export const mutations = {
  updateDetail(detail) {
    observableData.data = detail
  },
}
