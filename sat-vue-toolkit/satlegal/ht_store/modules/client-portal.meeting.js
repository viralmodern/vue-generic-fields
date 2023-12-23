import api from "../../api/client-portal.meeting";
import weekly from "./client-portal.meeting.weekly";

const state = {
  dataPortalMeetingAgenda: []
};

const getters = {
  dataPortalMeetingAgenda: state => state.dataPortalMeetingAgenda
};

const actions = {
  async getDataPortalMeetingAgendaRequest({ commit }) {
    const result = await api.getDataPortalMeetingAgenda();
    commit("getDataPortalMeetingAgenda", result);
    return result;
  },
  async addPortalMeetingAgendaRequest({ commit }, data) {
    const result = await api.addPortalMeetingAgenda(data);
    commit("addPortalMeetingAgenda", result);
    return result;
  }
};

const mutations = {
  getDataPortalMeetingAgenda(state, data) {
    state.dataPortalMeetingAgenda = data;
  },
  addPortalMeetingAgenda(state, data) {
    const findMeeting = state.dataPortalMeetingAgenda.find(
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
      state.dataPortalMeetingAgenda.unshift({
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
