import api from "../../api/matter.patient.profile";
import agreementDetail from "./matter.partient.profile.detail.agreement.detail";
import medicationLog from "./matter.partient.profile.medication-log";
import communication from "./matter.patient.detail.Communication";
import prescribes from "./matter.patient.profile.detail.prescribes";
import symptomLog from "./matter.patient.profile.detail.symptom-log";

const state = {
  dataPatientProfile: []
};

const getters = {
  dataPatientProfile: state => state.dataPatientProfile
};

const actions = {
  async getDataPatientProfile({ commit }) {
    commit("getDataPatientProfile", await api.getDataPatientProfile());
  },
  async updateTask({ commit }, data) {
    commit("updateTaskSuccess", data);
  },
  async removeRow({ commit }, id) {
    commit("removeRow", id);
  },
  async createNewAgreement({ commit }, data) {
    commit("createNewAgreement", data);
  }
};

const mutations = {
  getDataPatientProfile(state, data) {
    state.dataPatientProfile = data;
  },
  removeRow(state, id) {
    state.dataPatientProfile = state.dataPatientProfile.filter(
      x => x.id !== id
    );
  },
  createNewAgreement(state, data) {
    state.dataPatientProfile = [...state.dataPatientProfile, data];
  },
  updateTaskSuccess(state, data) {
    const task = state.dataPatientProfile.find(x => x.id === data.taskId);
    switch (data.columnName) {
      case "agreementName":
        task.name = data.newValue;
        break;
      case "dateOfAgreement":
        task.date = data.newValue;
        break;
      case "defendantParty":
        var defendantParty = task.defendantParty.some(x => x === data.newValue);
        if (defendantParty) {
          task.defendantParty = task.defendantParty.filter(
            x => x !== data.newValue
          );
        } else {
          task.defendantParty = [...task.defendantParty, data.newValue];
        }
        break;
      case "plaintiffParty":
        var plaintiffParty = task.plaintiffParty.some(x => x === data.newValue);
        if (plaintiffParty) {
          task.plaintiffParty = task.plaintiffParty.filter(
            x => x !== data.newValue
          );
        } else {
          task.plaintiffParty = [...task.plaintiffParty, data.newValue];
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    communication,
    agreementDetail,
    medicationLog,
    prescribes,
    symptomLog
  }
};
