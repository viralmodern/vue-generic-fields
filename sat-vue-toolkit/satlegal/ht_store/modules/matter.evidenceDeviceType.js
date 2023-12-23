import api from "../../api/matter.evidenceDeviceType";

const state = {
  dataEvidenceDeviceType: []
};

const getters = {
  dataEvidenceDeviceType: state => state.dataEvidenceDeviceType
};

const actions = {
  async getDataEvidenceDeviceTypeRequest({ commit }, data = {}) {
    commit("getDataEvidenceDeviceType", await api.getDataEvidenceDeviceType(data));
  },
  async addEvidenceDeviceTypeRequest({ commit }, data = {}) {
    const result = await api.addEvidenceDeviceType(data);
    commit("addEvidenceDeviceType", result)
  },
  async updateEvidenceDeviceTypeRequest({ commit }, data = {}) {
    const result = await api.updateEvidenceDeviceType(data);
    commit("updateEvidenceDeviceType", result)
  },
  async removeEvidenceDeviceTypeRequest({ commit }, data = {}) {
    api.removeEvidenceDeviceType(data);
    commit("removeEvidenceDeviceType", data.id)
  },
};

const mutations = {
  getDataEvidenceDeviceType(state, data) {
    state.dataEvidenceDeviceType = data;
  },
  addEvidenceDeviceType(state, data) {
    state.dataEvidenceDeviceType = [...state.dataEvidenceDeviceType, data]
  },
  updateEvidenceDeviceType(state, data) {
    state.dataEvidenceDeviceType = state.dataEvidenceDeviceType.map(x => {
      if(x.pk === data.pk) {
        return {...x, ...data};
      }
      return x;
    })
  },
  removeEvidenceDeviceType(state, id) {
    state.dataEvidenceDeviceType = state.dataEvidenceDeviceType.filter(x => x.pk !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
