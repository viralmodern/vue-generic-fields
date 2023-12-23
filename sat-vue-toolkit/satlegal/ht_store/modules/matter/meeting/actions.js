import api from '../../../../api/matter/meetings';
import {
  getLoadingSlickTable, mergeDataLabel
} from "@/sat-vue-toolkit/satlegal/utils";
import { NAME_LABELS_MEETING } from "@/sat-vue-toolkit/satlegal/utils/constant";

export default {
  async getDataMeetingRequest({ commit, rootGetters }, data = {}) {
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, true)
    );
    const result = await api.getDataMeeting(data);
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, false)
    );
    let listLabelsClientStore = rootGetters[NAME_LABELS_MEETING];
    let listLabelsClientMerge = [...rootGetters[NAME_LABELS_MEETING]];

    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.labels) {
          listLabelsClientMerge = mergeDataLabel(x.labels, listLabelsClientMerge);
          result[key].results[i].labels = result[key].results[i].labels.map(
            x => x.pk
          );
        }
      })
    }
    if (listLabelsClientMerge.length !== listLabelsClientStore.length) {
      commit("getLabelsWorkSpace", listLabelsClientMerge);
    }
    result.isFirstCall = data.isFirstCall;
    commit("setDataMeeting", result);
    return result;
  },
  async addMeetingRequest({ commit }, data = {}) {
    const result = await api.addMeeting(data);
    commit("addDataMeeting", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  async updateMeetingRequest({ commit }, data) {
    api.updateMeeting(data);
    const map = {
      result: { id: data.idParams.meetingId, ...data.body }
    };
    commit("updateDataMeeting", map);
  },
  async updateDateFromToMeetingRequest({ commit }, data) {
    api.updateMeeting(data);
    const map = {
      result: { id: data.idParams.meetingId, ...data.body }
    };
    commit("updateDataMeeting", map);
  },
  //update members-clients
  async postMembersMeetingRequest({ commit }, data) {
    api.addMembersMeeting(data);
    const map = {
      result: {
        id: data.idParams.meetingId,
        name: data.name,
        value: data.body[data.name == 'client' ? 'clients' : 'workspace_members'],
        isCheck: true
      }
    };
    commit("updateMemberOrClient", map);
  },
  async removeMembersMeetingRequest({ commit }, data) {
    api.removeMembersMeeting(data);
    const map = {
      result: {
        id: data.idParams.meetingId,
        name: data.name,
        value: data.valueDel,
        isCheck: false
      }
    };
    commit("updateMemberOrClient", map);
  },
  async removeMeetingRequest({ commit }, data) {
    const result = await api.removeMeeting(data);
    commit("removeDataMeeting", data);
    return result;
  },
  // Labels
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
  async removeLableWorkSpaceRequest({ commit }, id) {
    const result = await api.removeLableWorkSpace(id)
    commit("removeLableWorkSpace", id)
    return result;
  },
};
