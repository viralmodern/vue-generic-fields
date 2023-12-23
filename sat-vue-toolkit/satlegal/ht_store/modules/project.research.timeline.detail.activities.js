import api from "../../api/project.research.timeline.detail.activities";

const state = {
  dataActivities: [],
  dataAttachment: [],
  comments: [],
  notes: []
};

const getters = {
  dataActivities: state => state.dataActivities,
  comments: state => state.comments,
  notes: state => state.notes,
  dataAttachment: state => {
    return state.dataAttachment.map(x => ({
      ...x,
      id: x.pk,
      file: x.file || x.link
    }))
  }
};

const actions = {
  async getDataActivitiesRequest({ commit }, { matterId, timelineId }) {
    const result = await api.getDataActivities({ matterId, timelineId });
    commit("getDataActivities", result);
    return result;
  },
  async addActivityTimelineRequest({ commit }, data) {
    const result = await api.addActivityTimeline(data);
    commit("addActivityTimeline", result);
    return result;
  },
  async deleteItemActivityTimelineRequest({ commit }, data) {
    const result = await api.deleteItemActivityTimeline(data);
    commit("deleteItemActivityTimeline", data.id);
    return result;
  },
  async updateDataActivitiesRequest({ commit }, data) {
    const result = await api.updateDataActivities(data);
    commit("updateDataActivities", result);
    return result;
  },
  async addCharacter({ commit }, req) {
    const result = await api.addCharacter(req);
    commit("addCharacter", { result, req });
    return result;
  },
  async removeCharacter({ commit }, req) {
    const result = await api.removeCharacter(req);
    commit("removeCharacter", { result, req });
    return result;
  },
  //Tags
  async addTags({ commit }, req) {
    const result = await api.addTagsActivities(req);
    commit("addTags", { result, req });
  },
  async removeTags({ commit }, req) {
    const result = await api.removeTagsActivities(req);
    commit("removeTags", { req, result });
  },
  // attachment
  async getAttachmentsTimeLine({ commit }, req) {
    const result = await api.getAttachmentsTimeLine(req);
    commit("getAttachmentsTimeLine", result);
  },
  async postAttachmentTimeLine({ commit }, req) {
    const result = await api.postAttachmentTimeLine(req);
    commit("postAttachmentTimeLine", result);
  },
  async removeAttachmentTimeLine({ commit }, req) {
    await api.removeAttachmentTimeLine(req);
    commit("removeAttachmentTimeLine", req);
  },
  //comments
  async getCommentTimeLine({ commit }, req) {
    const result = await api.getCommentTimeLine(req);
    commit("getCommentTimeLine", result);
  },
  async postCommentTimeLine({ commit }, req) {
    const result = await api.postCommentTimeLine(req);
    commit("postCommentTimeLine", result);
  },
  // Notes
  async getDataNote({ commit }, request) {
    commit("getDataNote", await api.getDataNote(request));
  },
  async createNote({ commit }, request) {
    commit("createNote", await api.createNote(request));
  },
  async editNote({ commit }, request) {
    commit("editNote", await api.editNote(request));
  },
  async deleteNote({ commit }, request) {
    await api.deleteNote(request)
    commit("deleteNote", request.noteId);
  }
};

const mutations = {
  getDataActivities(state, data) {
    state.dataActivities = data;
  },
  updateDataActivities(state, data) {
    state.dataActivities = state.dataActivities.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  addCharacter(state, resp) {
    state.dataActivities = state.dataActivities.map(x => {
      if (x.pk === resp.req.activitiesId) {
        return { ...x, characters: [...x.characters, ...resp.result.characters] }
      }
      return x;
    })
  },
  removeCharacter(state, resp) {
    state.dataActivities = state.dataActivities.map(x => {
      if (x.pk === resp.req.activitiesId) {
        return { ...x, characters: x.characters.filter(x => x.pk !== resp.req.characters_id) }
      }
      return x;
    })
  },
  addActivityTimeline(state, data) {
    state.dataActivities.push(data);
  },
  deleteItemActivityTimeline(state, id) {
    state.dataActivities = state.dataActivities.filter(x => x.pk !== id);
  },
  // tags
  addTags(state, resp) {
    state.dataActivities = state.dataActivities.map(x => {
      if (x.pk === resp.req.activitiesId) {
        return { ...x, tags: [...x.tags, ...resp.result.tags] }
      }
      return x;
    })
  },
  removeTags(state, resp) {
    state.dataActivities = state.dataActivities.map(x => {
      if (x.pk === resp.req.activitiesId) {
        return { ...x, tags: x.tags.filter(x => x.pk !== resp.req.tagId) }
      }
      return x;
    })
  },
  // comments
  getCommentTimeLine(state, resp) {
    state.comments = resp;
  },
  postCommentTimeLine(state, resp) {
    state.comments = [resp, ...state.comments];
  },
  // Attachment
  getAttachmentsTimeLine(state, resp) {
    state.dataAttachment = resp;
  },
  postAttachmentTimeLine(state, resp) {
    state.dataAttachment = [...resp.attachments, ...state.dataAttachment];
  },
  removeAttachmentTimeLine(state, resp) {
    state.dataAttachment = state.dataAttachment.filter(x => x.pk !== resp.attachmentsId)
  },
  // Notes
  getDataNote(state, result) {
    state.notes = result;
  },
  createNote(state, data) {
    state.notes = [...state.notes, data];
  },
  editNote(state, data) {
    let item = state.notes.find(x => x.pk === data.pk);
    item.content = data.content;
    item.title = data.title;
  },
  deleteNote(state, noteId) {
    state.notes = state.notes.filter(x => x.pk !== noteId);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
