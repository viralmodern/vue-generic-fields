import { taskModel } from '~/features/taskboard/store/tasks'
import { FIELD_TYPES } from '~/features/generic-fields/fields_config'

let endpoint = '/api/workspace/attributes/'
const type = {
  SET_PENDING: 'SET_PENDING',
  SET_COMPLETED: 'SET_COMPLETED',
  SET_ATTRIBUTES: 'SET_ATTRIBUTES'
}
export default {
  namespaced: true,
  state: {
    attributes: [],
    systemAttributes: [
      taskModel({ type: FIELD_TYPES[10], name: 'Members' }),
      taskModel({ type: FIELD_TYPES[2], name: 'Price' }),
      taskModel({ type: FIELD_TYPES[6], name: 'Emails' }),
      taskModel({ type: FIELD_TYPES[17], name: 'Litigation Code' }),
      taskModel({ type: FIELD_TYPES[19], name: 'Activities' }),
      taskModel({ type: FIELD_TYPES[18], name: 'Total Expense' })
    ],
    pending: false
  },
  getters: {
    attributes: (state) => state.attributes,
    systemAttributes: (state) => state.systemAttributes,
    pending: (state) => state.pending
  },
  actions: {
    async fetchAttributes({ commit }) {
      return new Promise(async (resolve) => {
        commit(type.SET_PENDING)
        this.$axios
          .$get(endpoint)
          .then((rs) => {
            console.log(rs)
            commit(type.SET_ATTRIBUTES, rs)
            resolve({ data: rs })
          })
          .catch((err) => {
            resolve({ error: true, data: err })
          })
          .finally(() => {
            commit(type.SET_COMPLETED)
            resolve(true)
          })
      })
    }
  },
  mutations: {
    SET_PENDING(state, payload) {
      state.pending = true
    },
    SET_COMPLETED(state, payload) {
      state.pending = false
    },
    SET_ATTRIBUTES(state, payload) {
      state.attributes = payload
    }
  }
}
