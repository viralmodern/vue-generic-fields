import api from "../../api/project.signature";

const state = {
    dataListContract: {},
    dataListReleasedSignatures: {},
    loadingDataContract: false,
    loadingDataReleasedSignatures: false,
};

// getters
const getters = {
    dataListContract: state => state.dataListContract,
    dataListReleasedSignatures: state => state.dataListReleasedSignatures,
    loadingDataContract: state => state.loadingDataContract,
    loadingDataReleasedSignatures: state => state.loadingDataReleasedSignatures,
};

// actions
const actions = {
    async getDataListContractRequest({ commit }) {
        commit("setLoadingDataContract", true)
        commit("getDataListContract", await api.getDataListContract());
        commit("setLoadingDataContract", false)
    },
    async getDataReleasedSignaturesRequest({ commit }) {
        commit("setLoadingDataReleasedSignatures", true)
        commit("getDataListReleasedSignatures", await api.getDataReleasedSignatures());
        commit("setLoadingDataReleasedSignatures", false)
    }
};

// mutations
const mutations = {
    getDataListContract(state, data) {
        state.dataListContract = data;
    },
    getDataListReleasedSignatures(state, data) {
        state.dataListReleasedSignatures = data;
    },
    setLoadingDataContract(state, status) {
        state.loadingDataContract = status;
    },
    setLoadingDataReleasedSignatures(state, status) {
        state.loadingDataReleasedSignatures = status;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
