import api from "../../api/matter.briefcase.meeting";
import weekly from "./matter.briefcase.meeting.weekly";

const state = {
  dataBriefcaseMeetingAgenda: []
};

const getters = {
  dataBriefcaseMeetingAgenda: state => state.dataBriefcaseMeetingAgenda
};

const actions = {
  async getDataBriefcaseMeetingAgendaRequest({ commit }) {
    const result = await api.getDataBriefcaseMeetingAgenda();
    commit("getDataBriefcaseMeetingAgenda", result);
    return result;
  },
  async addBriefcaseMeetingAgendaRequest({ commit }, data) {
    const result = await api.addBriefcaseMeetingAgenda(data);
    commit("addBriefcaseMeetingAgenda", result);
    return result;
  }
};

const mutations = {
  getDataBriefcaseMeetingAgenda(state, data) {
    state.dataBriefcaseMeetingAgenda = data;
  },
  addBriefcaseMeetingAgenda(state, data) {
    const findMeeting = state.dataBriefcaseMeetingAgenda.find(
      x => x.date.split("T")[0] === data.date
    );
    const listTime = {
      colorLable: data.colorLable,
      description: data.description,
      meetingName: data.meetingName,
      timeEnd: data.timeStart,
      timeStart: data.timeEnd
    };
    if (findMeeting) {
      findMeeting.listTime.push(listTime);
    } else {
      state.dataBriefcaseMeetingAgenda.unshift({
        id: data.id,
        date: new Date(data.date).toISOString(),
        listTime: [listTime]
      });
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
    weekly
  }
};
