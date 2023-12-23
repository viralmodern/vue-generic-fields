import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import './tasks'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
