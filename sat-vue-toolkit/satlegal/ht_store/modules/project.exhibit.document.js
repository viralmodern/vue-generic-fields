import api from "../../api/project.exhibit.document";

const state = {
  dataTableDocument: [],
  loadingTabledocument: false
};

const getters = {
  dataTableDocument: state => state.dataTableDocument,
  loadingTabledocument: state => state.loadingTabledocument
};

const actions = {
  async getDataTableDocumentRequest({ commit }, pagination = {}) {
    commit("loadingSuccess", true);
    const { page, pageSize } = pagination;
    const resultPagination = {
      pageSize,
      pageIndex: page
    };
    commit(
      "getDataTableDocumentSuccess",
      await api.getDataTableDocument(resultPagination)
    );
    commit("loadingSuccess", false);
  }
};

// mutations
const mutations = {
  getDataTableDocumentSuccess(state, dataTableDocument) {
    state.dataTableDocument = dataTableDocument;
  },
  loadingSuccess(state, loadingTabledocument) {
    state.loadingTabledocument = loadingTabledocument;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
