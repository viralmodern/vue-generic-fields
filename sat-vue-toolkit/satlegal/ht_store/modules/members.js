import data from "@/sat-vue-toolkit/satlegal/mock-data/members";

const state = {
    dataMembers: [],
    loadingDataMembers: false,
};

// getters
const getters = {
    dataMembers: state => state.dataMembers,
    loadingDataMembers: state => state.loadingDataMembers,
};

// actions
const actions = {
    async getDataMembersRequest({ commit }) {
        commit("setLoadingMembers", true);
        setTimeout(() => {
            commit("getDataMembersRequest", data.dataMembers);
            commit("setLoadingMembers", false);
        }, 2000);
    }
};

// mutations
const mutations = {
    getDataMembersRequest(state, data) {
        state.dataMembers = data;
    },
    setLoadingMembers(state, status) {
        state.loadingDataMembers = status;
    },
    cleanUpPageData(state) {
      state.dataMembers = [];
      state.loadingDataMembers = false;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
