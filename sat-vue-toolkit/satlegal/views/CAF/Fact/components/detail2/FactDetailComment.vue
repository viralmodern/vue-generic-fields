<template>
  <Comment
    :members="members"
    :comments="dataComment"
    :totalComment="totalsComment"
    @pagingComment="getCommentFacts({
      matterId:$route.params.matter || $route.params.projectId,
      taskId: $route.params.factId,
      page: $event
    })"
    @sendComment="send"
  />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Comment from "../../../discovery-status/request-set/common/Comment";

export default {
  components: {
    Comment
  },
  data() {
    return {
      page: 1
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/member", ["members"]),
    ...mapGetters("ht_store/project/research/facts", ["dataComment", "totalsComment"])
  },
  methods: {
    send(text) {
      const { factId, projectId } = this.$route.params;
      this.sendCommentFacts({
        matterId: projectId,
        taskId: factId,
        body: { text }
      });
    },
    ...mapActions("ht_store/project/research/facts", [
      "sendCommentFacts",
      "getCommentFacts"
    ])
  },
  mounted() {
    const { factId, projectId } = this.$route.params;
    this.getCommentFacts({ matterId: projectId, taskId: factId, page: this.page });
  }
};
</script>
