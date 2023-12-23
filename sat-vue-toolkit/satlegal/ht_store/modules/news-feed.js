import news from '../../mock-data/news-feed'
import api from '../../api/news-feed';

// initial state
// shape: [{ id, quantity }]
const state = {
  news: news,
  projectNewsFeeds: []
}

// getters
const getters = {
  news: state => state.news,
  projectNewsFeeds: state => state.projectNewsFeeds
}

const actions = {
  async getProjectNewsFeeds({ commit }, projectId) {
    commit('populateProjectNewsFeeds', await api.getProjectNewsFeeds(projectId));
  }
}

const mutations = {
  populateProjectNewsFeeds(state, projectNewsFeeds) {
    // state.projectNewsFeeds = projectNewsFeeds
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
