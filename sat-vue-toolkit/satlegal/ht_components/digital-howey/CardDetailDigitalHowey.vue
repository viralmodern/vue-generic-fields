<template>
  <v-col
    cols="5"
    v-if="isTreeView"
    :class="`mt-1 right-tree-panel ${isShowingProjectHeader ? 'has-header':''}`"
  >
    <DigitalHoweyTicketDetail/>
  </v-col>
  <div v-else>
    <DigitalHoweyDialogTicketDetail :isShow="true" @cancel="closeCardDetail"/>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DigitalHoweyDialogTicketDetail from "./DigitalHoweyDialogTicketDetail";
import DigitalHoweyTicketDetail from "./DigitalHoweyTicketDetail";
export default {
  components: {
    DigitalHoweyDialogTicketDetail,
    DigitalHoweyTicketDetail
  },
  methods: {
    closeCardDetail() {
      this.$router.push({
        name: "DigitalHoweyChecklist",
        params: { projectId: this.$route.params.matter || this.$route.params.projectId }
      });
    },
    ...mapActions("ht_store/matter/digitalHoweyChecklist/task/detail", [
      "getDataTaskDetailRequest"
    ])
  },
  computed: {
    ...mapGetters("ht_store/layout", ["isShowingProjectHeader"]),
    isTreeView() {
      return this.$route.params.type === "tree";
    }
  },
  mounted() {
    this.getDataTaskDetailRequest();
  }
};
</script>

<style scoped>
.right-tree-panel /deep/ .overflow-card {
  height: calc(100vh - 190px);
}
.right-tree-panel.has-header /deep/ .overflow-card {
  height: calc(100vh - 280px);
}
</style>


