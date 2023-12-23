import api from "../../api/matter.helpDesk.view";

const state = {
  itemsTickets: {},
  totals: 0,
  isLoading: false,
  hasFilters: false
}

const getters = {
  itemsTickets: state => state.itemsTickets,
  isLoading: state => state.isLoading,
  hasFilters: state => state.hasFilters
}

const actions = {
  async getDataHelpDesk({ commit }, req) {
    commit("setLoading", true);
    commit("checkHasFilters", req)
    commit("getDataHelpDesk", await api.getDataHelpDesk(req));
    commit("setLoading", false);
  },
  async updateTickets({ commit }, req) {
    const results = await api.updateTickets(req)
    const request = {
      keyName: req.keyName,
      results
    }
    commit("updateTickets", request);
  },
  async removeTickets({ commit }, req) {
    commit("removeTickets", await api.removeTickets(req));
  },
  async createTickets({ commit }, req) {
    commit("createTickets", await api.createTickets(req));
  }
}

const mutations = {
  getDataHelpDesk(state, response) {
    state.itemsTickets = response;
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading
  },
  updateTickets(state, resp) {
    state.itemsTickets[resp.keyName].results = state.itemsTickets[resp.keyName].results.map(x => {
      const findObject = state.itemsTickets[resp.keyName].results.find(x => x.id === resp.results.rowId);  //=))
      const results = findObject[resp.results.columnName] = resp.results.bodyRequest[resp.results.columnName] //=))
      if (x.id === resp.results.id) {
        return { ...x, ...results }
      }
      return x;
    })
  },
  removeTickets(state, resp) {
    state.itemsTickets[resp.keyName].results = state.itemsTickets[resp.keyName].results.filter(x => x.id !== resp.id)
  },
  createTickets(state, resp) {
    state.itemsTickets[resp.keyName].results.push(resp)
  },
  checkHasFilters(state, response) {
    state.hasFilters = response.status || response.category ? true : false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
