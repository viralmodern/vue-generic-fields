import api from "../../api/matter.patient.profile.detail.symptom-log";
import moment from "moment";

function dateWithoutHours(date) {
  if (!date) return null;
  const currentDate = new Date(date);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const timeStamp = new Date(
    `${currentYear}-${currentMonth}-${currentDay} 00:00:00`
  ).getTime();
  return new Date(timeStamp).getTime();
}

function durationFromStartToEnd(start, end) {
  if (!start || !end) return null;
  const momentStart = moment(start);
  const momentEnd = moment(end);
  return (
    (moment.duration(momentEnd.diff(momentStart)).as("days") + 1) * 24 * 60 * 60
  );
}

const state = {
  dataSymptomLog: []
};
const getters = {
  dataSymptomLog: state => state.dataSymptomLog,
  dataInSymptomLogGantt: state => {
    const list = [];
    state.dataSymptomLog.forEach(x => {
      const start = dateWithoutHours(x.startDate);
      const end = dateWithoutHours(x.endDate);
      const duration = durationFromStartToEnd(start, end);
      list.push({
        id: x.id,
        name: x.name,
        start,
        duration,
        progress: 100,
        startDate: x.startDate,
        endDate: x.endDate,
        type: "project"
      });
    });
    return list;
  }
};

const actions = {
  async getDataSymptomLogRequest({ commit }) {
    const result = await api.getDataSymptomLog();
    commit("getDataSymptomLog", result);
    return result;
  },
  async addSymptomLogRequest({ commit }, data) {
    const result = await api.addSymptomLog(data);
    result.id = Math.random();
    result.characters = [];
    result.facts = [];
    result.citations = [];
    result.symptom = [];
    commit("addSymptomLog", result);
    return result;
  },
  updateSymptomLogRequest({ commit }, data) {
    api.updateSymptomLog(data);
    commit("updateSymptomLog", data);
  },
  async removeSymptomLogRequest({ commit }, data) {
    const result = await api.removeSymptomLog(data);
    commit("removeSymptomLog", result);
    return result;
  }
};

const mutations = {
  getDataSymptomLog(state, data) {
    state.dataSymptomLog = data;
  },
  addSymptomLog(state, data) {
    state.dataSymptomLog.unshift(data);
  },
  updateSymptomLog(state, data) {
    state.dataSymptomLog = state.dataSymptomLog.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeSymptomLog(state, id) {
    state.dataSymptomLog = state.dataSymptomLog.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
