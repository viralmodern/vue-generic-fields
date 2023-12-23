import { v4 as uuid } from 'uuid'
const state = {
  filters: [
  ],
  activeFilter: null,

  filterStructure: {
    // id: uuid(),
    filter_type: null,
    operation: null,
    value: null
  },
  matchTypes: [
    { id: '$and', label: 'AND' },
    { id: '$or', label: 'OR' }
  ],
  filterTypes: [

  ],
  activeMatchTypes: null,
  isLoading: true
}
const getters = {
  allFilter: (state) => state.filters,
  matchTypes: (state) => state.matchTypes,
  activeMatchType: (state) => {
    if (!state.activeMatchTypes) return state.matchTypes[0]
    return state.activeMatchTypes
  },
  filterTypes: (state) => state.filterTypes,
  operation: (state) => state.operation,

  isLoading: (state) => state.isLoading,
  activeFilter: (state) => state.activeFilter
}
const actions = {
  async setActiveMatchType({ commit }, payload) {
    await commit('SET_ACTIVE_MATCH_TYPES', payload)
  },
  async addNewFilter({ commit }) {
    await commit('ADD_NEW_FILTER')
  },
  async updateFilter({ commit }, { item, val }) {
    commit('UPDATE_FILTER_ITEM_TYPES', { item, val, type: 'filter_type' })
  },

  async updateOperationFilter({ commit }, { item, val }) {
    await commit('UPDATE_FILTER_ITEM_TYPES', { item, val, type: 'operation' })
  },

  async removeFilter({ commit }, item) {
    await commit('REMOVE_FILTER', item)
  }
}
const mutations = {
  SET_ACTIVE_MATCH_TYPES(state, data) {
    // Vue.set(state.activeMatchTypes, data);
    state.activeMatchTypes = data
  },
  ADD_NEW_FILTER(state) {
    state.filters.push({ ...state.filterStructure, id: uuid() })
  },
  UPDATE_FILTER_ITEM_TYPES(state, { item, val, type }) {
    try {
      // find filter
      let _index = state.filters.findIndex((i) => i.id === item.id)
      if (type === 'operation') {
        state.filters[_index]['operation'] = { ...val }
      }
      if (type === 'filter_type') {
        state.filters[_index]['filter_type'] = { ...val }
      }
      if (type === 'value') {
        state.filters[_index]['value'] = { ...val }
      }
      // update filter
    } catch (e) {
      console.log(e.message)
    }
  },
  REMOVE_FILTER(state, item) {
    let _index = state.filters.findIndex((i) => i.id === item.id)
    state.filters.splice(_index, 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
