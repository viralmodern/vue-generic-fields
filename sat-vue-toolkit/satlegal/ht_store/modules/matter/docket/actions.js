import api from '../../../../api/matter/docket';

export default {
  async getDataDocketRequest({ commit }, data = {}) {
    commit("setLoading", true);
    const result = await api.getDataDocket(data);
    let labels = [];
    for (var key in result) {
      result[key].results.forEach((x, i) => {
        x.labels.forEach(s => {
          if (!labels.some(s1 => s1.pk === s.pk)) {
            labels.push(s)
          }
          return
        })
        result[key].results[i].labels = result[key].results[i].labels.map(x => x.pk);
      })
    }
    commit("setDataDocket", result);
    commit("setLoading", false);
    return result;
  },
  async getDataDocketNoGroupRequest({ commit }, data = {}) {
    const result = await api.getDataDocketNoGroup(data);
    commit("setDataDocketNoGroup", result);
    return result;
  },
  async addDocketRequest({ commit }, data = {}) {
    const result = await api.addDocket(data);
    commit("addDataDocket", data);
    return result;
  },
  // async updateDocketRequest({ commit }, data) {
  //   api.updateRFP(data);
  //   const map = {
  //     result: { id: data.idParams.RFPId, ...data.body }
  //   };
  //   commit("updateDataDocket", map);
  // },
  async updateDocketRequest({ commit }, data) {
    api.updateDocket(data);
    const map = {
      result: { id: data.idParams.docketId, ...data.body }
    };
    commit("updateDataDocket", map);
  },
  async removeDocketRequest({ commit }, data) {
    const result = await api.removeDocket(data);
    commit("removeDataDocket", data);
    return result;
  },

  // document
  async addDocumentDocketRequest({ commit }, data = {}) {
    const result = await api.addDocumentDocket(data);
    commit("addDataDocumentInDocket", {
      requestForProductionId: data.idParams.requestForProductionId,
      attachment: result
    });
    commit("addDataAttachment", result);
    return result;
  },

  async updateDocumentDocketRequest({ commit }, data = {}) {
    const result = await api.updateDocumentDocket(data);
    commit("updateDataDocumentInDocket", {
      requestForProductionId: data.idParams.requestForProductionId,
      attachment: result
    });
    commit("updateDataAttachment", {
      attachmentId: data.idParams.attachmentId,
      result
    });
    return result;
  },

  async removeDocumentDocketRequest({ commit }, data) {
    const result = api.removeDocumentDocket(data);
    commit("removeDataDocumentInDocket", {
      requestForProductionId: data.requestForProductionId,
      attachmentId: data.attachmentId
    });
    commit("removeDataAttachment", data.attachmentId);
    return result;
  },

  // Related
  async getDataDocketRelated({ commit }, payload) {
    commit("getDataDocketRelated", await api.getDataDocketRelated(payload))
  },
  async postDocketRelated({ commit }, payload) {
    const result = await api.postDocketRelated(payload);
    commit("postDocketRelated", result);
    return result;
  },
  async patchDocketRelated({ commit }, payload) {
    const result = await api.patchDocketRelated(payload);
    commit("patchDocketRelated", result);
    return result;
  },
  async deleteDocketRelated({ commit }, payload) {
    const result = await api.deleteDocketRelated(payload);
    commit("deleteDocketRelated", payload);
    return result;
  },
};
