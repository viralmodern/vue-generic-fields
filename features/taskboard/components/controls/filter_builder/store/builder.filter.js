import { v4 as uuid } from 'uuid'
const state = {
  filters: [
    {
      id: uuid(),
      filter_type: null,
      operation: null,
      value: null
    }
  ],
  activeFilter: null,

  filterStructure: {
    // id: uuid(),
    filter_type: null,
    operation: null,
    value: null
  },
  matchTypes: [
    { id: 'and', label: 'AND' },
    { id: 'or', label: 'OR' }
  ],
  filterTypes: [
    {
      title: 'Card name',
      id: 'card_name',
      icon: 'mdi-format-size',

      value_type: 'text',
      operation: 'mdi-format-size'
    },
    {
      title: 'Labels',
      id: 'labels',
      icon: 'mdi-label',

      value_type: 'labels',
      operation: 'operators'
    },
    {
      title: 'Due date',
      id: 'due_date',
      icon: 'mdi-timer-sand',

      value_type: 'date',
      operation: 'operands'
    },
    {
      title: 'Members',
      id: 'members',
      icon: 'mdi-account-multiple',

      value_type: 'combobox',
      operation: 'operators'
    },
    {
      title: 'Progress',
      id: 'progress',
      icon: 'mdi-timelapse',

      value_type: 'slider',
      operation: 'operands'
    },
    {
      title: 'Check list',
      id: 'check_list',
      icon: 'mdi-format-list-bulleted',

      value_type: 'labels',
      operation: 'operators'
    }
  ],
  operation: {
    operands: [
      {
        title: 'Contains',
        id: 'contains'
      },
      {
        title: 'Starts With',
        id: 'starts_with'
      },
      {
        title: 'Ends With',
        id: 'ends_with'
      },
      {
        title: 'Is Empty',
        id: 'is_empty'
      },
      {
        title: 'Is Not Empty',
        id: 'is_not_empty'
      }
    ],
    operators: [
      { title: 'Is', id: '=' },
      { title: 'Is Not', id: '<>' },
      { title: 'Is Any Of', id: '<' },
      { title: 'Is All Of', id: '<=' },
      { title: 'Is None Of', id: '>' },
      { title: 'Is Empty', id: '>=' },
      { title: 'Is Not Empty', id: '>+=' }
    ]
  },
  valueType: ['text', 'labels', 'date', 'combobox', 'slider'],

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
