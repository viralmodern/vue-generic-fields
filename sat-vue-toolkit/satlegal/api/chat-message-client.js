import { sleep, get, post } from "./base"

async function getDataChatRoom() {
  const chatRooms = await get("/api/chats/chat-rooms/");
  const resultDataChatRoom = (chatRooms.results || []).map(room => {
    if (room.last_message) {
      return {
        ...room,
        uuidRoom: room.pk,
        tags: [4, 2],
        to: [1, 2],
      }
    } else {
      return {
        ...room,
        last_message: {
          ...room.last_message,
          content: {
            text: ""
          }
        },
        uuidRoom: `${room.pk}`,
        tags: [4, 2],
        to: [1, 2],
      }
    }
  });
  return resultDataChatRoom;
}

async function getChatRoomMessage(roomId) {
  const messageRoom = await get(`/api/chats/chat-rooms/${roomId}/messages/`);
  const results = (messageRoom.results || []).map(mess => {
    if (mess.content.text) {
      return {
        ...mess,
        isTick: true
      }
    }
  });
  return results;
}

async function createNewRoomMessage(data) {
  await sleep();
  return data
}

async function sendNewMessage(params) {
  return await post(`/api/chats/chat-rooms/${params.chat_room}/messages/`, { text: params.content.text })
}

export default {
  getDataChatRoom,
  getChatRoomMessage,
  createNewRoomMessage,
  sendNewMessage
}
