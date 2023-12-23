import api from '../../api/project.contacts.detail'

const state = {
    dataGeneralInfo: {},
    loadingGeneralInfo: false,
};

const getters = {
    dataGeneralInfo: state => state.dataGeneralInfo,
    loadingGeneralInfo: state => state.loadingGeneralInfo,
};

const actions = {
    async getDataGeneralInfoRequest({ commit }) {
        commit("setLoadingGeneralInfo", true);
        commit("getDataGeneralInfoSuccess", await api.getDataGeneralInfo())
        commit("setLoadingGeneralInfo", false);
    }
};

const mutations = {
    getDataGeneralInfoSuccess(state, data) {
        state.dataGeneralInfo = data;
    },
    updateGeneralInfo(state, data) {
        state.dataGeneralInfo = { ...data }
    },
    setLoadingGeneralInfo(state, status) {
        state.loadingGeneralInfo = status
    },
    cleanUpPageData(state) {
        state.dataGeneralInfo = {}
        state.loadingGeneralInfo = false
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
