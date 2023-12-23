<template>
  <td>
    <a href="#" @click="showComment(page)">{{ dataRow.comments.length }} comment(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card>
        <v-card-text>
          <Comment
            :members="members"
            :comments="comments"
            :totalComment="0"
            @pagingComment="showComment"
            @sendComment="sendComments"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Comment from "../discovery-status/request-set/common/Comment";

export default {
  data() {
    return {
      showDialog: false,
      page: 1
    };
  },
  components: {
    Comment
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/project/research/timeline/detail/activities", ["comments"]),
    ...mapGetters("ht_store/workspace/member", ["members"])
  },
  methods: {
    showComment() {
      this.showDialog = true;
      const { timelineId, projectId } = this.$route.params;
      this.getCommentTimeLine({
        matterId: projectId,
        timelineId,
        activitiesId: this.dataRow.id
      });
    },
    sendComments(text) {
      const { timelineId, projectId } = this.$route.params;
      const result = {
        matterId: projectId,
        timelineId,
        activitiesId: this.dataRow.id,
        body: { text }
      };
      if (result) {
        this.postCommentTimeLine(result);
      }
    },
    ...mapActions("ht_store/project/research/timeline/detail/activities", [
      "getCommentTimeLine",
      "postCommentTimeLine",
    ])
  }
};
</script>
