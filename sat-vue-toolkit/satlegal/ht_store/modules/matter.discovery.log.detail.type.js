import api from "../../api/matter.discovery.log.detail.list.type";
const state = {
  listType: {}
};
const getters = {
  listType: state => state.listType
};

const actions = {
  async getDataLogDetailListTypeRequest({ commit }) {
    commit("getDataLogDetailListType", await api.getDataListType());
  },
  async changeDataTypeRequest({ commit }, data) {
    commit("changeDataType", data);
  },
  async deleteLogTypeRequest({ commit }, data) {
    commit("deleteLogType", data);
  },
  async addLogTypeRequest({ commit }, data) {
    commit("addLogType", data);
  }
};

const mutations = {
  getDataLogDetailListType(state, data) {
    state.listType = data;
  },
  changeDataType(state, data) {
    if (data.type == 1) {
      const item = state.listType.privilegeLog.find(
        x => x.id === data.parentId
      );
      item[data.column] = data.value;
    }
    if (data.type == 2) {
      const item = state.listType.chainOfCustody.find(
        x => x.id === data.parentId
      );
      item[data.column] = data.value;
    }
    if (data.type == 3) {
      const item = state.listType.communicationLog.find(
        x => x.id === data.parentId
      );
      item[data.column] = data.value;
    }
    if (data.type == 4) {
      const item = state.listType.exhibitLog.find(x => x.id === data.parentId);
      item[data.column] = data.value;
    }
  },
  deleteLogType(state, data) {
    if (data.type == 1) {
      state.listType.privilegeLog = state.listType.privilegeLog.filter(
        x => x.id !== data.id
      );
    }
    if (data.type == 2) {
      state.listType.chainOfCustody = state.listType.chainOfCustody.filter(
        x => x.id !== data.id
      );
    }
    if (data.type == 3) {
      state.listType.communicationLog = state.listType.communicationLog.filter(
        x => x.id !== data.id
      );
    }
    if (data.type == 4) {
      state.listType.exhibitLog = state.listType.exhibitLog.filter(
        x => x.id !== data.id
      );
    }
  },
  addLogType(state, data) {
    if (data.typeId == 1) {
      state.listType.privilegeLog.push(data.value);
    }
    if (data.typeId == 2) {
      state.listType.chainOfCustody.push(data.value);
    }
    if (data.typeId == 3) {
      state.listType.communicationLog.push(data.value);
    }
    if (data.typeId == 4) {
      state.listType.exhibitLog.push(data.value);
    }
  },
  deleteAttachment(state, data) {
    if (data.typeId == 1) {
      state.listType.privilegeLog.attachments = (state.listType.privilegeLog.attachments || []).filter(
        x => x.id !== data.idAttachment
      );
    }
  },
  addAttachment(state, data){
    if (data.typeId == 1) {
      const item = state.listType.privilegeLog.find(x => x.id === data.id);
      item.attachments.push(data.idAttachment[0])
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
