import api from "../../api/matter.patient.detail.Communication";

const state = {
  dataCommunication: [],
  detailCommunication: {}
}

const getters = {
  dataCommunication: state => state.dataCommunication,
  detailCommunication: state => state.detailCommunication
}

const actions = {
  async getDataCommunication({ commit }) {
    commit("getDataCommunication", await api.getDataCommunication())
  },
  async getDetailCommunication({ commit }) {
    commit("getDetailCommunication", await api.getDetailCommunication())
  },
  async updateTask({ commit }, data) {
    commit("updateTaskSuccess", data);
  },
  async updateTaskDetail({ commit }, data) {
    commit("updateTaskDetailSuccess", data);
  },
  async removeRow({ commit }, id) {
    commit("removeRow", id)
  },
  async createCommunication({ commit }, data) {
    commit("createCommunication", data)
  },
  async updateDetailCommunication({ commit }, data) {
    commit("updateDetailComSuccess", data)
  }
}

const mutations = {
  getDataCommunication(state, results) {
    state.dataCommunication = results
  },
  getDetailCommunication(state, results) {
    state.detailCommunication = results
  },
  removeRow(state, id) {
    state.dataCommunication = state.dataCommunication.filter(x => x.id !== id)
  },
  createCommunication(state, data) {
    state.dataCommunication = [...state.dataCommunication, data]
  },
  updateTaskDetailSuccess(state, data) {
    const task = state.detailCommunication.Childrend.find(x => x.id === data.taskId)
    switch (data.columnName) {
      case "hightLightFromCom":
        task.hightlightName = data.newValue;
        break;
      case "implication":
        task.implication = data.newValue;
        break;
      case "tags":
        var tags = task.tags.some(x => x === data.newValue);
        if (tags) {
          task.tags = task.tags && task.tags.filter(x => x !== data.newValue);
        } else {
          task.tags = [...task.tags, data.newValue];
        }
        break;
    }
  },
  updateDetailComSuccess(state, data) {
    switch (data.type) {
      case 'name':
        state.detailCommunication.name = data.name
        break;
      case 'date':
        state.detailCommunication.date = data.date
        break;
      case 'initiator':
        var initiator = state.detailCommunication.initiator.some(x => x === data.initiator)
        if (initiator) {
          state.detailCommunication.initiator = state.detailCommunication.initiator.filter(x => x !== data.initiator);
        } else {
          state.detailCommunication.initiator = [...state.detailCommunication.initiator, data.initiator];
        }
        break;
      case 'responder':
        var responder = state.detailCommunication.responder.some(x => x === data.responder)
        if (responder) {
          state.detailCommunication.responder = state.detailCommunication.responder.filter(x => x !== data.responder);
        } else {
          state.detailCommunication.responder = [...state.detailCommunication.responder, data.responder];
        }
        break;
      case 'desc':
        state.detailCommunication.desc = data.desc
        break;
      case 'methods':
        state.detailCommunication.methods = data.methods
        break;
    }
  },
  updateTaskSuccess(state, data) {
    const task = state.dataCommunication.find(
      x => x.id === data.taskId
    );
    switch (data.columnName) {
      case "name":
        task.name = data.newValue;
        break;
      case "date":
        task.date = data.newValue;
        break;
      case "methods":
        task.methods = data.newValue;
        break;
      case "responder":
        var responder = task.responder.some(x => x === data.newValue)
        if (responder) {
          task.responder = task.responder.filter(x => x !== data.newValue);
        } else {
          task.responder = [...task.responder, data.newValue];
        }
        break;
      case "initiator":
        var initiator = task.initiator.some(x => x === data.newValue)
        if (initiator) {
          task.initiator = task.initiator.filter(x => x !== data.newValue);
        } else {
          task.initiator = [...task.initiator, data.newValue];
        }
        break;
      case "tags":
        var tags = task.tags.some(x => x === data.newValue);
        if (tags) {
          task.tags = task.tags.filter(x => x !== data.newValue);
        } else {
          task.tags = [...task.tags, data.newValue];
        }
        break;
    }
  },
}

export default {
  state,
  actions,
  getters,
  mutations,
  namespaced: true
}
