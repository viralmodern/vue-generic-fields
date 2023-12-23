import api from "../../api/document.request";
import moment from "moment";
const state = {
  dataDocumentAll: []
};

// getters
const getters = {
  dataDocumentAll: state => state.dataDocumentAll
};

const actions = {
  async getDocumentAllRequest({ commit }, { documentId, filter = {} }) {
    const { type } = filter;
    const data = {
      documentId,
      filterRequest: {
        type
      }
    };
    commit("getDocumentAll", await api.getDataDocumentRequestAll(data));
  }
};

const mutations = {
  getDocumentAll(state, data) {
    state.dataDocumentAll = data;
  },
  // getDocumentReview(state, data) {
  //   const items = data.map(x => ({
  //     ...x,
  //     items: x.items.filter(x1 => x1.isReview)
  //   }));
  //   state.dataDocumentAll= items;
  // },
  deleteDocumentAllItem(state, data) {
    const item = state.dataDocumentAll.find(x => x.id === data.parent);
    item.items = item.items.filter(x => x.id !== data.children);
  },
  addDocumentRequestAll(state, data) {
    const item = state.dataDocumentAll.find(
      x => x.clientName === data.clientName
    );
    (item.items || []).push(data);
  },
  editDocumentRequestAll(state, data) {
    state.dataDocumentAll = state.dataDocumentAll.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  changeDataDocumentAll(state, data) {
    const item = state.dataDocumentAll.find(x => x.id === data.parent);
    switch (data.value.nameRow) {
      case "documentName":
        item.items.find(x => x.id === data.value.id).documentName =
          data.value.value;
        break;
      case "dueDate":
        item.items.find(x => x.id === data.value.id).dueDate = data.value.value;
        break;
      case "description":
        item.items.find(x => x.id === data.value.id).description =
          data.value.value;
        break;
      case "approvalStatus":
        item.items.find(x => x.id === data.value.id).approvalStatus =
          data.value.value;
        // eslint-disable-next-line
        if (((data.value || {}).value.id = 1)) {
          item.items.find(x => x.id === data.value.id).approvalDate = moment();
        }
        break;
      case "approvalDate":
        item.items.find(x => x.id === data.value.id).approvalDate =
          data.value.value;
        break;
      default:
        break;
    }
  },
  dropDrawItemDocument(state, data) {
    const item = state.dataDocumentAll.find(x => x.id === data.parent);
    item.items = data.value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
