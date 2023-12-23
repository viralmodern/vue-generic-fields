<template>
  <td>
    <v-btn :to="showDetail" class="ma-0" icon>
      <v-icon color="#757575" size="18">visibility</v-icon>
    </v-btn>
  </td>
</template>
<script>
export default {
  props: {
    column: Object,
    dataRow: Object
  },
  computed: {
    showDetail() {
      let projectId = this.$route.params.matter || this.$route.params.projectId;
      return {
        name: "characterDetail",
        params: {
          projectId: projectId,
          characterId: this.dataRow.id
        }
      };
    }
  }
};
</script>
