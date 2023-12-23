import checklist from "./project.research.facts.detail.checklist";
import scoreCharacter from "./project.research.facts.detail.score.character";
import scoreEvidence from "./project.research.facts.detail.score.evidence";
import feelings from "./project.research.facts.detail.feelings";
const state = {
  dataFactDetail: {}
};

const getters = {
  dataFactDetail: state => state.dataFactDetail
};

const actions = {
  async selectCharacers({ commit }, data) {
    commit("selectCharacers", data);
  },
  async addCharacers({ commit }, data) {
    commit("addCharacers", data);
  },
  async removeIssueRequest({ commit }, data) {
    commit("removeIssue", data);
  },
  async removeTagsDetailRequest({ commit }, data) {
    commit("removeTags", data);
  },
};

const mutations = {
  selectCharacers(state, data) {
    let isSelect = state.dataFactDetail.characters.some(x => x === data.id);
    if (isSelect) {
      state.dataFactDetail.characters = state.dataFactDetail.characters.filter(
        x => x !== data.id
      );
    }
  },
  addCharacers(state, data) {
    state.dataFactDetail.characters = [
      ...state.dataFactDetail.characters,
      data.id
    ];
  },
  removeIssue(state, data) {
    state.dataFactDetail.issue = state.dataFactDetail.issue.filter(
      id => id !== data.value
    );
  },
  // checklist
  addGroupChecklist(state, groupName) {
    state.dataFactDetail.checklist.push({
      id: Math.random(),
      groupName,
      list: []
    });
  },
  removeGroupChecklist(state, idChecklist) {
    state.dataFactDetail.checklist = state.dataFactDetail.checklist.filter(
      x => x.id !== idChecklist
    );
  },
  addItemInGroupChecklist(state, name) {
    state.dataFactDetail.checklist
      .find(x => x.id === name.groupId)
      .list.push({
        id: Math.random(),
        name: name.name,
        status: false
      });
  },
  removeItemInGroupChecklist(state, data) {
    let findOneAndRemove = state.dataFactDetail.checklist.find(
      x => x.id === data.groupId
    );
    findOneAndRemove.list = findOneAndRemove.list.filter(x => x.id !== data.id);
  },
  updateItemInGroupChecklist(state, data) {
    let findOneAndRemove = state.dataFactDetail.checklist.find(
      x => x.id === data.groupId
    );
    findOneAndRemove.list.find(x => x.id === data.id).name = data.name;
  },
  checkItem(state, data) {
    let findOneAndUpdate = state.dataFactDetail.checklist.find(
      x => x.id === data.groupId
    );
    findOneAndUpdate.list.find(x => x.id === data.id).status = data.status;
  },
  // note
  createNote(state, data) {
    state.dataFactDetail.notes.unshift(data);
  },
  editNote(state, data) {
    let note = state.dataFactDetail.notes.find(x => x.id === data.id);
    note.title = data.title;
    note.content = data.content;
  },
  removeNote(state, id) {
    state.dataFactDetail.notes = state.dataFactDetail.notes.filter(
      x => x.id !== id
    );
  },
  // comment
  sendComment(state, data) {
    state.dataFactDetail.comments.unshift(data);
  },
  // attachment
  deleteFile(state, idAttachment) {
    state.dataFactDetail.attachment = state.dataFactDetail.attachment.filter(
      x => x.id !== idAttachment
    );
  },
  uploadFile(state, { files }) {
    state.dataFactDetail.attachment = [
      ...state.dataFactDetail.attachment,
      ...files
    ];
  },
  updateRateFile(state, idAttachment) {
    state.dataFactDetail.attachment = state.dataFactDetail.attachment.map(x => {
      if (x.id === idAttachment) {
        return { ...x, rate: !x.rate };
      } else return x;
    });
  },
  // score
  updateEvidence(state, data) {
    state.dataFactDetail.feelings = state.dataFactDetail.scoreEvidence.map(
      x => {
        if (x.id === data.id) {
          return { ...x, ...data };
        }
        return x;
      }
    );
  },
  updateCharacter(state, data) {
    state.dataFactDetail.scoreCharacter = state.dataFactDetail.scoreCharacter.map(
      x => {
        if (x.id === data.id) {
          return { ...x, ...data };
        }
        return x;
      }
    );
  },
  // tag
  removeTags(state, tagId) {
    state.dataFactDetail.tags = state.dataFactDetail.tags.filter(
      id => id !== tagId
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    checklist,
    scoreCharacter,
    scoreEvidence,
    feelings
  }
};
