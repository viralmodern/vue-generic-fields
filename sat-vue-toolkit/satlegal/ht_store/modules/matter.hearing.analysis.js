import api from "../../api/matter.hearing.analysis";
let updateItem;

const state = {
  status: false,
};
const getters = {
  status: state => state.status,
};

const actions = {
  async changeTimeAnalysis({ commit }, data) {
    const result = await api.updateTimeAnalysis(data);
    if (result) {
      commit("matter/hearing/changeTimeAnalysis", data, { root: true });
    }
    return result;
  },
  changeItemAnalysis({ commit }, data) {
    switch (data.type) {
      case "Time":
        var apiTime = api.updateTimeAnalysis(data);
        if (apiTime) {
          commit("matter/hearing/changeItemAnalysis", data, { root: true });
        }
        return apiTime;

      case "Transcript":
        var apiTranscript = api.updateTranscriptAnalysis(data);
        if (apiTranscript) {
          commit("matter/hearing/changeItemAnalysis", data, { root: true });
        }
        return apiTranscript;

      case "Objection":
        var apiObjection = api.updateObjectionAnalysis(data);
        if (apiObjection) {
          commit("matter/hearing/changeItemAnalysis", data, { root: true });
        }
        return apiObjection;

      case "Favorable":
        var apiFavorable = api.updateFavorableAnalysis(data);
        if (apiFavorable) {
          commit("matter/hearing/changeItemAnalysis", data, { root: true });
        }
        return apiFavorable;
    }
  },
  async updateTextAssessmentRequest({ commit }, data) {
    clearTimeout(updateItem);
    updateItem = setTimeout(async () => {
      const result = await api.updateTextAssessment(data);
      if (result.status) {
        commit("matter/hearing/updateTextAssessment", data, {
          root: true
        });
      }
      return result;
    }, 1500);
  }
};

const mutations = {
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
