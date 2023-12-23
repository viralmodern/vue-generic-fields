import api from "../../api/workspace.client.detail.meeting";
import weekly from "./workspace.client.detail.meeting.weekly";

const state = {
  dataClientMeetingAgenda: []
};

const getters = {
  dataClientMeetingAgenda: state => state.dataClientMeetingAgenda
};

const actions = {
  async getDataClientMeetingAgendaRequest({ commit }) {
    const result = await api.getDataClientMeetingAgenda();
    commit("getDataClientMeetingAgenda", result);
    return result;
  },
  async addClientMeetingAgendaRequest({ commit }, data) {
    const result = await api.addClientMeetingAgenda(data);
    commit("addClientMeetingAgenda", result);
    return result;
  }
};

const mutations = {
  getDataClientMeetingAgenda(state, data) {
    state.dataClientMeetingAgenda = data;
  },
  addClientMeetingAgenda(state, data) {
    const findMeeting = state.dataClientMeetingAgenda.find(
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
      state.dataClientMeetingAgenda.unshift({
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
