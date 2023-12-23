import api from "../../../../../api/matter/requestStatus/requestItem";

export default {
  async getAllDataRequestItemNoGroupByRequest({ commit }, payload = {}) {
    const result = await api.getAllDataRequestItemNoGroupBy(payload);
    commit("setAllDataRequestItem", result);
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
  async getRequestItemDetailRequest({ commit }, idParams = {}) {
    const result = await api.getRequestItemDetai(idParams);
    commit("getRequestItemDetai", result)
    return result
  },
  async patchRequestApi({ commit }, { idParams, body, detail = false }) {
    api.patchRequestApi({ idParams, body });
    const map = {
      result: { id: idParams.rowId, ...body }
    };
    if (detail) {
      commit("updateRequestItemDetail", map)
      commit("patchRequestApi", map)
    } else {
      commit("patchRequestApi", map)
    }
    return body
  },
  async removeRequestApi({ commit }, payload) {
    const result = await api.removeRequestApi(payload);
    commit("removeRequestApi", payload);
    return result;
  },
  // attachment
  async addAttachmentRequest({ commit }, { idParams, body, detail = false }) {
    const result = await api.addAttachment({ idParams, body });
    if (detail) {
      commit("addDataAttachmentIn", {
        requestForProductionId: idParams.requestForProductionId,
        attachment: result,
      });
      commit("addAttachmentRequestItemDetail", { attachments: result })
    } else {
      commit("addDataAttachmentIn", {
        requestForProductionId: idParams.requestForProductionId,
        attachment: result,
      });
    }
    commit("addDataAttachment", result);
    return result;
  },

  async updateAttachmentRequest({ commit }, { idParams, body, detail = false }) {
    const result = await api.updateAttachment({ idParams, body });
    if (detail) {
      commit("updateDataAttachmentIn", {
        requestForProductionId: idParams.requestForProductionId,
        attachment: result,
      });
      commit("updateAttachmentRequestItemDetail", result)
    } else {
      commit("updateDataAttachmentIn", {
        requestForProductionId: idParams.requestForProductionId,
        attachment: result,
      });
    }
    commit("updateDataAttachment", {
      attachmentId: idParams.attachmentId,
      result,
    });
    return result;
  },

  async removeAttachmentRequest({ commit }, data) {
    const result = api.removeAttachment(data);
    if (data.detail) {
      commit("removeDataAttachmentIn", {
        requestForProductionId: data.requestForProductionId,
        attachmentId: data.attachmentId,
      });
      commit("removeAttachmentRequestItemDetail", data.attachmentId)
    } else {
      commit("removeDataAttachmentIn", {
        requestForProductionId: data.requestForProductionId,
        attachmentId: data.attachmentId,
      });
    }
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
    if (data.detail) {
      commit("updateRequestItemDetail", map)
      commit("patchRequestApi", map);
    } else {
      commit("patchRequestApi", map);
    }
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
    if (data.detail) {
      commit("patchRequestApi", map);
      commit("updateRequestItemDetail", map)
    } else {
      commit("patchRequestApi", map);
    }
    return result;
  },
  async addRequestItemRequest({ commit }, data = {}) {
    const result = await api.addRequestItem(data);
    commit("addDataRequestItem", { listIdGroup: data.listIdGroup, result });
    return result;
  },

  //Flag
  async updateReportRequest({ commit }, data) {
    const result = await api.updateReport(data);
    const map = {
      result: { id: data.idParams.rowId, total_reports: result ? 1 : 0, reported_object: result || null }
    };
    commit("patchRequestApi", map)
    if (data.detail) {
      commit("updateRequestItemDetail", map)
    }
    return result
  },
};
