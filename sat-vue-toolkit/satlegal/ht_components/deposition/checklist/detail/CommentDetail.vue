<template>
  <div>
    <TicketComments
      :comments="commentsConver"
      :mentions="memberComment"
      @send="$emit('sendComment', $event)"
    />
  </div>
</template>
<script>
import TicketComments from "../../../messages/TicketComments";
import { mapGetters } from "vuex";
export default {
  props: {
    comments: Array
  },
  components: {
    TicketComments
  },
  computed: {
    ...mapGetters("ht_store/project/members", ["members"]),
    memberComment() {
      return (this.members || []).map(user => {
        return {
          ...user,
          name: user.avatar.name,
          displayName: user.avatar.name
        };
      });
    },
    commentsConver() {
      return (this.comments || []).map(cmt => {
        const members = (this.members || []).find(x => x.id === cmt.creator);
        return {
          id: cmt.pk,
          commentDate: cmt.created,
          comment: cmt.text,
          user: {
            avatar: members.avatar.imageUrl,
            fullName: members.avatar.name,
            id: members.id
          },
          userOnlineStatus: "online"
        };
      });
    }
  }
};
</script>
