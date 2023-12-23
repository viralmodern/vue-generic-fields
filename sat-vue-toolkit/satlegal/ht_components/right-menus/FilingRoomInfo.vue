<template>
  <v-row no-gutters class="overflow-y-auto">
    <div>
      <v-container class="pa-2">
        <v-row align-center no-gutters>
          <h2>Title</h2>
          <v-spacer></v-spacer>
          <v-btn to="filing-room/1" class="ma-0" icon @click="$emit('close')">
            <v-icon color="primary">mdi-launch</v-icon>
          </v-btn>
          <v-btn class="ma-0" icon @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </div>
    <v-divider></v-divider>
    <v-tabs class="overflow-y-auto d-flex" grow v-model="active">
      <v-tab key="detail" ripple>Detail</v-tab>
      <v-tab key="version" ripple>Version</v-tab>
      <v-tab key="discussion" ripple>Discussion</v-tab>
      <v-tab-item key="detail">
        <FillingRoomDetail
          :dataDetailList="dataDetailList"
          :dataPolicyLifecycle="dataPolicyLifecycle"
          :loadingPolicyLifecycle="loadingPolicyLifecycle"
          :dataPeopelWorking="dataPeopelWorking"
          :dataAttachment="dataAttachment"
        />
      </v-tab-item>
      <v-tab-item key="version">
        <v-row fill-height no-gutters>
          <v-col class="overflow-y-auto">
            <UserActivity
              v-for="item in version"
              :key="item.id"
              :action="item.action"
              :executor="item.executor"
              :executedDate="item.executedDate"
              :destinationObject="item.destinationObject"
            />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item key="discussion">
        <v-row fill-height no-gutters>
          <v-col class="overflow-y-auto">
            <UserMessage
              v-for="comment in comments"
              :key="comment.id"
              :user="comment.user"
              :userOnlineStatus="comment.userOnlineStatus"
              :comment="comment.comment"
              :commentDate="comment.commentDate"
              :mentions="comment.mentions"
            />
          </v-col>
          <div class="elevation-3 mt-1">
            <CommentInput
              v-if="availableMentions.length > 0"
              :mentions="availableMentions"
              @send="addComment"
              placeholder="Type your comment here... (use @ to mention someone)"
            />
          </div>
        </v-row>
      </v-tab-item>
    </v-tabs>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import UserMessage from "../cards/UserMessage";
import CommentInput from "../inputs/CommentInput";
import UserActivity from "../cards/UserActivity";
import FillingRoomDetail from "../cards/FillingRoomDetail";
export default {
  components: {
    UserMessage,
    CommentInput,
    UserActivity,
    FillingRoomDetail
  },
  data() {
    return {
      active: null
    };
  },
  mounted() {
    this.getComments();
    this.getAvailableMentions();
    this.getVersionRequest();
    this.getDataDetailListRequest();
    this.getDataPolicyLifecycleRequest();
    this.getDataPeopelWorkingRequest();
    this.getDataAttachmentRequest();
  },
  computed: {
    ...mapGetters("ht_store/project/filing/comment", ["comments", "availableMentions"]),
    ...mapGetters("ht_store/project/filing/version", ["version"]),
    ...mapGetters("ht_store/project/policy", ["dataDetailList"]),
    ...mapGetters("ht_store/project/policy/lifeCycle", [
      "dataPolicyLifecycle",
      "loadingPolicyLifecycle"
    ]),
    ...mapGetters("ht_store/project/document", ["dataPeopelWorking", "dataAttachment"])
  },
  methods: {
    ...mapActions("ht_store/project/filing/comment", [
      "getComments",
      "getAvailableMentions",
      "addComment"
    ]),
    ...mapActions("ht_store/project/filing/version", ["getVersionRequest"]),
    ...mapActions("ht_store/project/policy", ["getDataDetailListRequest"]),
    ...mapActions("ht_store/project/policy/lifeCycle", [
      "getDataPolicyLifecycleRequest"
    ]),
    ...mapActions("ht_store/project/document", [
      "getDataPeopelWorkingRequest",
      "getDataAttachmentRequest"
    ])
  }
};
</script>

<style scoped>
.overflow-y-auto,
.overflow-y-auto /deep/ .v-window,
.overflow-y-auto /deep/ .v-window .v-window__container,
.overflow-y-auto /deep/ .v-window .v-window__container .v-window-item {
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column;
  height: 100%;
}
.overflow-y-auto /deep/ .v-window,
.overflow-y-auto /deep/ .v-window .v-window__container,
.overflow-y-auto /deep/ .v-window .v-window__container .v-window-item {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
</style>
