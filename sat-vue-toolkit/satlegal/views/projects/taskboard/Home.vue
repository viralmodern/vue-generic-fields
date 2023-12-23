<template>
  <v-row no-gutters fill-height>
    <v-col>
      <ProjectBoard :type="boardType">
        <router-view></router-view>
      </ProjectBoard>
    </v-col>
  </v-row>
</template>
<script>
import ProjectBoard from "../../../ht_components/project/ProjectBoard";
export default {
  components: {
    ProjectBoard
  },
  computed: {
    boardType() {
      return this.$route.params.type === "kanban"
        ? 1
        : this.$route.params.type === "table"
        ? 2
        : this.$route.params.type === "tree"
        ? 3
        : this.$route.params.type === "gantt"
        ? 4
        : 5;
    }
  }
};
</script>
