<template>
  <v-row  no-gutters>
    <v-col shrink>
      <PrivateMessageRealtimeToolbar @openDialogConfirm="openDialogConfirm"/>
    </v-col>
    <v-col>
      <UserPrivateMessage/>
    </v-col>
    <v-divider></v-divider>
    <v-col>
      <v-col cols="12" v-if="dataPrivateMessageByID[0].isActive" class="text-xs-center mt-5">
        <span class="text--secondary">You cannot answer this conversation</span>
      </v-col>
      <CommentInput v-else :mentions="[]" @change="v=>userComment = v" @send="sendComment"/>
    </v-col>
    <ConfirmLeave
      :isShowPopup="isShowPopup"
      @remove="disableChat"
      @cancel="isShowPopup= false"
      messageConfirm="You will not be able to send and receive message on this group when leaved. Please confirm your action ?"
      title="Confirm leave group"
    />
  </v-row>
</template>

<script>
import PrivateMessageRealtimeToolbar from "../toolbars/PrivateMessageRealtimeToolbar";
import UserPrivateMessage from "../cards/UserPrivateMessage";
import CommentInput from "../inputs/CommentInput";
import ConfirmLeave from "../dialogs/ConfirmLeave";
export default {
  components: {
    PrivateMessageRealtimeToolbar,
    UserPrivateMessage,
    CommentInput,
    ConfirmLeave
  },
  data() {
    return {
      isShowPopup: false,
      typeChat: null,
      isActiveMessage: null
    };
  },
  computed: {
    dataPrivateMessageByID() {
      return this.dataPrivateMessage.filter(data => {
        return data.id == this.$route.params.id;
      });
    }
  },
  methods: {
    scrollToBottom() {
      var container = this.$el.querySelector(".user-message");
      container.scrollTop = container.scrollHeight;
    },
    sendComment() {
      this.scrollToBottom();
    },
    openDialogConfirm(value) {
      this.typeChat = value[0];
      this.isShowPopup = true;
    },
    disableChat() {
      const data = {
        isActive: true,
        id: this.typeChat.id
      };
      this.pushElementActive(data);
      this.isShowPopup = false;
    }
  },
  mounted() {
    this.scrollToBottom();
  }
};
</script>
