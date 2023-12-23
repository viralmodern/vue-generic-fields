<template>
  <v-col
    cols="6"
    v-if="isTreeView"
    :class="
      `mt-1 right-tree-panel ${isShowingProjectHeader ? 'has-header' : ''}`
    "
  >
    <ByzantineTicketDetailCard v-if="isByzantineType" />
    <TicketDetailCard v-else-if="isNormalType" />
  </v-col>
  <div v-else>
    <ProjectTaskDetail
      v-if="isByzantineType"
      :isShow="true"
      @closeModal="closeCardDetail"
    />
    <TicketDetailDialog
      v-else-if="isNormalType"
      :isShow="true"
      @cancel="closeCardDetail"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import TicketDetailDialog from "../../../ht_components/dialogs/TicketDetail";
import ProjectTaskDetail from "../../../ht_components/dialogs/ProjectTaskDetail";
import ByzantineTicketDetailCard from "../../../ht_components/cards/ByzantineTicketDetail";
import TicketDetailCard from "../../../ht_components/cards/TicketDetail";
export default {
  components: {
    TicketDetailDialog,
    ProjectTaskDetail,
    ByzantineTicketDetailCard,
    TicketDetailCard
  },
  methods: {
    closeCardDetail() {
      this.$router.push({
        name: "ProjectTaskBoard",
        params: { projectId: this.$route.params.matter || this.$route.params.projectId }
      });
    }
  },
  computed: {
    ...mapGetters("ht_store/project", ["projectDetail"]),
    ...mapGetters("ht_store/layout", ["isShowingProjectHeader"]),
    isByzantineType() {
      return this.projectDetail && this.projectDetail.type === "byzantine";
    },
    isNormalType() {
      return this.projectDetail && !this.isByzantineType;
    },
    isTreeView() {
      return this.$route.params.type === "tree";
    }
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
