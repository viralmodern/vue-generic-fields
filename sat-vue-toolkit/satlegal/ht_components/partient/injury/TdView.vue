<template>
  <td>
    <v-btn class="ma-0" icon :to="showDetail">
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
      return {
        name: "InjuryPartientDetail",
        params: {
          id: this.dataRow.id
        }
      };
    }
  }
};
</script>
