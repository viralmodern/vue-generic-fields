<template>
  <td>
    <Comment
      ref="refComment"
      :totalComments="totalComments"
      :comments="dataComment"
      :members="members"
      :isShowPagination="isShowPaginationComment"
      :totalsPageComment="totalsPageComment"
      :isLoadingAdd="isLoadingAdd"
      :isLoadingGet="isLoadingGet"
      @showModal="getDataComment"
      @sendComment="sendComment"
      updatePagination
    />
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Comment from "../../../../common/Comment";

export default {
  components: {
    Comment
  },
  props: {
    dataRow: Object,
    column: Object,
    matterId: [String, Number],
    depositionId: [String, Number],
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingGet: false,
    }
  },
  computed: {
    totalComments() {
      return this.dataRow.comment.length || 0;
    },
    ...mapGetters("ht_store/task/detail/comment", ["dataAvailableMentions"]),
    ...mapGetters("ht_store/matter/discovery/deposition/preparation/exhibits", [
      "dataComment",
      "countComment",
      "totalsPageComment",
      "isShowPaginationComment",
    ]),
    ...mapGetters("ht_store/project/members", ["members"])
  },
  methods: {
    async getDataComment( query) {
      this.isLoadingGet = true;
      const data = {
        idParams: {
          matterId: this.matterId,
          depositionId: this.depositionId,
          exhibitsId: this.dataRow.id,
        },
        query,
      }
      await this.getDataCommentExhibitsRequest(data);
      this.isLoadingGet = false;
    },
    async sendComment({body, pagination}){
      const data = {
        idParams: {
          matterId: this.matterId,
          depositionId: this.depositionId,
          exhibitsId: this.dataRow.id,
        },
        body,
      }
      this.isLoadingAdd = true;
      await this.addCommentExhibitsRequest(data);
      await this.getDataComment(pagination);
      this.isLoadingAdd = false;

    },
    ...mapActions("ht_store/matter/discovery/deposition/preparation/exhibits", [
      "addCommentExhibitsRequest",
      "getDataCommentExhibitsRequest"
    ])
  }
};
</script>
