import api from "../../api/project.filing.comment";

const state = {
    comments: [],
    availableMentions: []
};

// getters
const getters = {
    comments: state => state.comments,
    availableMentions: state => state.availableMentions
};

// actions
const actions = {
    async getComments({ commit }, projectId) {
        commit("setLoading", true);
        commit("populateComments", await api.getComments(projectId));
        commit("setLoading", false);
    },
    async addComment(_, comment) {
        await api.postComment(comment);
    },
    async getAvailableMentions({ commit }, projectId) {
        commit("populateAvailableMentions", await api.getAvailableMentions(projectId));
    }
};

// mutations
const mutations = {
    populateComments(state, data) {
        state.comments = data
    },
    populateAvailableMentions(state, data) {
        state.availableMentions = data;
    },
    setLoading(state, status) {
        state.loadingDataFilingRoom = status
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
