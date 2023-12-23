<template>
  <td>
    <v-btn small icon @click="deleteAnalysis">
      <v-icon size="18">delete_outline</v-icon>
    </v-btn>
  </td>
</template>
<script>
export default {
  props: {
    dataRow: Object
  },
  methods: {
    deleteAnalysis() {
      this.$emit("deleteAnalysis", this.dataRow.id);
    }
  }
};
</script>
