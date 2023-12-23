import api from "../../api/chat-message-client";
import {$$STORE_PREFIX} from "../../utils";

const state = {
  chatRoom: [],
  messageContent: []
}

const getters = {
  chatRoom: (state, getters, rootState, rootGetters) => {
    const myId = rootGetters["ht_store/auth/user"];
    const members = rootGetters["ht_store/workspace/member/members"];
    const resultChatRoom = (state.chatRoom || []).map(user => {
      const userSendTo = (user.members || []).find(member => member !== myId.pk);
      const joinMembers = (members || []).filter(member => {
        return user.members.includes(member.id);
      })
      return {
        ...user,
        userSendTo:
          user.chat_room_type === 1 ? (members || []).filter(userST => userSendTo === userST.id) : joinMembers,
        members: joinMembers
      };
    });
    return resultChatRoom
  },
  messageContent: (state, getters, rootState, rootGetters) => {
    const filterRoom = state.messageContent.filter(x => {
      return x !== undefined
    })
    const members = rootGetters["ht_store/workspace/member/members"];
    const messOfRoom = (filterRoom || []).map((room, index) => {
      return {
        ...room,
        sender: (members || []).find(member => member.id === room.sender),
        sort: index
      };
    })
    const results = messOfRoom.sort((a, b) => b.sort - a.sort)
    return results;
  }
}

const actions = {
  async getDataChatRoom({ commit }) {
    commit("getDataChatRoom", await api.getDataChatRoom())
  },
  async getChatRoomMessage({ commit }, roomId) {
    commit("getChatRoomMessage", await api.getChatRoomMessage(roomId))
  },
  async createNewRoomMessage({ commit }, data) {
    commit("createNewRoomMessage", data, await api.createNewRoomMessage(data))
  },
  async sendNewMessage({ commit }, data) {
    commit("sendNewMessage", data, await api.sendNewMessage(data))
  },
  async essentialTick({ commit }, data) {
    commit("essentialTick", data)
  },
  async archiveMessage({ commit }, data) {
    commit("archiveMessage", data)
  },
  async openMessage({ commit }, data) {
    commit("openMessage", data)
  },
  async closeMessage({ commit }, data) {
    commit("closeMessage", data)
  },
}

const mutations = {
  essentialTick(state, data) {
    state.dataChatMessage.messages = state.dataChatMessage.messages.map(x => {
      if (x.uuid === data.uuid) {
        return { ...x, isTick: !x.isTick }
      }
      return x
    })
  },
  getDataChatRoom(state, chatRoom) {
    state.chatRoom = chatRoom
  },
  getChatRoomMessage(state, messageContent) {
    state.messageContent = messageContent;
  },
  createNewRoomMessage(state, data) {
    let roomMessage = {
      chatId: data.uuid,
      created_at: data.created_at,
      text: data.messages[0].text,
      tags: data.tags,
      user: {
        uuid: data.messages[0].user.uuid,
        name: data.messages[0].user.name,
        avatar: data.messages[0].user.avatar
      },
      userId: data.messages[0].userId,
      uuid: data.messages[0].uuid,
    };
    state.dataChatMessage.messages.unshift(roomMessage)
    state.dataChatMessage.groups.unshift(data)
  },
  sendNewMessage(state, newMessage) {
    state.messageContent = [newMessage, ...state.messageContent]
  },
  archiveMessage(state, data) {
    state.dataChatMessage.groups = state.dataChatMessage.groups.filter(x => x.uuid !== data.uuid)
  },
  openMessage(state, data) {
    var index = state.dataChatMessage.groups.find(x => x.uuid === data.uuid);
    index.isStatus = true
  },
  closeMessage(state, data) {
    var index = state.dataChatMessage.groups.find(x => x.uuid === data.uuid);
    index.isStatus = false
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
