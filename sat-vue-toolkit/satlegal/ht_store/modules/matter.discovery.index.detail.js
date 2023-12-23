import api from "../../api/matter.discovery.index.detail";
import comment from "./matter.discovery.index.detail.comment";
import checklist from "./matter.discovery.index.detail.checklist";
import note from "./matter.discovery.index.detail.note";
import tag from "./matter.discovery.index.detail.tag";
import attachment from "./matter.discovery.index.detail.attachment";

const state = {
  dataIndexDetail: {}
}

const getters = {
  dataIndexDetail: state => state.dataIndexDetail
}

const actions = {
  async getDataIndexDetail({ commit }, id) {
    commit("getDataIndexDetail", await api.getDataIndexDetail(id))
  },
  async updateIndexDetail({ commit }, data) {
    const result = await api.updateIndexDetail(data);
    commit("updateIndexDetail", result);
    return result;
  },
  async updateTaskIndexDocument({ commit }, data) {
    commit("updateTaskIndexDocument", data)
  },
  async updateTaskPhoto({ commit }, data) {
    commit("updateTaskPhoto", data)
  },
  async addItemTerminology({ commit }, data) {
    commit("addItemTerminology", data, await api.addItemTerminology(data))
  },
  async addSupportRequest({ commit }, data) {
    commit("addSupportRequest", data, await api.addSupportRequest(data))
  },
  async addSubItemInTabel({ commit }, data) {
    commit("addSubItemInTabel", data, await api.addSubItemInTabel(data))
  },
  async updateTaskHightLight({ commit }, data) {
    commit("updateTaskHightLight", data)
  },
  async addItemPhotoRequest({ commit }, data) {
    commit("addItemPhotoRequest", data, await api.addItemPhotoRequest(data))
  },
  async addSubPhotoInTabel({ commit }, data) {
    commit("addSubPhotoInTabel", data, await api.addSubPhotoInTabel(data))
  },
  async deleteItemAudio({ commit }, obj) {
    commit("deleteItemAudio", obj, await api.deleteItemAudio(obj))
  },
  async selectColor({ commit }, obj) {
    commit("selectColor", obj, await api.changeColor(obj))
  },
  updateAudioText({ commit }, obj) {
    commit("updateAudioText", obj, api.updateAudio(obj))
  },
  async createNewAudioText({ commit }, obj) {
    commit("createNewAudioText", obj, await api.createNewAudioText(obj))
  },
  changeTimeStart({ commit }, obj) {
    commit("changeTimeStart", obj)
  },
  async changeTimeEnd({ commit }, obj) {
    commit("changeTimeEnd", obj)
  }
}

const mutations = {
  changeTimeStart(state, data) {
    var index = state.dataIndexDetail.indexDetail.audioDetail.filter(x => x.id === data.id)[0]
    index.timeFrom = data.timeFrom
  },
  changeTimeEnd(state, data) {
    var index = state.dataIndexDetail.indexDetail.audioDetail.filter(x => x.id === data.id)[0]
    index.timeEnd = data.timeEnd
  },
  createNewAudioText(state, obj) {
    state.dataIndexDetail.indexDetail.audioDetail = [...state.dataIndexDetail.indexDetail.audioDetail, obj]
  },
  deleteItemAudio(state, obj) {
    state.dataIndexDetail.indexDetail.audioDetail = state.dataIndexDetail.indexDetail.audioDetail.filter(x => x.id !== obj.id)
  },
  selectColor(state, data) {
    var index = state.dataIndexDetail.indexDetail.audioDetail.filter(x => x.id === data.items.id)[0]
    index.color = data.color.id
  },
  updateAudioText(state, data) {
    var index = state.dataIndexDetail.indexDetail.audioDetail.filter(x => x.id === data.e.id)[0]
    index.text = data.v
  },
  updateTaskHightLight(state, data) {
    const task = state.dataIndexDetail.indexDetail.hightLight.find(
      x => x.id === data.expanId
    ).support.find(y => y.id === data.idGroup).list.find(z => z.id === data.id)
    switch (data.columnName) {
      case "name":
        task.name = data.name
        break;
      case "progress":
        task.progress = data.newValue
        break;
      case "strength":
        task.strength = data.newValue
        break
      case "character":
        if (data.type === "add") {
          task.characters = [...task.characters, data.newValue]
        } else if (data.type === "remove") {
          task.characters = task.characters.filter(x => x !== data.newValue)
        }
        break;
      case "action":
        var action = state.dataIndexDetail.indexDetail.hightLight.find(
          x => x.id === data.expanId
        ).support.find(y => y.id === data.idGroup)
        action.list = action.list.filter(z => z.id !== data.id)
        break
    }
  },
  updateTaskPhoto(state, data) {
    const task = state.dataIndexDetail.indexDetail.happened.find(
      x => x.id === data.expanId
    ).support.find(y => y.id === data.idGroup).list.find(z => z.id === data.id)
    switch (data.columnName) {
      case "name":
        task.name = data.name
        break;
      case "progress":
        task.progress = data.newValue
        break;
      case "strength":
        task.strength = data.newValue
        break
      case "character":
        if (data.type === "add") {
          task.characters = [...task.characters, data.newValue]
        } else if (data.type === "remove") {
          task.characters = task.characters.filter(x => x !== data.newValue)
        }
        break;
      case "action":
        var action = state.dataIndexDetail.indexDetail.happened.find(
          x => x.id === data.expanId
        ).support.find(y => y.id === data.idGroup)
        action.list = action.list.filter(z => z.id !== data.id)
        break
    }
  },
  addSupportRequest(state, o) {
    state.dataIndexDetail.indexDetail.hightLight.find(x => x.id === o.expanId).support.push(o.data)
  },
  addSubItemInTabel(state, o) {
    state.dataIndexDetail.indexDetail.hightLight.find(
      x => x.id === o.expanId
    ).support.find(x => x.id === o.idGroup).list.push(o.data)
  },
  addItemPhotoRequest(state, o) {
    state.dataIndexDetail.indexDetail.happened.find(x => x.id === o.expanId).support.push(o.data)
  },
  addSubPhotoInTabel(state, o) {
    state.dataIndexDetail.indexDetail.happened.find(
      x => x.id === o.expanId
    ).support.find(x => x.id === o.idGroup).list.push(o.data)
  },
  getDataIndexDetail(state, dataIndexDetail) {
    state.dataIndexDetail = dataIndexDetail
  },
  addItemTerminology(state, data) {
    state.dataIndexDetail.indexDetail.terminology = [...state.dataIndexDetail.indexDetail.terminology, data]
  },
  updateIndexDetail(state, data) {
    state.dataIndexDetail = { ...state.dataIndexDetail, ...data };
  },
  updateTaskIndexDocument(state, data) {
    const task = state.dataIndexDetail.indexDetail.terminology.find(
      x => x.id === data.taskId
    );
    switch (data.columnName) {
      case "terms":
        task.terms = data.newValue;
        break;
      case "definitions":
        task.definitions = data.newValue;
        break;
      case "actions":
        var taskArr = state.dataIndexDetail.indexDetail.terminology
        state.dataIndexDetail.indexDetail.terminology = taskArr.filter(x => x.id !== data.taskId);
        break;
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    comment,
    checklist,
    note,
    tag,
    attachment
  }
}
