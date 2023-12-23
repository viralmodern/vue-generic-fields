<template>
  <v-dialog :value="isShowPopup" @input="closeDialog" width="1000">
    <v-card class="pa-3">
      <HeaderDocumentDetail :item="dataDocumentDetail" @changeStatusRequest="changeStatusRequest" />
      <v-row no-gutters class="mb-2">
        <v-textarea
          hide-details
          auto-grow
          :value="dataDocumentDetail.description"
          @change="changeDescriptionRequest($event)"
          class="mt-3 pa-2 custom-text-field fieldDes"
        ></v-textarea>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" sm="8">
          <v-card class="mr-2 pa-2">
            <span class="subheading font-weight-bold">Waiting for your review</span>
            <FileDocumentDetail
              :attachments="dataDocumentDetail.attachments"
              @changeStatusDocument="changeStatusDocument"
            />
            <span class="subheading font-weight-bold mt-2">Version history</span>
            <v-row no-gutters class="justify-center align-center">
              <v-col cols="12" v-for="(item, index) in historyDocument" :key="index">
                <v-card class="pa-2 ma-1">
                  <DocumentHistoryVersion :item="item" :index="index" />
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card>
            <v-tabs grow>
              <v-tab>ACTIVITY</v-tab>
              <v-tab>COMMENT</v-tab>
              <v-tab-item>
                <v-row fill-height column>
                  <v-col class="overflow-y-auto">
                    <UserActivity
                      v-for="item in dataDocumentDetail.dataHistory"
                      :key="item.id"
                      :action="item.action"
                      :executor="item.executor"
                      :executedDate="item.executedDate"
                      :destinationObject="item.destinationObject"
                    />
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item>
                <v-row fill-height column>
                  <v-col cols="12">
                    <div class="elevation-3 mt-1">
                      <CommentInput
                        v-if="availableMentions.length > 0"
                        :mentions="availableMentions"
                        @send="addComment"
                        placeholder="Type your comment here... (use @ to mention someone)"
                      />
                    </div>
                  </v-col>
                  <v-col class="overflow-y-auto">
                    <UserMessage
                      v-for="comment in dataDocumentDetail.dataComment"
                      :key="comment.id"
                      :user="comment.user"
                      :userOnlineStatus="comment.userOnlineStatus"
                      :comment="comment.comment"
                      :commentDate="comment.commentDate"
                      :mentions="comment.mentions"
                    />
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import HeaderDocumentDetail from "../cards/HeaderDocumentDetail";
import UserActivity from "../cards/UserActivity";
import UserMessage from "../cards/UserMessage";
import CommentInput from "../inputs/CommentInput";
import FileDocumentDetail from "../cards/FileDocumentDetail";
import DocumentHistoryVersion from "../cards/DocumentHistoryVersion";
export default {
  props: {
    isShowPopup: Boolean,
    id: Number
  },
  data() {
    return {};
  },
  components: {
    HeaderDocumentDetail,
    UserActivity,
    UserMessage,
    CommentInput,
    FileDocumentDetail,
    DocumentHistoryVersion
  },
  methods: {
    ...mapActions("ht_store/project/document/detail", [
      "getDataDocumentDetailRequest",
      "getDataDocumentHistoryRequest"
    ]),
    ...mapActions("ht_store/project/filing/comment", ["getAvailableMentions"]),
    ...mapMutations("ht_store/project/document/detail", [
      "addComment",
      "changeStatusAttachment",
      "changeStatusRequest",
      "changeDescriptionRequest"
    ]),
    closeDialog() {
      this.$emit("closeModal");
    },
    changeStatusDocument(data) {
      this.changeStatusAttachment(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/project/document/detail", [
      "dataDocumentDetail",
      "historyDocument"
    ]),
    ...mapGetters("ht_store/project/filing/comment", ["availableMentions"])
  },
  mounted() {
    this.getDataDocumentDetailRequest(1);
    this.getDataDocumentHistoryRequest();
    this.getAvailableMentions();
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.fieldDes {
  background: #eceff1;
}
.theme--dark.fieldDes {
  background: #909090;
}
</style>
