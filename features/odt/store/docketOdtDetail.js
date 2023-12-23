import Vue from 'vue'

export const docketDetail = Vue.observable({
  data: null,
})

export const actions = {
  async fetchDocketDetail(docketId, $api, params = {}) {
    try {
      let res = await $api.get(`/api/dockets/${docketId}/`, { params })
      mutations.updateDetail(res['data'])
      return Promise.resolve(res['data'])
    } catch (e) {
      return Promise.resolve(false)
    } finally {
    }
  },
}
export const mutations = {
  updateDetail(detail) {
    docketDetail.data = detail
  },
}
