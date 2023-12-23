<template>
  <div></div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("ht_store/project/board/list", ["dataListBoard"])
  },
  methods: {
    async fetchListBoard() {
      await this.getDataListBoardRequest();
      if (this.dataListBoard.length) {
        const id = this.dataListBoard[0].id;
        const projectId = this.$route.params.matter || this.$route.params.projectId;
        this.$router.push({
          name: "ProjectTaskBoard",
          params: { id, projectId, type: "kanban" }
        });
      }
    },
    ...mapActions("ht_store/project/board/list", ["getDataListBoardRequest"])
  },
  mounted() {
    this.fetchListBoard();
  }
};
</script>
