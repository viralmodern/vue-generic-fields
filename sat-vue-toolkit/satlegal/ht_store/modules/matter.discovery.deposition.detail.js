import api from "../../api/matter.discovery.deposition.detail";
import deponent from "./matter.discovery.deposition.detail.deponent";
const state = {
  dataDepositionDetail: {},
  isLoadingGetDepositionDetail: false,
};
const getters = {
  dataDepositionDetail: state => state.dataDepositionDetail,
  deponentType: state => {
    if ([1, 2, 3].includes(state.dataDepositionDetail.deponent_type)) {
      return 1;
    }
    if (state.dataDepositionDetail.deponent_type === 4) {
      return 2;
    }
  },
  isLoadingGetDepositionDetail: state => state.isLoadingGetDepositionDetail
};

const actions = {
  async getDataDepositionDetailRequest({ commit }, data) {
    commit("setLoading", true);
    const result = await api.getDataDepositionDetail(data);
    commit("setLoading", false);
    commit("getDataDepositionDetail", result);
    return result;
  },
  async editDataDespositionDetailRequest({ commit }, data) {
    api.editDataDespositionDetail(data);
    commit("editDataDespositonDetail", data.body);
  },
};

const mutations = {
  getDataDepositionDetail(state, data) {
    state.dataDepositionDetail = data;
  },
  editDataDespositonDetail(state, data) {
    state.dataDepositionDetail = {...state.dataDepositionDetail, ...data};
  },
  updateRelationsDepositionDetail(state, data) {
    state.dataDepositionDetail.relations_info.first_class_relations.push(data)
  },
  removeRelationsDepositionDetail(state, data) {
    let relations = state.dataDepositionDetail.relations_info.first_class_relations.filter(x => {
      const checkContentTypeId = data.contentTypeId !== x.content_type_id;
      if (checkContentTypeId) {
        return true;
      } else {
        return +x.pk !== +data.objectId;
      }
    });
    state.dataDepositionDetail.relations_info.first_class_relations = relations;
  },
  setLoading(state, status) {
    state.isLoadingGetDepositionDetail = status;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    deponent
  }
};
