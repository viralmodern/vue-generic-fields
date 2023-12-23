<template>
  <td>
    <v-btn :to="routeCardDetail" class="ma-0" icon>
      <v-icon color="#757575" size="18">mdi-eye</v-icon>
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
    routeCardDetail() {
      return {
        name: "detail",
        params: {
          projectId: this.$route.params.matter || this.$route.params.projectId,
          evidenceId: this.dataRow.id,
          groupType: this.$route.params.groupType
        }
      };
    }
  }
};
</script>
