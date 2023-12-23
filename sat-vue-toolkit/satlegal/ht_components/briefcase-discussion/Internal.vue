<template>
  <v-row no-gutters>
    <v-col cols="2">
      <AddThreadDiscussion @createTheard="createTheard" :menus="dataThread" />
    </v-col>
    <v-col cols="10">
      <DiscussionThread
        @unlikeReplies="unlikeReplies"
        @likeReplies="likeReplies"
        @like="like"
        @unlike="unlike"
        :items="dataComments"
        :dataMentions="characterMap"
        @addCommentChildrent="addCommentChildrents"
      />
      <div class="elevation-3 mt-1 ml-2">
        <CommentInput
          v-if="characterMap.length > 0"
          :mentions="characterMap"
          @send="send"
          placeholder="Type your comment here... (use @ to mention someone)"
        />
      </div>
    </v-col>
  </v-row>
</template>
<script>
import AddThreadDiscussion from "../left-menus/AddThreadDiscussion";
import DiscussionThread from "../messages/DiscussionThread";
import CommentInput from "../inputs/CommentInput";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    AddThreadDiscussion,
    DiscussionThread,
    CommentInput
  },
  methods: {
    addCommentChildrents(data) {
      this.addCommentChildrent(data);
    },
    send(val) {
      this.addComment(val);
    },
    ...mapActions("ht_store/matter/briefcase/discussionInternal", [
      "getDataThreadRequest",
      "getDataCommentRequest"
    ]),
    ...mapMutations("ht_store/matter/briefcase/discussionInternal", [
      "addThread",
      "likeReply",
      "unlikeReply",
      "likeReplyChildrent",
      "unlikeReplyChildrent",
      "addComment",
      "addCommentChildrent"
    ]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    createTheard(name) {
      this.addThread(name);
    },
    likeReplies(parent, childrent) {
      this.likeReplyChildrent({ parent, childrent });
    },
    unlikeReplies(parent, childrent) {
      this.unlikeReplyChildrent({ parent, childrent });
    },
    like(id) {
      this.likeReply(id);
    },
    unlike(id) {
      this.unlikeReply(id);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/briefcase/discussionInternal", [
      "dataThread",
      "dataComments"
    ]),
    ...mapGetters("ht_store/matter/character", ["character"]),
    characterMap() {
      return (this.character || []).map(x => ({
        id: x.id,
        displayName: (x.avatar || {}).name,
        name: (x.avatar || {}).nickName
      }));
    }
  },
  mounted() {
    this.getDataThreadRequest();
    this.getDataCommentRequest();
    this.getDataCharacterRequest();
  }
};
</script>
