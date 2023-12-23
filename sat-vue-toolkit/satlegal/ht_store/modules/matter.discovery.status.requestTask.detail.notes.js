import api from "../../api/matter.discovery.status.requestTask.notes";
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
  async getNotesRequestTask({ commit }, params) {
    commit("getNotesRequestTask", await api.getNotesRequestTask(params));
  },
  async addNotesRequest({ commit }, params) {
    const result = await api.addNotesRequest(params);
    commit("addNotesRequest", result);
    return result;
  },
  async removeNotesRequest({ commit }, params) {
    const result = await api.removeNotesRequest(params);
    commit("removeNotesRequest", result);
    return result.id;
  },
  async updateNotesRequest({ commit }, params) {
    const result = await api.updateNotesRequest(params);
    commit("updateNotesRequest", result);
    return result;
  }
}

const mutations = {
  getNotesRequestTask(state, notes) {
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
