<template>
  <div>
    <a href="#" @click="showModal">{{totalComments}} comment(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card>
        <v-card-text class="py-4">
          <TicketComments
            ref="refTicketComments"
            :isLoadingGet="isLoadingGet"
            :isDisabledAttachment="true"
            :comments="commentsConver"
            :mentions="memberComment"
            @send="$emit('sendComment', { body: {text: $event}, pagination })"
          />
          <div>
            <v-pagination
              v-if="isShowPagination"
              v-model="pagination.page"
              :length="totalsPageComment"
            ></v-pagination>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import TicketComments from "../messages/TicketComments";

export default {
  props: {
    comments: Array,
    members: Array,
    totalComments: Number,
    isShowPagination: Boolean,
    totalsPageComment: Number,
    isLoadingAdd: Boolean,
    isLoadingGet: Boolean,
  },
  components: {
    TicketComments
  },
  data() {
    return {
      showDialog: false,
      pagination: {
        page: 1,
      },
    };
  },
  computed: {
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
        const members =
          (this.members || []).find(x => x.id === cmt.creator) || {};
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
  methods: {
    showModal() {
      this.showDialog = true;
      this.$emit('showModal');
    },
  },
  watch: {
    pagination: {
      handler(val) {
        this.$refs.refTicketComments.$el.scrollIntoView({top: 0, behavior: 'smooth'});
        this.$emit('updatePagination', val);
      },
      deep: true,
    }
  },
};
</script>
