<template>
  <v-list>
    <v-row no-gutters class="pa-0">
      <TitleDetail
        v-if="detailCheckList.users"
        :name="detailCheckList.users.avatar.name"
        :imageUrl="detailCheckList.users.avatar.imageUrl"
        :starred="detailCheckList.starred"
        :taskId="detailCheckList.pk"
        :is_removed="detailCheckList.is_removed"
        :priority="detailCheckList.marked_priority"
        :deadline="detailCheckList.deadline | formatYYYYMMDD"
        @updateCheckList="updateTask({name: 'deadline', $event})"
        @updateStar="updateStar"
        @removeTask="removeTask"
      />
      <v-col cols="12">
        <ContentDetail
          class="ml-2"
          :done="detailCheckList.done"
          :arrChip="detailCheckList.labels"
          :title="detailCheckList.title"
          :desc="detailCheckList.desc"
          @updateCheckList="updateTask"
        />
      </v-col>
      <v-col cols="12" class="mt-2">
        <div class="title">Comments</div>
        <CommentDetail
          class="mt-1"
          :comments="detailCheckList.comments"
          @sendComment="commentSend"
        />
      </v-col>
    </v-row>
  </v-list>
</template>
<script>
import TitleDetail from "./TitleDetail";
import CommentDetail from "./CommentDetail";
import ContentDetail from "./ContentDetail";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TitleDetail,
    ContentDetail,
    CommentDetail
  },
  data() {
    return {
      menu: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/deposition/checklist", [
      "getDetailCheckList",
      "updateCheckList",
      "sendComment",
      "updateStar",
      "removeTask"
    ]),
    commentSend(evt) {
      const { depositionId, projectId, checklistId } = this.$route.params;
      const data = {
        matterId: projectId,
        depositionId,
        checklistId,
        body: {
          text: evt
        }
      };
      this.sendComment(data);
    },
    updateTask(evt) {
      const { depositionId, projectId, checklistId } = this.$route.params;
      const data = {
        matterId: projectId,
        depositionId,
        [evt.name]: evt.$event,
        pk: checklistId
      };
      this.updateCheckList(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/checklist", ["detailCheckList"])
  },
  mounted() {
    const { depositionId, projectId, checklistId } = this.$route.params;
    this.getDetailCheckList({ matterId: projectId, depositionId, checklistId });
  }
};
</script>
