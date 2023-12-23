
import api from "../../api/project.member";
import {$$STORE_PREFIX} from "../../utils";

const state = {
  members: []
};

const getters = {
  members: (state, _, __, rootGetter) => {
    const workspaceMember = rootGetter['ht_store/workspace/member/members'];
    const dataJoin = workspaceMember.filter(x => state.members.some(x1 => x1.user === x.id));
    return dataJoin;
  },
  dataMembers: (state, _, __, rootGetter) => {
    const workspaceMember = rootGetter['ht_store/workspace/member/members'];
    const dataJoin = workspaceMember.filter(x => state.members.some(x1 => x1.user === x.id));
    return dataJoin;
  },
  dataMembersNotExitsCurrentUser: (state, getters, __, rootGetter) => {
    const currentUser = rootGetter['ht_store/user/currentUser'];
    const members = getters.members.filter(x => x.id !== currentUser.pk)
    return members;
  }
};

const actions = {
  async getDataMembersRequest({ commit }, { matterId }) {
    const result = await api.getMembers({ matterId });
    commit("getDataMembers", result);
    return result;
  }
};

const mutations = {
  getDataMembers(state, data) {
    state.members = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
