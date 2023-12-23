import api from "../../api/project.research.timeline";
import detail from "./project.research.timeline.detail";
import tag from "./project.research.timeline.tag";
import {$$STORE_PREFIX} from "../../utils";
const state = {
  dataTimeline: [],
  total: 0,
  dataTimeLineDetail: {}
};

const getters = {
  dataTimeline: (state, _, __, rootGetters) => {
    const member = rootGetters['ht_store/workspace/member/members'];
    return state.dataTimeline.map(x => {
      const members = x.members.map(m => ({ ...m, user: member.find(find => find.id === m.user) }));
      return {
        ...x,
        members,
        creator: member.find(find => find.id === x.creator),
        tags: x.tags.map(x => ({ ...x, color: `#${x.color}` }))
      }
    });
  },
  showShowMore: state => state.total > state.dataTimeline.length,
  dataTimeLineDetail: state => state.dataTimeLineDetail
};

const actions = {
  async getDataResearchTimelineRequest({ commit }, { page, matterId }) {
    const result = await api.getDataResearchTimeline({ page, matterId });
    commit("getDataResearchTimeline", result);
    return result;
  },
  async addNewTimeline({ commit }, request) {
    commit("addNewTimeline", await api.addNewTimeline(request))
  },
  async getDetailTimeLine({ commit }, request) {
    commit("getDetailTimeLine", await api.getDetailTimeLine(request));
  },
  async updateTimelineDetail({ commit }, request) {
    commit("updateTimelineDetail", await api.updateTimelineDetail(request));
  },
  async updateMembers({ commit }, req) {
    const result = await api.updateMembers(req)
    commit("updateMembers", { req, result });
    return result;
  }
};

const mutations = {
  getDataResearchTimeline(state, res) {
    state.dataTimeline = res.results;
    state.total = res.count;
  },
  addNewTimeline(state, data) {
    state.dataTimeline = [data, ...state.dataTimeline];
  },
  cleanUpPageData(state) {
    state.dataTimeline = [];
    state.total = 0;
  },
  getDetailTimeLine(state, response) {
    state.dataTimeLineDetail = response;
  },
  updateTimelineDetail(state, response) {
    state.dataTimeLineDetail = response;
  },
  updateMembers(state, response) {
    if (response.req.type === 'remove') {
      state.dataTimeLineDetail = {
        ...state.dataTimeLineDetail,
        members: state.dataTimeLineDetail.members.filter(x => x.pk !== response.req.userId)
      }
    } else if (response.req.type === 'add') {
      state.dataTimeLineDetail = {
        ...state.dataTimeLineDetail,
        members: [...state.dataTimeLineDetail.members, response.result.members[0]]
      }
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
    detail,
    tag
  }
};
