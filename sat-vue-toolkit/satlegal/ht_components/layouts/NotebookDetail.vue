<template>
  <v-row no-gutters>
    <div class="left-resource">
      <LeftMenu />
    </div>
    <v-col class="pl-2">
      <v-card>
        <v-row class="justify-end">
          <v-btn color="primary" @click="openRight('notebook-history')">
            <v-icon>access_time</v-icon>
            <span class="ml-1">history</span>
          </v-btn>
          <v-btn color="success" @click="openRight('notebook-comment')">
            <v-badge right color="error">
              <span slot="badge">2</span>
              <v-icon>chat_bubble_outline</v-icon>
              <span>Comment</span>
            </v-badge>
          </v-btn>
          <v-menu
            style="width: 130px"
            v-model="menu"
            transition="scale-transition"
            offset-y
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <v-btn color="default" v-on="on">
                <span class="text-capitalize">more</span>
                <v-icon class="ml-1">more_horiz</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="isShowPopup = true">
                <v-list-item-title>
                  <v-icon size="18" class="mr-2">delete_outline</v-icon>Delete
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="isShowMember = true">
                <v-list-item-title>
                  <v-icon size="18" class="mr-2">people</v-icon>Members
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
        <ConfirmItem
          :isShowPopup="isShowPopup"
          @remove="deleteNotebook"
          @cancel="isShowPopup = false"
          messageConfirm="Are you sure you want to delete this item?"
        />
        <MembersNotebook :isShowPopup="isShowMember" @cancel="closePopup" />
        <router-view></router-view>
      </v-card>
    </v-col>
    <v-navigation-drawer
      fixed
      :value="rightType === 'notebook-history'"
      right
      clipped
      app
    >
      <v-list dense>
        <v-container class="pa-2">
          <v-row no-gutters class="align-center">
            <v-col grow>
              <h2>Histories</h2>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-progress-linear
          :indeterminate="true"
          height="2"
          v-if="loading"
        ></v-progress-linear>
        <HistoryNotebook
          v-else
          v-for="history in dataHistories"
          :key="history.id"
          :action="history.action"
          :executor="history.executor"
          :executedDate="history.executedDate"
          :destinationObject="history.destinationObject"
        />
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      fixed
      :value="rightType === 'notebook-comment'"
      right
      clipped
      app
    >
      <v-row fill-height no-gutters>
        <v-col class="list-comment elevation-1">
          <v-list dense>
            <v-container class="pa-2">
              <h2>Comments</h2>
            </v-container>
            <NotebookComment
              v-for="comment in dataComment"
              :key="comment.id"
              :user="comment.user"
              :userOnlineStatus="comment.userOnlineStatus"
              :comment="comment.comment"
              :commentDate="comment.commentDate"
              :mentions="comment.mentions"
            />
          </v-list>
        </v-col>
        <div>
          <CommentInput
            v-if="notebookAvailableMentions.length > 0"
            :mentions="notebookAvailableMentions"
            @change="v => (userComment = v)"
            @send="sendComment"
          />
        </div>
      </v-row>
    </v-navigation-drawer>
  </v-row>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import LeftMenu from "./NotebookDetailLeftMenu";
import HistoryNotebook from "../cards/NotebookActivity";
import NotebookComment from "../cards/UserMessage";
import ConfirmItem from "../dialogs/ConfirmItem";
import CommentInput from "../inputs/CommentInput";
import MembersNotebook from "../dialogs/MembersNotebook";

export default {
  components: {
    LeftMenu,
    HistoryNotebook,
    NotebookComment,
    CommentInput,
    ConfirmItem,
    MembersNotebook
  },
  data() {
    return {
      userComment: "",
      menu: false,
      isShowPopup: false,
      item: {},
      isShowMember: false
    };
  },
  methods: {
    ...mapActions("ht_store/noteBook", [
      "getListHistoryNoteRequest",
      "getDataCommentNotebook",
      "getNotebookAvailableMentions",
      "getDetailNotebookRequest"
    ]),
    ...mapMutations("ht_store/layout", ["openRight"]),
    ...mapMutations("ht_store/noteBook", ["removeNotebook"]),
    sendComment() {},
    deleteNotebook() {
      this.removeNotebook(this.$route.params.id);
      this.$router.go(-1);
    },
    closePopup() {
      this.isShowMember = false;
    }
  },
  computed: {
    ...mapGetters("ht_store/noteBook", [
      "dataHistories",
      "loading",
      "dataComment",
      "notebookAvailableMentions",
      "notebookDetail"
    ]),
    ...mapGetters("ht_store/layout", ["rightType"])
  },
  mounted() {
    this.getListHistoryNoteRequest();
    this.getDataCommentNotebook();
    this.getNotebookAvailableMentions();
    this.getDetailNotebookRequest(this.$route.params.id);
  }
};
</script>
<style scoped>
.list-comment {
  overflow-y: auto;
}
.left-resource {
  width: 300px;
}
</style>
