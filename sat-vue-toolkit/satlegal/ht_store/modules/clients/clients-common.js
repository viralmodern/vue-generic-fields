import api from "../../../api/clients/clients-common";

const state = {
  members: [],
  dataLabelsWorkSpace: [],
  dataClients: []
};
const getters = {
  members: (state, _, __, rootGetter) => {
    const workspaceMember = rootGetter['ht_store/workspace/member/members'];
    const dataJoin = workspaceMember.filter(x => state.members.some(x1 => x1.user === x.id));
    return dataJoin;
  },
  dataMembersNotExitsCurrentUser: (state, getters, __, rootGetter) => {
    const currentUser = rootGetter['ht_store/user/currentUser'];
    const members = getters.members.filter(x => x.id !== currentUser.pk)
    return members;
  },
  dataLabelsWorkSpace: state => state.dataLabelsWorkSpace,
  dataClients: state => state.dataClients
};

const actions = {
  async getWorkspaceMemberRequest({ commit }, payload = {}) {
    const results = await api.getWorkSpaceMembers(payload);
    commit("getDataMembers", results)
    return results;
  },
  async getLablesWorkSpaceRequest({ commit }, payload = {}) {
    const results = await api.labelsWorkSpace(payload);
    const map = (results || []).map(item => ({ ...item, color: `#${item.color}` }))
    commit("getLabelsWorkSpace", map);
    return results;
  },
  async addLableWorkSpaceRequest({ commit }, data) {
    const result = await api.addLableWorkSpace(data)
    commit("addLableWorkSpace", result)
  },
  async updateLableWorkSpaceRequest({ commit }, data) {
    api.updateLableWorkSpace(data)
    commit("updateLableWorkSpace", data)
  },
  async removeLableWorkSpaceRequest({ commit }, data) {
    api.removeLableWorkSpace(data)
    commit("removeLableWorkSpace", data)
  },
  async getDataClientsCommonRequest({ commit }, payload = {}) {
    const results = await api.getClients(payload);
    commit("setAllDataClients", results)
    return results;
  },

};

const mutations = {
  getDataMembers(state, data) {
    state.members = data.map(item => ({
      ...item,
      user: item.user && item.user.pk
    }));
  },
  getLabelsWorkSpace(state, data) {
    state.dataLabelsWorkSpace = data
  },
  addLableWorkSpace(state, data) {
    state.dataLabelsWorkSpace.unshift({ ...data, color: `#${data.color}` });
  },
  updateLableWorkSpace(state, data) {
    state.dataLabelsWorkSpace = state.dataLabelsWorkSpace.map(item => {
      if (item.pk === data.id) {
        return { ...data, pk: item.pk }
      }
      return item
    })
  },
  removeLableWorkSpace(state, data) {
    state.dataLabelsWorkSpace = state.dataLabelsWorkSpace.filter(item => item.pk !== data.id)
  },
  setAllDataClients(state, data) {
    state.dataClients = data
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
