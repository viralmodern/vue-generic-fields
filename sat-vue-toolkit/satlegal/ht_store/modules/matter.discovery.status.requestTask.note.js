import api from "../../api/matter.request-task.note";
import {$$STORE_PREFIX} from "../../utils";

const state = {
  notes: [],
  totalNotes: 0
}

const getters = {
  notes: (state, _, __, rootGetter) => {
    const members = rootGetter["ht_store/project/members/members"];
    return state.notes.map(note => {
      const users = members.find(user => user.id === note.creator);
      return {
        ...note,
        content: note.text || "",
        avatar: users.avatar.imageUrl,
        peopleWrite: users.name,
        createdAt: note.created,
        id: note.pk
      }
    })
  },
  totalNotes: state => state.totalNotes
}

const actions = {
  async getNotesRequestSets({ commit }, params) {
    commit("getNotesRequestSets", await api.getNotesRequestSets(params));
  },
  async addNotesRequest({ commit }, params) {
    commit("addNotesRequest", await api.addNotesRequest(params));
  },
  async removeNotesRequest({ commit }, params) {
    commit("removeNotesRequest", params, await api.removeNotesRequest(params));
  },
  async updateNotesRequest({ commit }, params) {
    commit("updateNotesRequest", await api.updateNotesRequest(params));
  }
}

const mutations = {
  getNotesRequestSets(state, notes) {
    state.notes = notes.results;
    state.totalNotes = notes.count;
  },
  addNotesRequest(state, results) {
    state.notes = [...state.notes, results];
  },
  removeNotesRequest(state, params) {
    state.notes = state.notes.filter(x => x.pk !== params.id);
  },
  updateNotesRequest(state, params) {
    state.notes = state.notes.map(x => {
      if (x.pk === params.pk) {
        return {
          ...x,
          ...params
        }
      }
      return x;
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
