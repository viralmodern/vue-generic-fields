import api from "@/sat-vue-toolkit/satlegal/api/matter/subpoena/productionEntries";

export default {
  async getDataFromApi({ commit }, payload = {}) {
    commit("setLoading", true);
    const result = await api.getDataFromApi(payload);
    result.isFirstCall = payload.isFirstCall;
    commit("getDataFromApi", result);
    commit("setLoading", false);
    return result;
  },
   // attachment
   async addAttachmentRequest({ commit }, data = {}) {
    const result = await api.addAttachment(data);
    commit("addDataAttachmentIn", {
      requestForProductionId: data.idParams.requestForProductionId,
      attachment: result,
    });
    commit("addDataAttachment", result);
    return result;
  },
  //notes
  async getNotes({ commit }, data = {}) {
    const result = await api.getNotes(data);
    commit("getNotes", result);
    return result;
  },
};
