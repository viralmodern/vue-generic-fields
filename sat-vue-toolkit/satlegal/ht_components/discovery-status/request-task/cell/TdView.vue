<template>
  <td>
    <v-btn :to="routeCardDetail" class="ma-0" icon>
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
    routeCardDetail() {
      return {
        name: "detailRequestTask",
        params: {
          type: 'request-task',
          requestId: this.dataRow.request_set,
          taskId: this.dataRow.id
        }
      };
    }
  }
};
</script>
