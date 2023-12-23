<template>
  <td>
    <v-btn small icon @click="showDetailDocument">
      <v-icon size="18">remove_red_eye</v-icon>
    </v-btn>
    <v-btn small icon @click="deleteItemDocument">
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
    deleteItemDocument() {
      this.$emit("deleteItemDocument", this.dataRow.id);
    },
    showDetailDocument() {
      this.$emit("showDetailDocument", this.dataRow.id);
    }
  }
};
</script>
