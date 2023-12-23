import api from "@/sat-vue-toolkit/satlegal/api/matter/subpoena/production";

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
  async getDataFromApiMap({ commit }, payload = {}) {
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

  async updateAttachmentRequest({ commit }, data = {}) {
    const result = await api.updateAttachment(data);
    commit("updateDataAttachmentIn", {
      requestForProductionId: data.idParams.requestForProductionId,
      attachment: result,
    });
    commit("updateDataAttachment", {
      attachmentId: data.idParams.attachmentId,
      result,
    });
    return result;
  },

  async removeAttachmentRequest({ commit }, data) {
    const result = api.removeAttachment(data);
    commit("removeDataAttachmentIn", {
      requestForProductionId: data.requestForProductionId,
      attachmentId: data.attachmentId,
    });
    commit("removeDataAttachment", data.attachmentId);
    return result;
  },
  //notes
  async getNotes({ commit }, data = {}) {
    const result = await api.getNotes(data);
    commit("getNotes", result);
    return result;
  },

  async addNotes({ commit }, data = {}) {
    const result = await api.addNotes(data);
    const map = {
      result: {
        id: data.idParams.rowId,
        total_notes: data.totalNotes + 1
      }
    };
    commit("patchRequestApi", map);
    return result;
  },

  async updateNotes(_, data = {}) {
    const result = await api.updateNotes(data);
    return result;
  },

  async removeNotes({ commit }, data) {
    const result = await api.removeNotes(data);
    const map = {
      result: {
        id: data.rowId,
        total_notes: data.totalNotes - 1
      }
    };
    commit("patchRequestApi", map);
    return result;
  },
  async addProductionRequest({ commit }, data = {}) {
    const result = await api.addProduction(data);
    commit("addDataProduction", { listIdGroup: data.listIdGroup, result });
    return result;
  },
};
