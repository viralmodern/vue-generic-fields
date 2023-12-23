<template>
  <div>
    <TicketComments
      :comments="commentsConver"
      :mentions="memberComment"
      @send="$emit('sendComment', $event)"
    />
    <v-col cols="12" v-if="pageSize >= 20 ">
      <v-btn
        @click="pagingComment"
        outlined
        class="text-capitalize primary--text"
      >See more comments first</v-btn>
    </v-col>
  </div>
</template>
<script>
import TicketComments from "../../../messages/TicketComments";

export default {
  props: {
    comments: Array,
    members: Array,
    totalComment: Number
  },
  components: {
    TicketComments
  },
  data() {
    return {
      page: 1,
    }
  },
  methods: {
    pagingComment() {
      this.page = this.page + 1;
      this.$emit('pagingComment', this.page)
    }
  },
  computed: {
    pageSize() {
      return this.totalComment / this.page;
    },
    memberComment() {
      return (this.members || []).map(user => {
        return {
          ...user,
          name: (user.avatar || {}).name,
          displayName: (user.avatar || {}).name
        };
      });
    },
    commentsConver() {
      return (this.comments || []).map(cmt => {
        const members = (this.members || []).find(x => x.id === cmt.creator) || {};
        return {
          id: cmt.pk,
          commentDate: cmt.created,
          comment: cmt.text,
          user: {
            avatar: (members.avatar || {}).imageUrl,
            fullName: (members.avatar || {}).name,
            id: members.id
          },
          userOnlineStatus: "online"
        };
      });
    }
  },
  watch: {
    totalComment() {
      this.page = 1;
    }
  }
};
</script>
