import api from "@/sat-vue-toolkit/satlegal/api/matter/risk/actionEntry";

export default {
  async getDataRiskActionRequest({ commit }, data = {}) {
    commit("setLoading", true);
    const result = await api.getDataRiskAction(data);
    result.isFirstCall = data.isFirstCall;
    commit("getRiskAction", result);
    commit("setLoading", false);
    return result;
  },
  async updateRiskActionRequest({ commit }, data) {
    const result = api.updateDataRiskAction(data);
    commit("updateDataRiskAction", {
      id: data.idParams.rowId,
      body: data.body
    });
    return result;
  },
  async addRiskActionRequest({ commit }, data) {
    const result = await api.addDataRiskAction(data);
    commit("addDataRiskAction", result);
    return result;
  },
  async removeRiskActionRequest({ commit }, data) {
    const result = await api.removeDataRiskAction(data);
    commit("removeDataRiskAction", data.rowId);
    return result;
  },
  
  // relations
  async updateRelationRiskRequest({ commit }, data) {
    api.updateRelationRisk(data);
    commit("updateDataRelationRisk", {
      id: data.idParams.id,
      result: data.body
    });
  },

  async removeRelationRiskRequest({ commit }, data) {
    api.removeRelationRisk(data);
    commit("removeDataRelationRisk", {
      id: data.id,
      result: {
        objectId: data.objectId,
        contentTypeId: data.contentTypeId
      }
    });
  },

 
}
