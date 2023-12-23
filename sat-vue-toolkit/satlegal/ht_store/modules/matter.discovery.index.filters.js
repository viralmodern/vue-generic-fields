import { evidencesIndexColumn } from "../../config";
const state = {
  filters: evidencesIndexColumn.map(x => ({ ...x, active: true, value: null })),
  dataFilter: null
};

const getters = {
  filters: state => state.filters,
  activeFilters: state => state.filters.filter(x => x.active),
  hasFilters: (state, getters) => getters.activeFilters.length > 0,
  dataFilter: state => state.dataFilter
};

const actions = {
};

const mutations = {
  updateFilterValue(state, { filterName, value }) {
    const filter = state.filters.filter(x => x.name === filterName)[0];
    if (!filter) return;
    filter.value = value;
    state.dataFilter = filter;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
