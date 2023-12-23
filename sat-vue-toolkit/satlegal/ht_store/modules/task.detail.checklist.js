import api from "../../api/task.detail";

const state = {
  dataCheckbox: []
};

const getters = {
  dataCheckbox: state => state.dataCheckbox
};

const actions = {
  async getDataCheckboxRequest({ commit }) {
    commit("getDataCheckbox", await api.getListCheckbox());
  }
};

const mutations = {
  getDataCheckbox(state, dataCheckbox) {
    state.dataCheckbox = dataCheckbox;
  },
  deleteGroupChecklist(state, id) {
    state.dataCheckbox = state.dataCheckbox.filter(e => e.id !== id);
  },
  deleteItemChecklist(state, data) {
    state.dataCheckbox = state.dataCheckbox.map(e => {
      if (e.id === data.groupId) {
        return { ...e, list: e.list.filter(e => e.id !== data.id) };
      }
      return e;
    });
  },
  addGroupChecklist(state, groupName) {
    state.dataCheckbox = [
      { id: state.dataCheckbox.length + 1, groupName, list: [] },
      ...state.dataCheckbox
    ];
  },
  addItemInGroupChecklist(state, data) {
    state.dataCheckbox = state.dataCheckbox.map(e => {
      if (e.id === data.groupId) {
        return {
          ...e,
          list: [
            ...e.list,
            { id: e.list.length + 1, name: data.name, status: false }
          ]
        };
      }
      return e;
    });
  },
  checkbox(state, data) {
    state.dataCheckbox = state.dataCheckbox.map(e => {
      if (e.id === data.groupId) {
        return {
          ...e,
          list: e.list.map(e => {
            if (e.id === data.id) {
              return { ...e, status: data.status };
            }
            return e;
          })
        };
      }
      return e;
    });
  },
  updateItemInGroupChecklist(state, data) {
    state.dataCheckbox = state.dataCheckbox.map(e => {
      if (e.id === data.groupId) {
        return {
          ...e,
          list: e.list.map(x => {
            if (x.id === data.id) {
              return { ...x, name: data.name }
            }
            return x
          })
        };
      }
      return e;
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
