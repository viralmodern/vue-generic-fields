<template>
  <div>
    <a class="text-no-wrap" href="#" @click="showModal">{{totalComments}} comment(s)</a>
    <v-dialog v-model="showDialog" width="800">
      <v-card>
        <v-card-text style="border-radius: 0px" class="py-4">
          <TicketComment
            ref="refTicketComments"
            :isLoadingGet="isLoadingGet"
            :isLoadingAdd="isLoadingAdd"
            :isDisabledAttachment="true"
            :comments="comments"
            :mentions="members"
            :currentUser="currentUser"
            @onSendComment="$emit('onSendComment', {...$event, pagination})"
            @onSubmitEditComment="$emit('onSubmitEditComment', $event)"
            @updateComment="$emit('updateComment',$event)"
            @onReplyAndFeedback="$emit('onReplyAndFeedback',$event)"
            @onToggleFeedback="$emit('onToggleFeedback', $event)"
            @onClickLoadmore="$emit('onClickLoadmore', $event)"
            @onToggleEditComment="$emit('onToggleEditComment', $event)"
            @onDeleteComment="$emit('onDeleteComment', $event)"
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
import { mapGetters } from "vuex";
import TicketComment from "./TicketComment";

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
    TicketComment
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
    ...mapGetters("ht_store/user", ["currentUser"]),
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
