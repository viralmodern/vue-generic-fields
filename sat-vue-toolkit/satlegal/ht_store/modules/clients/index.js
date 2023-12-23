import api from "@/sat-vue-toolkit/satlegal/api/clients/";
import _ from "lodash";
import { getLoadingSlickTable, mergeDataLabel } from "@/sat-vue-toolkit/satlegal/utils";
import { NAME_CLIENTS, NAME_LABELS_CLIENTS } from "@/sat-vue-toolkit/satlegal/utils/constant";
//imports modules
import clientsCommon from "./clients-common"
import addressBook from "./client-address-book/"
import documentRequest from "./document-request/"
import clientMessage from "./client-message/";

const state = {
  dataClients: [],
  totals: 0,
  isLoadingGet: {},
  dataNotes: [],
  totalsPageNote: 0,
  isShowPaginationNotes: false,
  members: [],
  clientDetail: {}
};
const getters = {
  dataClients: state => state.dataClients,
  dataClientsNoGroup: state => {
    if (state.dataClients.all) {
      const results = state.dataClients.all.results;
      return results ? results : [];
    }
    return [];
  },
  isLoadingGet: state => state.isLoadingGet,
  totals: state => state.totals,
  dataNotes: (state, _, __, rootGetters) => {
    const matterMembers = rootGetters['ht_store/clients/clientsCommon/members'];
    const dataMap = state.dataNotes.map(x => {
      const findMembers = matterMembers.find(member => member.id === x.creator) || {};
      let member = {};
      if (findMembers.avatar) {
        member = {
          avatar: findMembers.avatar.imageUrl,
          peopleWrite: findMembers.avatar.name,
        };
      }
      return {
        ...x,
        ...member,
      };
    })
    return dataMap;
  },
  totalsPageNote: state => Math.ceil(state.countNotes / 20),
  isShowPaginationNotes: (state, getters) => (getters.totalsPageNote || 0) > 1,
  clientDetail: state => state.clientDetail
};

const actions = {
  async getDataClientsRequest({ commit, rootGetters }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataClients(data);
    let listClientStore = rootGetters[NAME_CLIENTS];
    let listClientMerge = [...rootGetters[NAME_CLIENTS]];

    let listLabelsClientStore = rootGetters[NAME_LABELS_CLIENTS];
    let listLabelsClientMerge = [...rootGetters[NAME_LABELS_CLIENTS]];

    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.labels) {
          listLabelsClientMerge = mergeDataLabel(x.labels, listLabelsClientMerge);
          result[key].results[i].labels = result[key].results[i].labels.map(
            x => x.pk
          );
        }
        listClientMerge.push({ ...x, id: x.pk });
        result[key].results[i].managers_map = (result[key].results[i].managers || []).map(x => x.user_id);
        result[key].results[i].client_referrals = (result[key].results[i].client_referrals || []).map(x => x.pk);
      })
    }

    if (listLabelsClientMerge.length !== listLabelsClientStore.length) {
      commit("ht_store/clients/clientsCommon/getLabelsWorkSpace", listLabelsClientMerge, {
        root: true
      });
    }
    if (listClientMerge.length !== listClientStore.length) {
      commit("ht_store/clients/clientsCommon/setAllDataClients", listClientMerge, { root: true });
    }
    result.isFirstCall = data.isFirstCall;
    commit("getDataClients", result);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));
  },
  async updateClientsRequest({ commit }, { idParams, body, detail = false }) {
    api.UpdateClient({ idParams, body });
    const map = { pk: idParams.pk, result: body }
    if (detail) {
      commit("updateClientDetail", map)
    } else {
      commit("updateClient", map)
    }
    return body;
  },
  async updateClientAsyncRequest({ commit }, { idParams, body, detail = false }) {
    const result = await api.UpdateClient({ idParams, body });
    const map = { pk: idParams.pk, result: body }
    if (!detail) {
      commit("updateClient", map)
    } else {
      commit("updateClientDetail", map)
    }
    return result;
  },
  async postManagersRequest({ commit }, { idParams, body, detail }) {
    const result = await api.postManagers({ idParams, body });
    const map = {
      pk: idParams.pk,
      data: result,
      isCheck: true
    }
    if (!detail) {
      commit("updateManagersClient", map)
    } else {
      commit("updateManagersClientDetail", map)
    }
  },
  async updateFullameClientAsyncRequest({ commit }, { idParams, body, detail = false }) {
    const result = await api.UpdateClient({ idParams, body });
    const map = { pk: idParams.pk, result: { ...body, avatar: result.avatar } }
    if (!detail) {
      commit("updateClient", map);
    } else {
      commit("updateClientDetail", map)
    }
    return result;
  },
  async removeManagersRequest({ commit }, { pk, value, user_id, detail = false }) {
    api.removeManagers({ pk, value });
    const map = {
      pk: pk,
      data: user_id,
      isCheck: false
    }
    if (!detail) {
      commit("updateManagersClient", map)
    } else {
      commit("updateManagersClientDetail", map)
    }
  },
  async removeClientRequest({ commit }, data) {
    const result = await api.removeRequestApi(data);
    commit("removeDataMutations", data);
    return result;
  },
  async getDataNotesRequest({ commit }, data = {}) {
    const result = await api.getDataNotes(data);
    commit("getDataNote", result);
    return result;
  },
  async addNotesRequest({ commit }, { idParams, body }) {
    const result = await api.addNotes({ idParams, body });
    commit("updateNotes", { id: idParams.rowId, notes: result });
    return result;
  },
  async updateNotesRequest(_, data = {}) {
    const result = await api.updateNotes(data);
    return result;
  },
  async removeNotesRequest({ commit }, data) {
    const result = await api.removeNotes(data);
    commit("removeNotes", { id: data.rowId, noteId: data.noteId });
    return result;
  },
  async addMatterOfClient({ commit }, { body, detail }) {
    const result = await api.addMatter(body)
    const map = {
      pk: body.clients[0],
      data: result
    }
    if (!detail) {
      commit("updateFieldMatter", map)
    }
    else {
      commit("updateFieldMatterDetail", map)
    }
    return result;
  },
  async addMeetingRequest({ commit }, { body, detail = false }) {
    const result = await api.addMeeting(body);
    const map = {
      pk: body.clients[0],
      data: result
    }
    if (!detail) {
      commit("updateFieldMeeting", map)
    } else {
      commit("updateFieldMeetingDetail", map)
    }
    return result;
  },
  async getClientDetailRequest({ commit, rootGetters }, pk) {
    const result = await api.getClientDetail(pk);
    let listLabelsClientStore = rootGetters[NAME_LABELS_CLIENTS];
    let listLabelsClientMerge = [...rootGetters[NAME_LABELS_CLIENTS]];
    if (result) {
      listLabelsClientMerge = mergeDataLabel(result.labels, listLabelsClientMerge);
      result.labels = (result.labels || []).map(x => x.pk);
    }
    if (listLabelsClientMerge.length !== listLabelsClientStore.length) {
      commit("ht_store/clients/clientsCommon/getLabelsWorkSpace", listLabelsClientMerge, {
        root: true
      });
    }
    result.managers_map = (result.managers || []).map(x => x.user_id);
    result.client_referrals = (result.client_referrals || []).map(x => x.pk);
    commit("setClientDetail", result);
    return result;
  },
  async updateAddressRequest({ commit }, { idParams, body, detail = false }) {
    const result = api.updateAddress({ idParams, body })
    const map = { pk: idParams.pk, result: body, clientId: idParams.clientId, detail }
    commit("updateAddressClient", map)
    return result
  },
  async postAddressRequest({ commit }, { idParams, body, detail = false }) {
    const result = await api.postAddress({ idParams, body })
    const map = { clientId: idParams.clientId, result, detail }
    commit("postAddress", map)
    return result
  },
  async removeAddressRequest({ commit }, data) {
    const result = await api.removeAddress(data)
    commit("removeAddress", data)
    return result
  },
  async addClientRequest({ commit }, data) {
    const result = await api.addClient(data)
    commit("addClient", { listIdGroup: data.listIdGroup, result })
    return result
  }
};

const mutations = {
  addClient(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataClients[name];
      data.results.push(result);
      data.totals++;
    });
  },
  removeAddress(state, { clientId, pk, detail = false }) {
    for (const key in state.dataClients) {
      state.dataClients[key].results = state.dataClients[
        key
      ].results.map(x => {
        if (x.pk === clientId) {
          const addresses = x.addresses.filter(x => x.pk !== pk)
          return { ...x, addresses }
        }
        return x;
      });
    }
    if (detail) {
      const addresses = state.clientDetail.addresses.filter(x => x.pk !== pk)
      state.clientDetail = { ...state.clientDetail, addresses }
    }

  },
  postAddress(state, { clientId, result, detail }) {
    for (const key in state.dataClients) {
      state.dataClients[key].results = state.dataClients[
        key
      ].results.map(x => {
        if (x.pk === clientId) {
          const addresses = [...x.addresses, result]
          return { ...x, addresses }
        }
        return x;
      });
    }
    if (detail) {
      const addresses = [...state.clientDetail.addresses, result]
      state.clientDetail = { ...state.clientDetail, addresses }
    }

  },
  updateAddressClient(state, { pk, clientId, result, detail }) {
    for (const key in state.dataClients) {
      state.dataClients[key].results = state.dataClients[
        key
      ].results.map(x => {
        if (x.pk === clientId) {
          x.addresses = (x.addresses || []).map(a => {
            if (a.pk === pk) {
              return { ...a, ...result }
            }
            return a
          })
        }
        return x;
      });
    }
    if (detail) {
      state.clientDetail.addresses = (state.clientDetail.addresses || []).map(a => {
        if (a.pk === pk) {
          return { ...a, ...result }
        }
        return a
      })
    }

  },
  getDataClients(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataClients = data;
    } else {
      for (let key in data) {
        const mergeTasks = (
          (state.dataClients[key] || {}).results || []
        ).concat(data[key].results);
        const results = _.uniqBy(mergeTasks, "pk"); //remove duplicates
        state.dataClients[key] = {
          ...data[key],
          results
        };
      }
      state.dataClients = { ...state.dataClients };
    }

  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },
  updateClient(state, { pk, result }) {
    for (const key in state.dataClients) {
      state.dataClients[key].results = state.dataClients[
        key
      ].results.map(x => {
        if (x.pk === pk || x.pk === result.pk) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  updateClientAsync(state, data) {
    for (const key in state.dataClients) {
      state.dataClients[key].results = state.dataClients[
        key
      ].results.map(x => {
        if (x.pk === data.pk) {
          return data;
        }
        return x;
      });
    }
  },

  updateEmailsMutation(state, data) {
    for (const key in state.dataClients) {
      state.dataClients[key].results = state.dataClients[
        key
      ].results.map(x => {
        if (x.pk === data.pk) {
          return {
            ...data,
            extra_info: x.extra_info && {
              ...x.extra_info,
              emails: [{ primary: true, email: data.email }],
            }
          };
        }
        return x;
      });
    }
  },

  updateFieldMeeting(state, { pk, data }) {
    for (const key in state.dataClients) {
      state.dataClients[key].results = state.dataClients[
        key
      ].results.map(x => {
        if (x.pk === pk) {
          const meetings = x.meetings || []
          meetings.push(data)
          return { ...x, meetings };
        }
        return x;
      });
    }
  },

  updateFieldMatter(state, { pk, data }) {
    for (const key in state.dataClients) {
      state.dataClients[key].results = state.dataClients[
        key
      ].results.map(x => {
        if (x.pk === pk) {
          const matters = x.matters || []
          matters.push(data)
          return { ...x, matters };
        }
        return x;
      });
    }
  },

  updateManagersClient(state, { pk, data, isCheck }) {
    for (const key in state.dataClients) {
      state.dataClients[key].results = state.dataClients[
        key
      ].results.map(x => {
        if (x.pk === pk) {
          let managers = x.managers || [];
          let managers_map = x.managers_map || []
          if (isCheck) {
            managers.push({ ...data, user_id: data.user })
            managers_map.push(data.user)
          } else {
            managers = managers.filter(x => x.pk !== data);
            managers_map = managers_map.filter(x => x !== data);
          }
          return { ...x, managers, managers_map }
        }
        return x;
      });
    }
  },

  removeDataMutations(state, { name, id, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataClients) {
        state.dataClients[key].results = state.dataClients[
          key
        ].results.filter(x => x.pk !== id);
        state.dataClients[key].totals--;
      }
    } else {
      state.dataClients[name].results = state.dataClients[
        name
      ].results.filter(x => x.pk !== id);
      state.dataClients[name].totals--;
    }
  },

  getDataNote(state, data) {
    state.dataNotes = data.results;
    state.countNotes = data.count;
  },
  updateNotes(state, data) {
    for (const key in state.dataClients) {
      state.dataClients[key].results = state.dataClients[
        key
      ].results.map(x => {
        if (x.pk === data.id) {
          const total_notes = x.total_notes + 1;
          return { ...x, total_notes };
        }
        return x;
      });
    }
  },
  removeNotes(state, data) {
    for (const key in state.dataClients) {
      state.dataClients[key].results = state.dataClients[
        key
      ].results.map(x => {
        if (x.pk === data.id) {
          return { ...x, total_notes: x.total_notes - 1 };
        }
        return x;
      });
    }
  },

  setClientDetail(state, data) {
    state.clientDetail = data
  },
  updateClientDetail(state, { result }) {
    state.clientDetail = { ...state.clientDetail, ...result }
  },
  updateManagersClientDetail(state, { data, isCheck }) {
    let managers = state.clientDetail.managers
    let managers_map = state.clientDetail.managers_map
    if (isCheck) {
      managers.push({ ...data, user_id: data.user })
      managers_map.push(data.user)
    } else {
      managers = managers.filter(x => x.pk !== data);
      managers_map = managers_map.filter(x => x !== data);
    }
    state.clientDetail = { ...state.clientDetail, managers, managers_map }
  },
  updateFieldMatterDetail(state, { data }) {
    const matters = state.clientDetail.matters || []
    matters.push(data)
    state.clientDetail = { ...state.clientDetail, matters };
  },
  updateFieldMeetingDetail(state, { data }) {
    const meetings = state.clientDetail.meetings || []
    meetings.push(data)
    state.clientDetail = { ...state.clientDetail, meetings };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    clientMessage,
    clientsCommon,
    addressBook,
    documentRequest
  }
};
