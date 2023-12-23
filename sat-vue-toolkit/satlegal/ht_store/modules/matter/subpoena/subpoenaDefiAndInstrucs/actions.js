import api from "@/sat-vue-toolkit/satlegal/api/matter/subpoena/defiAndInstrucs";

export default {
  async getAllDataProductionNoGroupByRequest({ commit }, payload = {}) {
    const result = await api.getAllDataProductionNoGroupBy(payload);
    commit("setAllDataProduction", result);
    return result;
  },
  async getDataFromApi({ commit }, payload = {}) {
    commit("setLoading", true);
    const result = await api.getDataFromApi(payload);
    result.isFirstCall = payload.isFirstCall;
    commit("getDataFromApi", result);
    commit("setLoading", false);
    return result;
  },
  async patchRequestApi({ commit }, payload) {
    api.patchRequestApi(payload);
    const map = {
      result: { id: payload.idParams.rowId, ...payload.body }
    };
    commit("patchRequestApi", map);
  },
  async removeRequestApi({ commit }, payload) {
    const result = await api.removeRequestApi(payload);
    commit("removeRequestApi", payload);
    return result;
  },
  async addDefiAndInstrucsRequest({ commit }, data = {}) {
    const result = await api.addDefiAndInstrucs(data);
    commit("addDataDefiAndInstrucs", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  
};
