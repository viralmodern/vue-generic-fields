import api from "../../api/matter.hearing";
import checklist from "./matter.hearing.checklist";
import note from "./matter.hearing.note";
import attachment from "./matter.hearing.attachment";
import analysis from "./matter.hearing.analysis";

let update;

const state = {
  dataMatterHearing: []
};

const getters = {
  dataMatterHearing: state => state.dataMatterHearing
};

const actions = {
  async getDataMatterHearingRequest({ commit }) {
    commit("getDataMatterHearing", await api.getDataMatterHearing());
  },
  async createMatterHearingRequest({ commit }, data) {
    commit("createMatterHearing", await api.createMatterHearing(data));
  },
  async updateMatterHearingRequest({ commit }, data) {
    clearTimeout(update);
    update = setTimeout(async () => {
      commit("updateMatterHearing", await api.updateMatterHearing(data));
    }, 1500);
  },
  async addTaskMatterHearing({ commit }, data) {
    commit("addTaskMatterHearing", await api.addTaskMatterHearing(data));
  }
};

const mutations = {
  getDataMatterHearing(state, data) {
    state.dataMatterHearing = data;
  },
  createMatterHearing(state, data) {
    state.dataMatterHearing.unshift(data);
  },
  updateMatterHearing(state, data) {
    state.dataMatterHearing = state.dataMatterHearing.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  // analysis
  moveRows(state, { id, moveResult }) {
    const matterHearing = state.dataMatterHearing.find(x => x.id === id);
    matterHearing.analysis.highlight = [...moveResult];
  },
  addTaskMatterHearing(state, data) {
    let index = state.dataMatterHearing.findIndex(
      x => x.id === data.oldItem.id
    );
    let newItemOfTable = state.dataMatterHearing[index];
    newItemOfTable.analysis.highlight = [
      ...newItemOfTable.analysis.highlight,
      data.newItem
    ];
  },
  changeItemAnalysis(state, data) {
    let index = state.dataMatterHearing.findIndex(
      x => x.id === data.itemAnalysis.id
    );
    let indexItemTime = state.dataMatterHearing[index].analysis.highlight;
    let result = indexItemTime.find(x => x.id === data.dataRow.id);
    switch (data.type) {
      case "Time":
        result.time = data.time;
        break;
      case "Transcript":
        result.transcript = Number(data.transcript);
        break;
      case "Objection":
        result.objection = data.objection;
        break;
      case "Favorable":
        result.favorable = data.newValue;
        break;
    }
  },
  // Assessment
  updateTextAssessment(state, {id, text}) {
    const matterHearing = state.dataMatterHearing.find(x => x.id === id);
    matterHearing.analysis.assessment = text
  },
  // checklist
  addGroupChecklist(state, { id, groupName }) {
    const matterHearing = state.dataMatterHearing.find(x => x.id === id);
    matterHearing.checklist.push({
      id: Math.random(),
      groupName,
      list: []
    });
  },
  removeGroupChecklist(state, { id, idChecklist }) {
    const matterHearing = state.dataMatterHearing.find(x => x.id === id);
    matterHearing.checklist = matterHearing.checklist.filter(
      x => x.id !== idChecklist
    );
  },
  addItemInGroupChecklist(state, { id, name }) {
    const matterHearing = state.dataMatterHearing.find(x => x.id === id);
    matterHearing.checklist
      .find(x => x.id === name.groupId)
      .list.push({
        id: Math.random(),
        name: name.name,
        status: false
      });
  },
  removeItemInGroupChecklist(state, { id, data }) {
    const matterHearing = state.dataMatterHearing.find(x => x.id === id);
    let findOneAndRemove = matterHearing.checklist.find(
      x => x.id === data.groupId
    );
    findOneAndRemove.list = findOneAndRemove.list.filter(x => x.id !== data.id);
  },
  updateItemInGroupChecklist(state, { id, data }) {
    const matterHearing = state.dataMatterHearing.find(x => x.id === id);
    let findOneAndRemove = matterHearing.checklist.find(
      x => x.id === data.groupId
    );
    findOneAndRemove.list.find(x => x.id === data.id).name = data.name;
  },
  checkItem(state, { id, data }) {
    const matterHearing = state.dataMatterHearing.find(x => x.id === id);
    let findOneAndUpdate = matterHearing.checklist.find(
      x => x.id === data.groupId
    );
    findOneAndUpdate.list.find(x => x.id === data.id).status = data.status;
  },
  // note
  createNote(state, { id, data }) {
    const matterHearing = state.dataMatterHearing.find(x => x.id === id);
    matterHearing.notes.unshift(data);
  },
  editNote(state, { id, data }) {
    const matterHearing = state.dataMatterHearing.find(x => x.id === id);
    let note = matterHearing.notes.find(x => x.id === data.id);
    note.title = data.title;
    note.content = data.content;
  },
  removeNote(state, { id, idNote }) {
    const matterHearing = state.dataMatterHearing.find(x => x.id === id);
    matterHearing.notes = matterHearing.notes.filter(x => x.id !== idNote);
  },
  // attachment
  deleteFile(state, { id, idAttachment }) {
    const matterHearing = state.dataMatterHearing.find(x => x.id === id);
    matterHearing.attachment = matterHearing.attachment.filter(
      x => x.id !== idAttachment
    );
  },
  uploadFile(state, { id, files }) {
    const matterHearing = state.dataMatterHearing.find(x => x.id === id);
    matterHearing.attachment = [...matterHearing.attachment, ...files];
  },
  updateRateFile(state, { id, idAttachment }) {
    const matterHearing = state.dataMatterHearing.find(x => x.id === id);
    matterHearing.attachment = matterHearing.attachment.map(x => {
      if (x.id === idAttachment) {
        return { ...x, rate: !x.rate };
      } else return x;
    });
  },
  deleteTaskMatterHearing(state, data) {
    let index = state.dataMatterHearing.find(x => x.id === data.parent);
    index.analysis.highlight = index.analysis.highlight.filter(
      x => x.id !== data.childrent
    );
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    checklist,
    note,
    attachment,
    analysis
  }
};
