import api from "../../api/matter.discovery.deposition.proceeding";

const state = {
  proceeding_items: [],
  dataList: [],
  dataQuestions: []
}

const getters = {
  proceeding_items: state => state.proceeding_items,
  dataList: state => state.dataList,
  dataQuestions: state => state.dataQuestions
}

const actions = {
  async getProceeding({ commit }, { matterId, depositionId, boardId }) {
    commit("getProceeding", await api.getProceeding({ matterId, depositionId, boardId }));
  },
  async toggle({ commit }, req) {
    commit("toggle", req);
  },
  async addList({ commit }, req) {
    commit("addList", await api.addList(req))
  },
  async addTask({ commit }, req) {
    commit("addTask", await api.addTask(req))
  },
  async updateQuestions({ commit }, req) {
    commit("updateQuestions", await api.updateQuestions(req));
  }
}

const mutations = {
  getProceeding(state, resp) {
    state.proceeding_items = resp.proceeding_items;
    state.dataList = resp.dataList;
    state.dataQuestions = resp.dataQuestions
  },
  toggle(state, req) {
    if (req.type === "proceeding") {
      state.proceeding_items = state.proceeding_items.map(x => {
        if (x.pk === req.pk) {
          return {
            ...x,
            isToggle: !req.isToggle
          };
        }
        return x;
      });
    } else if (req.type === "list") {
      state.dataList = state.dataList.map(x => {
        if (x.pk === req.pk) {
          return {
            ...x,
            isToggle: !req.isToggle
          };
        }
        return x;
      });
    }

  },
  addList(state, resp) {
    state.dataList = [...state.dataList, resp]
  },
  addTask(state, resp) {
    state.dataQuestions = [...state.dataQuestions, resp]
  },
  updateQuestions(state, resp) {
    state.dataQuestions = state.dataQuestions.map(x => {
      if (x.pk === resp.question_pk) {
        return { ...x, ...resp }
      }
      return x;
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
