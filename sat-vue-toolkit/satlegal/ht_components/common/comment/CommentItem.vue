<template>
  <v-row no-gutters class="comment-item flex-nowrap">
    <div class="mt-1 mr-2">
      <UserAvatar
        :name="user.name"
        :imageUrl="user.avatar ? user.avatar.imageUrl : ''"
        :avatarSize="avatarSize"
        :status="true"
      />
    </div>
    <div style="flex: 1 1 auto;">
      <div class="mb-2 mt-1" v-if="isShowEditComment">
        <CommentInput
          :value="formatContent(comment)"
          :avatarSize="28"
          class="comment-item__input"
          :currentUser="currentUser"
          :mentions="mentions"
          :isLoadingSend="isLoadingUpdateComment"
          :disabled="isLoadingUpdateComment"
          :autoFocusCommentInput="true"
          @send="$emit('onSubmitEditComment', $event)"
          placeholder="Insert your comment here... (use @ to tag someone)"
        />
        <TextCancelCommentInput
          text="Press esc to"
          @onClickCancel="$emit('onToggleEditComment')"
        />
      </div>

      <UserMessage
        v-else
        :nameUser="user.name"
        :commentDate="commentDate"
        :content="formatContent(comment)"
        :isShowActionMore="isShowActionMore"
        @onEditMessage="$emit('onToggleEditComment')"
        @onDeleteComment="$emit('onDeleteComment')"
      />
      <div class="comment-item__action" v-if="isShowActionReply">
        <a
          href="#"
          class="comment-item__action-reply text-caption"
          @click="
            feedback.length || !countFeedback
              ? $emit('onToggleFeedback')
              : $emit('onOpenFeedback')
          "
          >Reply</a
        >
      </div>
      <div class="comment-item__loadmore pa-2">
        <div v-if="countFeedback">
          <Feedback
            @onClickFeedback="
              feedback.length
                ? $emit('onToggleFeedback')
                : $emit('onOpenFeedback')
            "
            :textFeedback="textFeedback"
            :isLoadingFeedback="isShowReplyAndFeedback ? false : isLoadingFeedback"
            :icon="isShowReplyAndFeedback ? 'mdi-chevron-up' : 'subdirectory_arrow_right'"
          />
          <Feedback
            v-if="seeMoreCount > 0"
            @onClickFeedback="$emit('onClickLoadmore')"
            :textFeedback="textFeedbackLoadMore"
            :isLoadingFeedback="isLoadingFeedback"
            icon="subdirectory_arrow_right"
          />
        </div>
        <slot name="childComment"></slot>
      </div>
    </div>
  </v-row>
</template>
<script>
import UserAvatar from "../../avatars/UserAvatar";
import TimerLabel from "../../labels/TimerLabel";
import UserCommentInput from "../../inputs/UserCommentInput";
import CommentInput from "../../inputs/CommentInput";
import UserMessage from "./UserMessage";
import Feedback from "./Feedback";
import TextCancelCommentInput from "./TextCancelCommentInput";
import { mapGetters } from "vuex";

export default {
  props: {
    user: Object,
    userOnlineStatus: String,
    comment: String,
    commentDate: String,
    mentions: Array,
    avatarSize: Number,
    countFeedback: Number,
    isShowReplyAndFeedback: Boolean,
    isLoadingFeedback: Boolean,
    feedback: Array,
    isCallApi: Boolean,
    currentUser: Object,
    isShowActionMore: Boolean,
    isShowEditComment: Boolean,
    isLoadingUpdateComment: Boolean,
    isShowActionReply: Boolean,
  },
  components: {
    UserAvatar,
    TimerLabel,
    UserCommentInput,
    CommentInput,
    UserMessage,
    Feedback,
    TextCancelCommentInput
  },
  methods: {},
  computed: {
    textFeedback() {
      return this.isShowReplyAndFeedback
        ? `Hide ${this.feedback.length} feedback`
        : `${this.countFeedback} feedback`;
    },
    seeMoreCount() {
      if(this.isShowReplyAndFeedback) {
        return this.countFeedback - this.feedback.length;
      }
      return 0;
    },
    textFeedbackLoadMore() {
      return `See more ${this.seeMoreCount} feedback`
    },
  },
  methods: {
    formatContent(content) {
      // let rep = content;
      // if (!rep) return rep;
      // const names = rep.match(/@->user#\b\d+\b/gm);
      // if (names) {
      //   names.forEach(n => {
      //     const data = this.mentions.find(x => x.id == n.split("#")[1]) || {};
      //     rep = rep.replace(
      //       n,
      //       `<a id="@->user#${data.id}" href="#" class="tribute-mention" style="color: #385898;text-decoration: none;" contenteditable="false">${data.displayName}</a>`
      //     );
      //   });
      // }
      // return rep.replace(/\n/g, "<br/>");
      return content;
    },
    onClickReply() {
      const isShow = this.isShowReplyAndFeedback;
      const checkToggle = isShow ? "" : this.$emit("onToggleFeedback");
      if (this.isCallApi) {
        return checkToggle;
      } else {
        if (this.feedback.length === 0) {
          this.$emit("onReply");
          return;
        }
        return checkToggle;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$color-blue: #385898;

.comment-item {
  &__action {
    padding: 0px 5px;
    &-reply {
      font-size: 13px;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &__input {
    >>> .user-comment__avatar {
      margin-top: 4px;
    }
  }
  // &__loadmore {
  //   &-count-more {
  //     font-size: 13px;
  //     color: $color-blue;
  //     text-decoration: none;
  //     &:hover {
  //       text-decoration: underline;
  //     }
  //   }
  //   &-arrow-right {
  //     color: $color-blue;
  //     margin-right: 5px;
  //   }

  //   &-loading {
  //     color: $color-blue;
  //   }
  // }
}
</style>
