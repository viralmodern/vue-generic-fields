import Vue from 'vue'

export const opinionDetail = Vue.observable({
  data: null,
  loading: false,
})

export const actions = {
  async fetchOpinionDetail(opinionId, $api) {
    return new Promise(async (resolve, reject) => {
      try {
        opinionDetail.loading = true
        let res = await $api.get(`/api/opinions/${opinionId}/`)
        mutations.updateDetail(res['data'])
        resolve(res['data'])
      } catch (e) {
        reject(false)
      } finally {
        opinionDetail.loading = false
      }
    })
  },
}
export const mutations = {
  updateDetail(detail) {
    opinionDetail.data = detail
  },
}
