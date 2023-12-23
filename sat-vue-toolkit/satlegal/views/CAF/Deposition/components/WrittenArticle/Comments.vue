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
    matterId: [String, Number],
    depositionId: [String, Number],
    keyPleadingId: [String, Number],
    detail: Boolean
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingGet: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/deposition/writtenarticl", [
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
            matterId: this.matterId,
            depositionId: this.depositionId,
            keyPleadingId: this.keyPleadingId,
            parentId: null
          },
          query
        };
        await this.getDataCommentKeyPleadingRequest(data);
        this.isLoadingGet = false;
      } catch (error) {
        this.isLoadingGet = false;
      }
    },
    async getDataCommentFeedback(parentId, query) {
      const data = {
        idParams: {
          matterId: this.matterId,
          depositionId: this.depositionId,
          keyPleadingId: this.keyPleadingId,
          parentId
        },
        query
      };
      await this.getDataCommentFeedbackKeyPleadingRequest(data);
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
          matterId: this.matterId,
          depositionId: this.depositionId,
          keyPleadingId: this.keyPleadingId
        },
        body: {
          text
        }
      };
      if (type === TYPE_COMMENT) {
        data.idParams.commentId = commentId;
        this.updateCommentKeyPleadingRequest(data);
        return;
      }
      if (type === TYPE_FEEDBACK) {
        data.idParams.commentId = commentFeedbackId;
        this.updateCommentFeedbackKeyPleadingRequest(data);
        return;
      }
    },
    onDeleteComment(payload) {
      const { itemComment , itemCommentFeedback, type } = payload;
      const data = {
        matterId: this.matterId,
        depositionId: this.depositionId,
        keyPleadingId: this.keyPleadingId,
        parentId: itemComment.pk,
        totalComments: this.totalComments - 1,
        detail: this.detail
      };
      if (type === TYPE_COMMENT) {
        data.commentId = itemComment.pk;
        if(itemComment.child_count) {
          data.totalComments = data.totalComments - itemComment.child_count;
        }
        this.removeCommentKeyPleadingRequest(data);
        return;
      }
      if (type === TYPE_FEEDBACK) {
        data.commentId = itemCommentFeedback.pk;
        this.removeCommentFeedbackKeyPleadingRequest(data);
        return;
      }
    },
    async onSendComment(payload) {
      const { type, text, commentId = null } = payload;
      const data = {
        idParams: {
          matterId: this.matterId,
          depositionId: this.depositionId,
          keyPleadingId: this.keyPleadingId,
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
        this.addCommentFeedbackKeyPleadingRequest(data);
        return;
      }
    },
    async addDataComment(data) {
      try {
        this.isLoadingAdd = true;
        await this.addCommentKeyPleadingRequest(data);
        this.isLoadingAdd = false;
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    ...mapActions("ht_store/matter/deposition/writtenarticl", [
      // comment
      "getDataCommentKeyPleadingRequest",
      "addCommentKeyPleadingRequest",
      "updateCommentKeyPleadingRequest",
      "removeCommentKeyPleadingRequest",
      // comment feedback
      "getDataCommentFeedbackKeyPleadingRequest",
      "addCommentFeedbackKeyPleadingRequest",
      "updateCommentFeedbackKeyPleadingRequest",
      "removeCommentFeedbackKeyPleadingRequest",
    ]),
    ...mapMutations("ht_store/matter/deposition/writtenarticl", [
      "updateActionComment",
      "updateActionCommentFeedback"
    ])
  }
};
</script>
