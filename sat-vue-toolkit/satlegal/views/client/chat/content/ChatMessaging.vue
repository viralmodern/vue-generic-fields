<template>
  <v-card class="chat-room fill-height card-message">
    <ToolBarChat
      @archiveMessage="archiveMessage"
      @openMessage="openMessage(chat)"
      @closeMessage="closeMessage(chat)"
    />
    <v-divider></v-divider>
    <ContentMessage
      :messageContent="messageContent"
      :myId="username"
      class="div-content-message"
      @essentialTick="essentialTick"
    />
    <v-card-actions v-if="isStatus === true">
      <NotebookEditor
        placeholder="Type your message here..."
        @change="changeMessage"
        @clearContent="clearContentAnswer = $event"
      />
      <div class="action-send">
        <v-row no-gutters class="justify-space-between">
          <v-btn icon @click="send">
            <v-icon>mdi-send</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-photo</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-face</v-icon>
          </v-btn>
        </v-row>
      </div>
    </v-card-actions>
    <v-col
      style="max-height: 100px"
      cols="12"
      class="justify-center align-center"
      v-else
    >
      <v-divider></v-divider>
      <div class="text-xs-center text-mess">
        You cannot reply to messages right now!
      </div>
    </v-col>
  </v-card>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import ToolBarChat from "./ToolBarChat";
import ContentMessage from "./ContentMessage";
import NotebookEditor from "../../../../ht_components/editor/NotebookEditor";
export default {
  components: {
    ToolBarChat,
    ContentMessage,
    NotebookEditor
  },
  data() {
    return {
      text: "",
      clearContentAnswer: null,
      isStatus: true
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/client/message", ["messageContent"]),
    ...mapState({
      username: ({ user }) => (user.currentUser ? user.currentUser.pk : ""),
      avatar: ({ user }) => (user.currentUser ? user.currentUser.avatar : null)
    })
  },
  methods: {
    ...mapActions("ht_store/workspace/client/message", [
      "sendNewMessage",
      "essentialTick",
      "archiveMessage",
      "openMessage",
      "closeMessage"
    ]),
    changeMessage(value) {
      this.text = value;
    },
    send() {
      const data = {
        content: { text: this.text },
        chat_room: this.$route.params.uuid,
        created: new Date().toISOString(),
        isTick: false,
        modified: null,
        pk: "",
        sender: this.username
      };
      if (this.text.length > 0) {
        this.sendNewMessage(data);
      }
      this.text = "";
      if (this.clearContentAnswer) {
        this.clearContentAnswer();
      }
    }
  },
  watch: {
    $route(val) {
      if (val && this.clearContentAnswer) {
        this.clearContentAnswer();
      }
    }
  }
};
</script>
<style scoped>
.card-message {
  display: flex;
  flex-direction: column;
}
.div-content-message {
  overflow-y: scroll;
  height: calc(100% - 148px) !important;
}
.action-send {
  position: absolute;
  bottom: 15px;
  right: 15px;
}
.text-mess {
  margin-top: 45px;
}
</style>
