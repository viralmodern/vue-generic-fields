import api from "../../api/task.detail";

const state = {
  dataListLabel: [],
  dataLabels: []
};

const getters = {
  dataListLabel: state => state.dataListLabel,
  dataLabels: state => state.dataLabels
};

const actions = {
  async getDataListLabelRequest({ commit }) {
    commit("getDataListLabel", await api.getDataListLabel());
  },
  async getDataLabelsRequest({ commit }) {
    commit("getDataLabels", await api.getDataLabels());
  }
};

const mutations = {
  getDataLabels(state, dataLabels) {
    state.dataLabels = dataLabels;
  },
  getDataListLabel(state, dataListLabel) {
    state.dataListLabel = dataListLabel;
  },
  addLabels(state, data) {
    state.dataListLabel.push({
      id: Math.random(),
      color: data.colorValue,
      text: data.labelName,
      createAt: new Date().toISOString()
    });
  },
  updateLabels(state, data) {
    state.dataListLabel = state.dataListLabel.map(x => {
      if (x.id === data.id) {
        let findOneAndUpdate = state.dataLabels.find(x1 => x1.id === data.id);
        if (findOneAndUpdate) {
          findOneAndUpdate.color = data.colorValue;
          findOneAndUpdate.text = data.labelName;
        }
        return { ...x, color: data.colorValue, text: data.labelName };
      }
      return x;
    });
  },
  removelabels(state, id) {
    state.dataListLabel = state.dataListLabel.filter(x => x.id !== id);
    state.dataLabels = state.dataLabels.filter(x => x.id !== id);
  },
  choseLabel(state, data) {
    const elementExists = state.dataLabels.some(x => x.id === data.id);
    if (elementExists) {
      state.dataLabels = state.dataLabels.filter(x => x.id !== data.id);
    } else {
      state.dataLabels = [...state.dataLabels, data].sort(
        (a, b) => new Date(a.createAt) - new Date(b.createAt)
      );
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
