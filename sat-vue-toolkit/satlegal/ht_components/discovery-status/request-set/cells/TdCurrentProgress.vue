<template>
  <td style="width: 200px;">
    <v-row no-gutters class="align-center">
      <v-progress-circular
        v-slot:activator="{ on }"
        :size="45"
        :rotate="-90"
        :value="currentProgress"
        :width="5"
        color="primary"
      >
        <span v-on="on" class="caption">{{currentProgress}}%</span>
      </v-progress-circular>
      <span class="ml-2 caption">{{taskDone}} Task done</span>
    </v-row>
  </td>
</template>

<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    currentProgress() {
      const total_done = this.dataRow.total_done || 0;
      const total_request_items = this.dataRow.total_request_items || 0;
      return total_request_items > 0
        ? (total_done / total_request_items) * 100
        : 0;
    },
    taskDone() {
      const total_done = this.dataRow.total_done || 0;
      const total_request_items = this.dataRow.total_request_items || 0;
      return total_done + "/" + total_request_items;
    }
  }
};
</script>
