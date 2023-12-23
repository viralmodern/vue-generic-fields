import api from "@/sat-vue-toolkit/satlegal/api/clients/client-message";
import {
  getLoadingSlickTable,
  mergeDataLabel,
} from "@/sat-vue-toolkit/satlegal/utils";
import {
  NAME_GETTER_DATA_LABELS,
} from "@/sat-vue-toolkit/satlegal/utils/constant";


export default {
  async getDataClientMessageRequest({ commit, rootGetters }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataClientMessage(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));
    let listLabelStore = rootGetters[NAME_GETTER_DATA_LABELS];
    let listLabelMerge = [...rootGetters[NAME_GETTER_DATA_LABELS]];
    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.labels) {
          listLabelMerge= mergeDataLabel(x.labels, listLabelMerge);
          result[key].results[i].labels = result[key].results[i].labels.map(x => x.pk);
        }
      })
    }
    if (listLabelMerge.length !== listLabelStore.length) {
      commit("ht_store/workspace/communicationLabel/getDataCommunicationLabel", listLabelMerge, { root: true });
    }
    result.isFirstCall = data.isFirstCall;
    commit("setDataClientMessage", result);
    return result;
  },

  async getClientMessageDetailRequest({ commit }, data = {}) {
    commit("setLoadingGetDetail", true);
    const result = await api.getClientMessageDetail(data);
    commit("setDataClientMessageDetail", result);
    commit("setLoadingGetDetail", false);
    return result;
  },

  async addClientMessageRequest({ commit }, data = {}) {
    const result = await api.addClientMessage(data);
    commit("addDataClientMessage", { listIdGroup: data.listIdGroup, result });
    return result;
  },

  async updateClientMessageRequest({ commit }, data) {
    api.updateClientMessage(data);
    const map = {
      result: { pk: data.idParams.clientMessageId, ...data.body }
    };
    commit("updateDataClientMessage", map);
  },

  async removeClientMessageRequest({ commit }, data) {
    const result = await api.removeClientMessage(data);
    commit("removeDataClientMessage", data);
    return result;
  },

  async removeRequestItemInTaskRequest({ commit }, data) {
    api.removeRequestItemInTask(data);
    const map = {
      clientMessageId: data.clientMessageId,
      requestItemId: data.requestItemId
    };
    commit("removeRequestItemInTask", map);
  },


  // attachment
  async addAttachmentClientMessageRequest({ commit }, data = {}) {
    // const result = await api.addAttachmentClientMessage(data);
    // commit("addDataAttachmentInClientMessage", {
    //   clientMessageId: data.idParams.clientMessageId,
    //   attachment: result
    // });
    // commit("addDataAttachment", result);
    // return result;
  },

  async updateAttachmentClientMessageRequest({ commit }, data = {}) {
    const result = await api.updateAttachmentClientMessage(data);
    commit("updateDataAttachmentInClientMessage", {
      clientMessageId: data.idParams.clientMessageId,
      attachment: result
    });
    commit("updateDataAttachment", {
      attachmentId: data.idParams.attachmentId,
      result
    });
    return result;
  },

  async removeAttachmentClientMessageRequest({ commit }, data) {
    const result = api.removeAttachmentClientMessage(data);
    commit("removeDataAttachmentInClientMessage", {
      clientMessageId: data.clientMessageId,
      attachmentId: data.attachmentId
    });
    commit("removeDataAttachment", data.attachmentId);
    return result;
  },
};
