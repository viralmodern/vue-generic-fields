<template>
  <v-card>
    <v-row no-gutters class="pa-2">
      <v-col v-for="item in items" :key="item.id" cols="12">
        <TicketDiscussion
          @unlike="unlike"
          @like="like"
          :item="item"
          :avatarSize="40"
          @showCommentInput="showCommentInput(item.id)"
        />
        <v-col cols="12" class="ml-5">
          <span
            v-if="!showReplies[item.id] && item.replies.length > 0"
            @click="showComment(item.id)"
            class="text-caption ml-1 primary--text"
          >
            <v-icon size="16" color="primary">subdirectory_arrow_right</v-icon>
            {{ item.replies.length }} replies
          </span>
          <!-- <span v-else class="text-caption ml-1 text--secondary" @click="hideReplies(item.id)">Hide replies</span> -->
        </v-col>
        <v-col class="elevation-3 mt-1 ml-5" v-if="isShowCommentInput[item.id]">
          <CommentInput
            v-if="dataMentions.length > 0"
            :mentions="dataMentions"
            @send="sendReplyCommentChildrent($event, item.id)"
            placeholder="Type your comment here... (use @ to mention someone)"
          />
        </v-col>
        <v-col
          cols="10"
          class="ml-5"
          v-for="reply in item.replies"
          :key="reply.id"
        >
          <TicketDiscussion
            v-if="showReplies[item.id]"
            @unlike="unlikeReplies(item.id, reply.id)"
            @like="likeReplies(item.id, reply.id)"
            :item="reply"
            :countLike="reply.like.length"
            :hideReply="true"
            class="pa-2"
            :avatarSize="32"
          />
        </v-col>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import TicketDiscussion from "./TicketDiscussion";
import CommentInput from "../inputs/CommentInput";
export default {
  props: {
    items: Array,
    dataMentions: Array
  },
  data() {
    return {
      showReplies: {},
      isShowCommentInput: {}
    };
  },
  components: {
    TicketDiscussion,
    CommentInput
  },
  methods: {
    showCommentInput(id) {
      this.isShowCommentInput = { [id]: true };
    },
    sendReplyCommentChildrent(text, id) {
      const data = {
        id,
        text
      };
      this.$emit("addCommentChildrent", data);
      this.showReplies = { ...this.showReplies, [id]: true };
    },
    like(id) {
      this.$emit("like", id);
    },
    unlike(id) {
      this.$emit("unlike", id);
    },
    likeReplies(parent, childrent) {
      this.$emit("likeReplies", parent, childrent);
    },
    unlikeReplies(parent, childrent) {
      this.$emit("unlikeReplies", parent, childrent);
    },
    showComment(id) {
      this.showReplies = { ...this.showReplies, [id]: true };
    },
    hideReplies(id) {
      this.showReplies = { ...this.showReplies, [id]: false };
    }
  }
};
</script>
<style scoped>
.text-caption {
  cursor: pointer !important;
}
</style>
