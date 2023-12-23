<template>
  <v-row no-gutters class="fill-height message-layout">
    <v-col cols="4">
      <ChatHistory :chatGroups="chatGroups" />
    </v-col>
    <v-col cols="8">
      <router-view></router-view>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ChatHistory from "./history/ChatHistory";
export default {
  components: {
    ChatHistory
  },
  methods: {
    ...mapActions("ht_store/workspace/client/message", [
      "getDataChatRoom",
      "getChatRoomMessage"
    ]),
    ...mapActions("ht_store/workspace/client", ["getDataClientRequest"]),
    ...mapActions("ht_store/project/research/timeline/detail/activities/tag", [
      "getDataTagsRequest"
    ]),
    redirectRoomChat() {
      this.$router.push({
        name: "ChatMessaging",
        params: { uuid: this.chatRoom && this.chatRoom[0].uuidRoom }
      });
      this.getTheFirstRoom();
    },
    getTheFirstRoom() {
      const room = this.chatRoom && this.chatRoom;
      if (room.length > 0) {
        this.getChatRoomMessage(room[0].uuidRoom);
      }
    }
  },
  computed: {
    ...mapGetters("ht_store/workspace/client/message", ["chatRoom"]),
    ...mapGetters("ht_store/project/research/timeline/detail/activities/tag", ["tags"]),
    chatGroups() {
      return (
        this.chatRoom &&
        this.chatRoom.map(x => {
          return {
            ...x,
            tags: this.tags && this.tags.filter(e => x.tags.includes(e.id))
          };
        })
      );
    }
  },
  mounted() {
    this.getDataTagsRequest();
    this.getDataClientRequest();
    this.getDataChatRoom().then(() => {
      this.redirectRoomChat();
    });
  },
  watch: {
    $route(val) {
      this.getChatRoomMessage(val.params.uuid);
    }
  }
};
</script>
<style scoped>
.message-layout {
  height: calc(100vh - 64px) !important;
}
</style>
