import api from "../../api/task.detail";
import citation from "./task.detail.tags.citation";

const state = {
  dataMemberProject: [],
  dataProjectGroup: [],
  dataTagGroup: [],
  dataTag: [],
  dataPeoPleGroup: []
};

const getters = {
  dataMemberProject: state => state.dataMemberProject,
  dataProjectGroup: state => state.dataProjectGroup,
  dataMemberInGroup: state => state.dataMemberInGroup,
  dataTagGroup: state => state.dataTagGroup,
  dataTag: state => state.dataTag,
  dataPeoPleGroup: state => state.dataPeoPleGroup
};

const actions = {
  async getDataMemberProjectRequest({ commit }) {
    commit("getDataMemberProject", await api.getDataMemberProject());
  },
  async getDataProjectGroupRequest({ commit }) {
    commit("getDataProjectGroup", await api.getDataProjectGroup());
  },
  async getDataTagGroupRequest({ commit }) {
    commit("getDataTagGroup", await api.getDataTagGroup());
  },
  async getDataTagRequest({ commit }) {
    commit("getDataTag", await api.getTag());
  },
  async getDataPeopleGroupRequest({ commit }) {
    commit("getDataPeopleGroupSuccess", await api.getDataPeopleGroup());
  }
};

const mutations = {
  getDataMemberProject(state, dataMemberProject) {
    state.dataMemberProject = dataMemberProject;
  },
  getDataProjectGroup(state, dataProjectGroup) {
    state.dataProjectGroup = dataProjectGroup;
  },
  getDataPeopleGroupSuccess(state, dataPeoPleGroup) {
    state.dataPeoPleGroup = dataPeoPleGroup;
  },
  deleteMemberProject(state, data) {
    let index = state.dataProjectGroup.findIndex(x => x.id === data.group.id);
    let objectGroup = state.dataProjectGroup[index];
    objectGroup.member = objectGroup.member.filter(
      x => x.id !== data.members.id
    );
    state.dataProjectGroup[index] = objectGroup;
  },

  addGroupProject(state, data) {
    state.dataProjectGroup.push({
      id: Math.random(),
      name: data.groupName,
      member: state.dataPeoPleGroup
        .filter(x => data.members.some(r => r === x.id))
        .map((x, i) => ({ ...x, id: i + 1 }))
    });
  },
  addMemberInGroup(state, data) {
    let index = state.dataProjectGroup.findIndex(x => x.id === data.group.id);
    let objectGroup = state.dataProjectGroup[index];
    objectGroup.member = [...objectGroup.member, data.members];
    state.dataProjectGroup[index] = objectGroup;
  },
  getDataTagGroup(state, dataTagGroup) {
    state.dataTagGroup = dataTagGroup;
  },
  getDataTag(state, dataTag) {
    state.dataTag = dataTag;
  },
  addTagsGroup(state, data) {
    state.dataTagGroup.push({
      id: state.dataTagGroup.length + 1,
      name: data.name,
      tags: data.tags
    });
  },
  deleteTagsInGroup(state, data) {
    const {
      group: { id },
      tag
    } = data;
    state.dataTagGroup = state.dataTagGroup.map(x => {
      if (x.id === id) {
        return { ...x, tags: x.tags.filter(x1 => x1 !== tag) };
      }
      return x;
    });
  },
  addTagsInGroup(state, data) {
    const {
      group: { id },
      name
    } = data;
    state.dataTagGroup = state.dataTagGroup.map(x => {
      if (x.id === id) {
        return { ...x, tags: [...x.tags, name] };
      }
      return x;
    });
  },
  deleteGroupPeople(state, itemGroup) {
    var index = state.dataProjectGroup.findIndex(x => x.id === itemGroup.id);
    return state.dataProjectGroup.splice(index, 1);
  },
  selectMember(state, data) {
    let index = state.dataProjectGroup.findIndex(x => x.id === data.group.id);
    let objectGroup = state.dataProjectGroup[index];
    let checkMember = objectGroup.member.some(c => c.id === data.memberId);
    if (!checkMember) {
      objectGroup.member = objectGroup.member.filter(
        y => y.id !== data.members.id
      );
      state.dataProjectGroup[index] = objectGroup;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    citation
  }
};
