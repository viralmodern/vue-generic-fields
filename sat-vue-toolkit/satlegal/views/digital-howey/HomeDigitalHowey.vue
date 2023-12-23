<template>
  <v-row no-gutters fill-height>
    <v-col>
      <LayoutBoard :type="boardType">
        <router-view></router-view>
      </LayoutBoard>
    </v-col>
  </v-row>
</template>
<script>
import LayoutBoard from "../../ht_components/digital-howey/LayoutBoard";
export default {
  components: {
    LayoutBoard
  },
  computed: {
    boardType() {
      return this.$route.params.type === "kanban"
        ? 1
        : this.$route.params.type === "table"
        ? 2
        : this.$route.params.type === "tree"
        ? 3
        : 4;
    }
  }
};
</script>
