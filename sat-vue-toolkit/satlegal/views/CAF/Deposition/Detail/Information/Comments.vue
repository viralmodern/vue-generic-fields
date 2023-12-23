<template>
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
    @onSendComment="onSendComment"
    @onSubmitEditComment="onSubmitEditComment"
    @updatePagination="getDataComment"
    @updateComment="updateComment"
    @onClickLoadmore="loadMoreCommentFeedback"
    @onToggleFeedback="onToggleFeedback"
    @onToggleEditComment="onToggleEditComment"
    @onDeleteComment="onDeleteComment"
  />
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Comment from "@/sat-vue-toolkit/satlegal/ht_components/common/comment/Comment";
import { TYPE_COMMENT, TYPE_FEEDBACK } from "@/sat-vue-toolkit/satlegal/utils/constant";

export default {
  components: {
    Comment
  },
  props: {
    totalComments: Number,
    InfoId: [String, Number],
    detail: Boolean
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingGet: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/deposition/information", [
      "dataComment",
      "countComment",
      "totalsPageComment",
      "isShowPaginationComment",
      "actionCommentFeedback"
    ]),
    ...mapGetters("ht_store/project/members", ["members"])
  },
  methods: {
    async loadMoreCommentFeedback(data) {
      const query = {
        page: data.feedback.length >= 20 ? data.action.page + 1 : 1,
      }
      this.getDataCommentFeedback(data.pk, query);
    },
    async getDataComment(query) {
      try {
        this.isLoadingGet = true;
        const data = {
          idParams: {
            matterId: this.$route.params.matter || this.$route.params.projectId,
            depositionId: this.$route.params.depositionId,
            InfoId: this.InfoId,
            parentId: null
          },
          query
        };
        await this.getDataCommentInfoRequest(data);
        this.isLoadingGet = false;
      } catch (error) {
        this.isLoadingGet = false;
      }
    },
    async getDataCommentFeedback(parentId, query) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          InfoId: this.InfoId,
          parentId
        },
        query
      };
      await this.getDataCommentFeedbackInfoRequest(data);
    },
    onToggleFeedback({ pk, action }) {
      this.updateActionComment({
        pk,
        action: {
          isShowFeedback: !action.isShowFeedback
        }
      });
    },
    onToggleEditComment(payload) {
      const { type, itemComment = {}, itemCommentFeedback = {} } = payload;
      if (type === TYPE_COMMENT) {
        this.updateActionComment({
          pk: itemComment.pk,
          action: {
            isEdit: !itemComment.action.isEdit
          }
        });
        return;
      }
      if (type === TYPE_FEEDBACK) {
        this.updateActionCommentFeedback({
          pk: itemCommentFeedback.pk,
          action: {
            isEdit: !itemCommentFeedback.action.isEdit
          }
        });
        return;
      }
    },
    onSubmitEditComment(payload) {
      const { commentId , commentFeedbackId, text, type } = payload;
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          InfoId: this.InfoId
        },
        body: {
          text
        }
      };
      if (type === TYPE_COMMENT) {
        data.idParams.commentId = commentId;
        this.updateCommentInfoRequest(data);
        return;
      }
      if (type === TYPE_FEEDBACK) {
        data.idParams.commentId = commentFeedbackId;
        this.updateCommentFeedbackInfoRequest(data);
        return;
      }
    },
    onDeleteComment(payload) {
      const { itemComment , itemCommentFeedback, type } = payload;
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        InfoId: this.InfoId,
        parentId: itemComment.pk,
        totalComments: this.totalComments - 1,
        detail: this.detail
      };
      if (type === TYPE_COMMENT) {
        data.commentId = itemComment.pk;
        if(itemComment.child_count) {
          data.totalComments = data.totalComments - itemComment.child_count;
        }
        this.removeCommentInfoRequest(data);
        return;
      }
      if (type === TYPE_FEEDBACK) {
        data.commentId = itemCommentFeedback.pk;
        this.removeCommentFeedbackInfoRequest(data);
        return;
      }
    },
    async onSendComment(payload) {
      const { type, text, commentId = null, pagination } = payload;
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          InfoId: this.InfoId,
          parentId: commentId
        },
        totalComments: this.totalComments + 1,
        body: {
          text
        },
        detail: this.detail
      };
      if (type === TYPE_COMMENT) {
        this.addDataComment(data);
        return;
      }
      if (type === TYPE_FEEDBACK) {
        this.addCommentFeedbackInfoRequest(data);
        return;
      }
    },
    async addDataComment(data) {
      try {
        this.isLoadingAdd = true;
        await this.addCommentInfoRequest(data);
        this.isLoadingAdd = false;
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    async updateComment(data) {},
    ...mapActions("ht_store/matter/deposition/information", [
      // comment
      "getDataCommentInfoRequest",
      "addCommentInfoRequest",
      "updateCommentInfoRequest",
      "removeCommentInfoRequest",
      // comment feedback
      "getDataCommentFeedbackInfoRequest",
      "addCommentFeedbackInfoRequest",
      "updateCommentFeedbackInfoRequest",
      "removeCommentFeedbackInfoRequest",
    ]),
    ...mapMutations("ht_store/matter/deposition/information", [
      "updateActionComment",
      "updateActionCommentFeedback"
    ])
  }
};
</script>
