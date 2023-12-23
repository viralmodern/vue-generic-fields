<template>
  <v-row no-gutters>
    <v-col cols="12" class="mb-1">
      <UserCommentInput
        class="mb-2 user-comment-input"
        :currentUser="currentUser"
        :avatarSize="32"
        :mentions="mentions"
        :isLoadingSend="isLoadingAdd"
        :isShowCancel="false"
        :disabled="isLoadingAdd"
        :autoFocusCommentInput="true"
        @send="$emit('onSendComment', { type: typeComment, text: $event })"
        placeholder="Insert your comment here... (use @ to tag someone)"
      />
    </v-col>
    <v-col cols="12">
      <v-progress-linear
        v-if="isLoadingGet"
        color="primary"
        class="my-4"
        indeterminate
        rounded
        height="3"
      ></v-progress-linear>
      <div class="text-center py-2" v-else-if="!comments.length">
        (No comment)
      </div>
      <CommentItem
        v-else
        v-for="(item, index) in comments"
        :key="index"
        :user="item.user"
        :userOnlineStatus="item.userOnlineStatus"
        :comment="item.text"
        :commentDate="item.created"
        :mentions="mentions"
        :avatarSize="32"
        :currentUser="currentUser"
        :feedback="item.feedback"
        :isShowReplyAndFeedback="item.action.isShowFeedback"
        :isCallApi="item.action.isCallApi"
        :countFeedback="item.child_count"
        :isLoadingFeedback="item.action.loading"
        :isShowActionReply="true"
        :isShowActionMore="currentUser.pk === item.user.id"
        :isShowEditComment="item.action.isEdit"
        :isLoadingUpdateComment="item.action.loadingUpdate"
        @onOpenFeedback="$emit('onClickLoadmore', item)"
        @onToggleFeedback="
          $emit('onToggleFeedback', { pk: item.pk, action: item.action })
        "
        @onReply="$emit('onClickLoadmore', item)"
        @onClickLoadmore="$emit('onClickLoadmore', item)"
        @onSubmitEditComment="
          $emit('onSubmitEditComment', {
            commentId: item.pk,
            type: typeComment,
            text: $event
          })
        "
        @onToggleEditComment="
          $emit('onToggleEditComment', { type: typeComment, itemComment: item })
        "
        @onDeleteComment="
          $emit('onDeleteComment', { type: typeComment, itemComment: item })
        "
      >
        <template v-slot:childComment>
          <div v-if="item.action.isShowFeedback">
            <div>
              <UserCommentInput
                class="mb-2 comment-item__input"
                :isShowCancel="false"
                :avatarSize="28"
                :currentUser="currentUser"
                :mentions="mentions"
                :isLoadingSend="item.action.loadingAdd"
                :disabled="item.action.loadingAdd"
                :autoFocusCommentInput="true"
                @send="
                  $emit('onSendComment', {
                    type: typeFeedback,
                    commentId: item.pk,
                    text: $event
                  })
                "
                placeholder="Insert your comment here... (use @ to tag someone)"
              />
            </div>
            <CommentItem
              v-for="item2 in item.feedback"
              :key="item2.pk"
              :user="item2.user"
              :userOnlineStatus="item2.userOnlineStatus"
              :comment="item2.text"
              :commentDate="item2.created"
              :mentions="mentions"
              :avatarSize="32"
              :currentUser="currentUser"
              :isLoadingAdd="item2.action.loadingAdd"
              :isShowActionMore="currentUser.pk === item2.user.id"
              :isShowEditComment="item2.action.isEdit"
              :isLoadingUpdateComment="item2.action.loadingUpdate"
              @onSubmitEditComment="
                $emit('onSubmitEditComment', {
                  commentId: item.pk,
                  commentFeedbackId: item2.pk,
                  type: typeFeedback,
                  text: $event
                })
              "
              @onToggleEditComment="
                $emit('onToggleEditComment', { type: typeFeedback, itemComment: item, itemCommentFeedback: item2 })
              "
              @onDeleteComment="
                $emit('onDeleteComment', { type: typeFeedback, itemComment: item, itemCommentFeedback: item2 })
              "
            />
          </div>
        </template>
      </CommentItem>
    </v-col>
  </v-row>
</template>

<script>
import UserCommentInput from "../../inputs/UserCommentInput";
import CommentItem from "./CommentItem";
import { TYPE_COMMENT, TYPE_FEEDBACK } from "@/sat-vue-toolkit/satlegal/utils/constant";

export default {
  components: {
    UserCommentInput,
    CommentItem
  },
  data() {
    return { comment: "" };
  },
  props: {
    comments: Array,
    mentions: Array,
    isDisabledAttachment: Boolean,
    isLoadingGet: Boolean,
    isLoadingAdd: Boolean,
    currentUser: Object
  },
  computed: {
    typeComment() {
      return TYPE_COMMENT;
    },
    typeFeedback() {
      return TYPE_FEEDBACK;
    }
  }
};
</script>

<style scoped>
.message {
  border-radius: 10px;
  border-top-left-radius: 0px;
}
.user-comment-input >>> .user-comment__avatar {
  margin-top: 2px;
}
</style>
