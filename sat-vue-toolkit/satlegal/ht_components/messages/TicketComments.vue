<template>
  <v-row no-gutters>
    <v-col cols="12">
      <CommentInput
        class="mb-2"
        :mentions="mentions"
        @change="v=>comment = v"
        @send="v=>$emit('send',v)"
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
      <UserMessage
        class="my-2"
        v-for="(itemUserMessage,index) in comments"
        :key="index"
        :user="itemUserMessage.user"
        :userOnlineStatus="itemUserMessage.userOnlineStatus "
        :comment="itemUserMessage.comment"
        :commentDate="itemUserMessage.commentDate"
        :mentions="mentions"
      />
    </v-col>
  </v-row>
</template>

<script>
import UserMessage from "../cards/UserMessage";
import CommentInput from "../inputs/CommentInput";
export default {
  components: {
    UserMessage,
    CommentInput
  },
  data() {
    return { comment: "" };
  },
  props: {
    comments: Array,
    mentions: Array,
    isDisabledAttachment: Boolean,
    isLoadingGet: Boolean,
  }
};
</script>

<style scoped>
.message {
  border-radius: 10px;
  border-top-left-radius: 0px;
}
</style>
