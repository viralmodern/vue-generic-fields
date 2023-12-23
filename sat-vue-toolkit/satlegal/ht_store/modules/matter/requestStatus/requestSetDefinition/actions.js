import api from "../../../../../api/matter/requestStatus/requestSetDefinition";

export default {
  async getDefinitionRequest({ commit }, payload = {}) {
    commit("setLoading", true);
    const result = await api.getRequestApi(payload);
    result.isFirstCall = payload.isFirstCall;
    commit("getDataFromApi", result);
    commit("setLoading", false);
    return result;
  },
  async addDefinitionRequest({ commit }, payload) {
    const result = await api.addRequestApi(payload);
    commit("addRequestApi", result);
    return result;
  },
  async updateDefinitionRequest({ commit }, payload) {
    const result = await api.patchRequestApi(payload);
    commit("patchRequestApi", result);
  },
  async removeDefinitionRequest({ commit }, payload) {
    const result = await api.removeRequestApi(payload);
    commit("removeDataDefinition", payload.rowId);
    return result;
  },
};
