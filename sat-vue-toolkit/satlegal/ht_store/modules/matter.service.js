import api from "../../api/matter.service";
const state = {
  services: [],
  totals: 0,
  dataAttachment: [],
  totalsAttachment: 0
};

const getters = {
  services: state => {
    const results = state.services.map(x => ({
      id: x.pk,
      name: x.name,
      character: x.character.pk,
      type: x.type,
      member: x.managers[0],
      status: x.status,
      deadline: x.deadline,
      attachments: x.attachments
    }));
    return results;
  },
  totals: state => state.totals,
  dataAttachment: state => state.dataAttachment,
  totalsAttachment: state => state.totalsAttachment
};

const actions = {
  async getDataServiceRequest({ commit }, { matterId, page }) {
    commit("getDataService", await api.getDataService({ matterId, page }));
  },
  async editServiceRequest({ commit }, data) {
    commit("editService", await api.editService(data));
  },
  async addServiceRequest({ commit }, data) {
    commit("addService", await api.addService(data));
  },
  async deleteServiceRequest({ commit }, data) {
    await api.deleteService(data);
    commit("deleteService", data.id);
  },
  // Attachment
  async uploadAttachment({ commit }, req) {
    commit("uploadAttachment", await api.uploadAttachment(req))
  },
  async removeAttachment({ commit }, req) {
    commit("removeAttachment", req, await api.removeAttachment(req));
  },
  async getDataAttachment({ commit }, req) {
    commit("getDataAttachment", await api.getDataAttachment(req))
  },
};

const mutations = {
  getDataService(state, response) {
    state.services = response.results;
    state.totals = response.count;
  },
  editService(state, data) {
    state.services = state.services.map(x => {
      if (x.pk == data.pk) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  addService(state, data) {
    state.services = [data, ...state.services];
  },
  deleteService(state, id) {
    state.services = state.services.filter(x => x.pk !== id);
  },

  uploadAttachment(state, resp) {
    state.dataAttachment = state.dataAttachment.concat(resp.attachments);
  },
  removeAttachment(state, resp) {
    state.dataAttachment = state.dataAttachment.filter(x => x.pk !== resp.attachmentId);
  },
  getDataAttachment(state, resp) {
    state.dataAttachment = resp.results;
    state.totalsAttachment = resp.count;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
};
