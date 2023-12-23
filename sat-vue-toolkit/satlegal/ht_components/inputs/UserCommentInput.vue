<template>
  <v-row no-gutters class="user-comment flex-nowrap">
    <div class="mr-2">
      <UserAvatar
        class="user-comment__avatar"
        :name="currentUser.name"
        :imageUrl="currentUser.avatar"
        :avatarSize="avatarSize"
      />
    </div>
    <div class="user-comment__input">
      <CommentInput
        ref="refCommentInput"
        :value="value"
        :disabled="disabled"
        :avatarSize="avatarSize"
        :currentUser="currentUser"
        :mentions="mentions"
        :isLoadingSend="isLoadingSend"
        :placeholder="placeholder"
        :autoFocusCommentInput="autoFocusCommentInput"
        @send="$emit('send', $event)"
      />
      <TextCancelCommentInput
        v-if="isShowCancel"
        text="Press esc to"
        @onClickCancel="$emit('onCancelEdit')"
      />
    </div>
  </v-row>
</template>

<script>
import UserAvatar from "../avatars/UserAvatar";
import CommentInput from "./CommentInput";
import TextCancelCommentInput from "../common/comment/TextCancelCommentInput";

export default {
  components: {
    CommentInput,
    UserAvatar,
    TextCancelCommentInput,
  },
  props: {
    value: String,
    user: Object,
    avatarSize: Number,
    currentUser: Object,
    mentions: Array,
    isLoadingSend: Boolean,
    placeholder: String,
    avatarSize: Number,
    isShowCancel: {
      type: Boolean,
      default: () => true
    },
    disabled: Boolean,
    autoFocusCommentInput: Boolean,
  },
  methods: {
    clearCommentInput() {
      return this.$refs.refCommentInput.clearCommentInput();
    }
  },
  watch: {
    isLoadingSend(status) {
      if(!status) {
        this.clearCommentInput();
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.user-comment {
  &__input {
    flex: 1 1 auto;
    word-break: break-all;
  }
  &__cancel {
    font-size: 10px;
    padding-left: 2px;
  }
}
</style>
