import api from '../../api/announcement';

// initial state
// shape: [{ id, quantity }]
const state = {
  announcements: [],
  totals: 0,
  loading: false
}

// getters
const getters = {
  announcements: state => state.announcements,
  totals: state => state.totals,
  loading: state => state.loading
}

const actions = {
  async doFilter({ commit }, pagination = {}) {
    commit("startLoading");
    const { page, pageSize } = pagination;
    const filterRequest = {
      pageSize,
      pageIndex: page
    };
    commit("populateFilterResult", await api.filter(filterRequest));
    commit("finishLoading");
  },
  async createAnnouncement({ commit }, data) {
    commit('createAnnouncementSuccess', await api.createAnnouncement(data))
  }
};

const mutations = {
  populateFilterResult(state, filterResult) {
    state.announcements = filterResult.list;
    state.totals = filterResult.totals;
  },
  startLoading(state) {
    state.loading = true;
  },
  finishLoading(state) {
    state.loading = false;
  },
  cleanUpPageData(state) {
    state.announcements = [];
    state.totals = 0;
    state.loading = false;
  },
  createAnnouncementSuccess(state, data) {
    state.announcements.unshift(data)
    state.totals = state.totals + 1
  }
};


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
