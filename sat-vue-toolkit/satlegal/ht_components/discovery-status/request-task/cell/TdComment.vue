<template>
  <td>
    <a href="#" @click="showComment(page)">0 comment(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card>
        <v-card-text>
          <Comment
            :members="members"
            :comments="comments"
            :totalComment="totalComment"
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
import Comment from "../../request-set/common/Comment";

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
    ...mapGetters("ht_store/task/detail/comment", ["dataAvailableMentions"]),
    ...mapGetters("ht_store/matter/discovery/status/requestTask/detail/comments", [
      "comments",
      "totalComment"
    ]),
    ...mapGetters("ht_store/project/members", ["members"])
  },
  methods: {
    showComment(page) {
      this.showDialog = true;
      let matterId = this.$route.params.matter || this.$route.params.projectId;
      let rowId = this.dataRow.request_set;
      const taskId = this.dataRow.pk;
      this.getCommentRequestTask({ matterId, taskId, rowId, page });
    },
    async sendComments(text){
      let matterId = this.$route.params.matter || this.$route.params.projectId;
      let rowId = this.dataRow.request_set;
      const taskId = this.dataRow.pk;
      const result = this.sendComment({ matterId, rowId, taskId, body: { text } });
      if(result){
        this.$emit("update", this.dataRow[this.column.name] + 1);
      }
    },
    ...mapActions("ht_store/matter/discovery/status/requestTask/detail/comments", [
      "sendComment",
      "getCommentRequestTask"
    ])
  }
};
</script>
