import { allProjectBoardFilters } from "../../config";
const state = {
  filters: allProjectBoardFilters.map(x => ({ ...x, active: false, value: null }))
};

const getters = {
  filters: state => state.filters,
  activeFilters: state => state.filters.filter(x => x.active),
  hasFilters: (state, getters) => getters.activeFilters.length > 0
};

const actions = {
};

const mutations = {
  toggleFilter(state, { filterName, active }) {
    const filter = state.filters.filter(x => x.name === filterName)[0];
    if (!filter) return;
    filter.active = active;
  },
  updateFilterValue(state, { filterName, value }) {
    const filter = state.filters.filter(x => x.name === filterName)[0];
    if (!filter) return;
    filter.value = value;
  },
  deactiveAllFilter(state) {
    state.filters.forEach(x => { x.active = false });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
