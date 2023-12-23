import { filterProfileCharacter } from "../../config";
const state = {
  filters: filterProfileCharacter.map(x => ({ ...x, active: true, value: null })),
  characterFilter: null
};

const getters = {
  filters: state => state.filters,
  activeFilters: state => state.filters.filter(x => x.active),
  hasFilters: (state, getters) => getters.activeFilters.length > 0,
  characterFilter: state => state.characterFilter
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
    state.characterFilter = filter;
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
