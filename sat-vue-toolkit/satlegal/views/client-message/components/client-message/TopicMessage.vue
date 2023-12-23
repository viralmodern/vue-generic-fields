<template>
  <div>
    <div
      :style="`height: calc(100vh - ${!isEmptyAttachmentForm ? '352.5px' : '192.5px'});`"
      class="wrapper-message pa-3"
      ref="refWrapperMessage"
      @scroll="loadMoreMessage"
    >
      <Sniper :isLoading="isLoadingGetDetail || isLoadingGet" />
      <div class="text-center" v-if="isScrolling">
        <v-progress-circular
          indeterminate
          color="primary"
          :width="3"
          size="20"
        ></v-progress-circular>
      </div>
      <template v-for="message in dataTopicMessage">
        <h4
          :key="message.pk"
          v-if="message.type === 'time'"
          class="caption text-center"
        >
          T2 13:09
        </h4>
        <v-row v-else no-gutters class="flex-nowrap my-1" :key="message.id">
          <div class="mt-1 mr-2" :title="message.user.name">
            <UserAvatar
              v-if="!message.is_mine"
              :name="message.user.name"
              :imageUrl="
                message.user.avatar ? message.user.avatar.imageUrl : ''
              "
              :avatarSize="28"
              :status="true"
            />
          </div>
          <div style="flex: 1 1 auto;">
            <UserMessage
              v-if="message.body"
              :class="`${message.is_mine ? 'message-mine' : ''}`"
              :isShowTitleUserMessage="false"
              :nameUser="message.user.name"
              :commentDate="message.comment_date"
              :content="message.body"
              :isShowActionMore="message.is_mine"
              :isTurnOfSomeAction="['Edit']"
              @onDeleteComment="
                isShowPopupConfirmDelete = true;
                actionDelete.messageId = message.pk;
                actionDelete.isEmptyAttachments = !message.attachments.length;
              "
            />
            <div v-if="message.attachments.length" :class="`my-2 ${message.is_mine ? 'd-flex justify-end' : ''}`">
              <v-card :class="`wrap-attachment ${message.is_mine ? 'attachment-mine' : 'attachment-stranger'}`">
                <v-card-text>
                  <v-row no-gutters :style="message.is_mine">
                    <v-col
                      v-for="attachment in message.attachments"
                      :key="attachment.pk"
                      class="pa-1"
                      cols="6"
                    >
                      <AttachmentItem :imageUrl="attachment.attachment" />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </div>
          </div>
        </v-row>
      </template>
    </div>
    <div class="pa-3" :class="`${!isEmptyAttachmentForm ? 'border-shadow' : ''}`">
      <v-row
        no-gutters
        v-if="!isEmptyAttachmentForm"
        class="list-attachment-local"
        style="height: 160px;overflow: auto;"
      >
        <v-col
          v-for="(item, index) in dataFormTopicMessage.attachments"
          :key="index"
          class="pa-2"
          cols="4"
        >
          <AttachmentItemLocal
            :imageUrl="item.dataURL"
            :name="item.name"
            @clickIconDelete="removeFiles(index)"
          />
        </v-col>
      </v-row>
      <div class="d-flex align-center">
        <div>
          <v-btn @click="isShow = true" small icon color="primary" class="mr-2">
            <v-icon>mdi-attachment</v-icon>
          </v-btn>
        </div>
        <CommentInput
          style="flex: 1 1 auto;"
          ref="refCommentInput"
          :value="dataFormTopicMessage.body"
          :avatarSize="28"
          :mentions="[]"
          :isLoadingSend="isLoadingSendMessageTopic"
          :disabled="isLoadingSendMessageTopic"
          :autoFocusCommentInput="true"
          @send="sendMessageTopic"
          placeholder="Message enter..."
        />
      </div>
      <UploadFile
        ref="refUploadFile"
        :isShow="isShow"
        @closeModal="isShow = false"
        @addFiles="addFilesAttachment"
      />
    </div>
    <ConfirmItem
      :isShowPopup="isShowPopupConfirmDelete"
      @remove="removeMessageTopic"
      :isLoading="isLoadingDelete"
      @cancel="isShowPopupConfirmDelete= false"
      :messageConfirm="messageConfirmDelete"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import UserMessage from "@/sat-vue-toolkit/satlegal/ht_components/common/comment/UserMessage";
import UserAvatar from "@/sat-vue-toolkit/satlegal/ht_components/avatars/UserAvatar";
import CommentInput from "@/sat-vue-toolkit/satlegal/ht_components/inputs/CommentInput";
import AttachmentItem from "@/sat-vue-toolkit/satlegal/ht_components/images/AttachmentItem";
import AttachmentItemLocal from "@/sat-vue-toolkit/satlegal/ht_components/images/AttachmentItemLocal";
import UploadFile from "@/sat-vue-toolkit/satlegal/ht_components/dialogs/UploadFile";
import ConfirmItem from "@/sat-vue-toolkit/satlegal/ht_components/dialogs/ConfirmItem";
import Sniper from "@/sat-vue-toolkit/satlegal/ht_components/common/loadings/Sniper";

export default {
  components: {
    UserMessage,
    UserAvatar,
    CommentInput,
    AttachmentItem,
    AttachmentItemLocal,
    UploadFile,
    ConfirmItem,
    Sniper
  },
  data() {
    return {
      dataFormTopicMessage: {
        body: "",
        attachments: []
      },
      page: 1,
      isLoadingSendMessageTopic: false,
      isScrolling: false,
      isShow: false,
      isShowPopupConfirmDelete: false,
      isLoadingDelete: false,
      actionDelete: {
        messageId: null,
        isEmptyAttachments: false,
      }
    };
  },
  computed: {
    messageConfirmDelete() {
      const message1 = "Are you sure want to delete item?";
      const message2 = "This message contains attachments are you sure want to delete?";
      return this.actionDelete.isEmptyAttachments ? message1 : message2 ;
    },
    isEmptyAttachmentForm() {
      return !this.dataFormTopicMessage.attachments.length;
    },
    ...mapGetters("ht_store/clients/clientMessage/message", [
      "dataTopicMessage",
      "isLoadMoreGetDataTopicMessge",
      "isLoadingGet"
    ]),
    ...mapGetters("ht_store/clients/clientMessage", ["dataClientMessageDetail", "isLoadingGetDetail"])
  },
  methods: {
    async loadMoreMessage(e) {
      if (
        this.isLoadMoreGetDataTopicMessge &&
        e.target.scrollTop <= 20 &&
        !this.isScrolling
      ) {
        this.page++;
        this.isScrolling = true;
        const data = {
          idParams: {
            clientId: this.dataClientMessageDetail.client.pk,
            clientMessageId: this.dataClientMessageDetail.pk
          },
          searchObject: {
            page: this.page
          }
        };
        const element = this.$refs.refWrapperMessage;
        const oldScrollHeight = element.scrollHeight;
        await this.getDataTopicMessageAssignRequest(data);
        this.isScrolling = false;
        this.$nextTick(() => {
          element.scrollTop = element.scrollHeight - oldScrollHeight;
        });
      }
    },

    async sendMessageTopic(text) {
      if(!text && this.isEmptyAttachmentForm) {
        return;
      }
      try {
        this.dataFormTopicMessage.body = text;
        const data = {
          idParams: {
            clientId: this.dataClientMessageDetail.client.pk,
            clientMessageId: this.dataClientMessageDetail.pk
          },
          body: this.dataFormTopicMessage
        };
        this.isLoadingSendMessageTopic = true;
        await this.addTopicMessageRequest(data);
        this.clearCommentInput();
        this.clearDataFormTopicMessge();
        this.isLoadingSendMessageTopic = false;
        this.scrollToBottomMessge();
      } catch (error) {
        this.isLoadingSendMessageTopic = false;
        throw error;
      }
    },

    async removeMessageTopic() {
      const { messageId } = this.actionDelete;
      try {
        const data = {
          clientId: this.dataClientMessageDetail.client.pk,
          clientMessageId: this.dataClientMessageDetail.pk,
          messageId
        };
        await this.removeTopicMessageRequest(data);
      } catch (error) {
        throw error;
      }
    },

    addFilesAttachment(attachments) {
      this.dataFormTopicMessage.attachments = [
        ...this.dataFormTopicMessage.attachments,
        ...attachments
      ];
      this.clearUploadFiles();
    },

    removeFiles(indexFileCurrent) {
      this.dataFormTopicMessage.attachments = this.dataFormTopicMessage.attachments.filter(
        (x, i) => i !== indexFileCurrent
      );
    },

    clearDataFormTopicMessge() {
      this.dataFormTopicMessage = {
        body: "",
        attachments: []
      };
    },
    clearPage() {
      this.page = 1;
    },
    clearCommentInput() {
      return this.$refs.refCommentInput.clearCommentInput();
    },

    scrollToBottomMessge() {
      this.$nextTick(() => {
        const element = this.$refs.refWrapperMessage;
        element.scrollTop = element.scrollHeight;
      });
    },

    clearUploadFiles() {
      this.$refs.refUploadFile.cancel();
    },

    ...mapActions("ht_store/clients/clientMessage/message", [
      "getDataTopicMessageAssignRequest",
      "addTopicMessageRequest",
      "removeTopicMessageRequest"
    ])
  },

  mounted() {
    this.scrollToBottomMessge();
  },

  watch: {
    isLoadingGet(status) {
      if (!status) {
        this.scrollToBottomMessge();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.message-mine {
  >>> .comment__content {
    flex-direction: row-reverse;
    &-text {
      background-color: rgb(0, 132, 255);
      color: #fff;
    }
  }
}
.wrap-attachment {
  width:70%;
}
.attachment-mine {
  border-bottom-right-radius: 25px !important;
  border-top-right-radius: 0px !important;
}
.attachment-stranger{
  border-bottom-left-radius: 25px !important;
  border-top-left-radius: 0px !important;
}
.border-shadow {
  box-shadow: 0 -1px 2px 0 rgba(0, 0, 0, 0.1);
}
.wrapper-message,.list-attachment-local {
  overflow: auto;
}
.wrapper-message::-webkit-scrollbar-track,.list-attachment-local::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}
.wrapper-message::-webkit-scrollbar, .list-attachment-local::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}
.wrapper-message::-webkit-scrollbar-thumb, .list-attachment-local::-webkit-scrollbar-thumb {
  background-color: grey;
}
</style>
