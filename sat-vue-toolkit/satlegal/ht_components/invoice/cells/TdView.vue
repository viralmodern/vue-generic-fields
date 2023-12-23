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
    dataRow: Object,
    namePath: String
  },
  computed: {
    showDetail() {
      return {
        name: this.namePath,
        params: {
          id: this.dataRow.id
        }
      };
    }
  }
};
</script>
