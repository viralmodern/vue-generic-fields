import api from "../../api/matter.partient.profile.medication-log";
const state = {
  dataMedicationLog: []
}

const getters = {
  dataMedicationLog: state => state.dataMedicationLog
}

const actions = {
  async getDataMedicationLog({ commit }) {
    commit("getDataMedicationLog", await api.getDataMedicationLog())
  },
  async updateTask({ commit }, data) {
    commit("updateTaskSuccess", data)
  },
  async removeRow({ commit }, id) {
    commit("removeRow", id)
  },
  async createNewMedication({ commit }, data) {
    commit("createNewMedication", data)
  }
}

const mutations = {
  getDataMedicationLog(state, results) {
    state.dataMedicationLog = results
  },
  removeRow(state, id) {
    state.dataMedicationLog = state.dataMedicationLog.filter(x => x.id !== id)
  },
  createNewMedication(state, data) {
    state.dataMedicationLog = [...state.dataMedicationLog, data]
  },
  updateTaskSuccess(state, data) {
    const task = state.dataMedicationLog.find(
      x => x.id === data.taskId
    );
    switch (data.columnName) {
      case "medicationName":
        task.name = data.newValue;
        break;
      case "dosage":
        task.dosage = data.newValue;
        break;
      case "date":
        task.date = data.newValue;
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
  mutations,
  getters,
  actions,
  namespaced: true
}
