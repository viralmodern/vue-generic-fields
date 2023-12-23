<template>
  <td>
    <v-text-field
      hide-details
      :value="dataRow[column.name]"
      @change="$emit('update', $event)"
      class="ma-0 pa-0 custom-text-field"
    ></v-text-field>
  </td>
</template>

<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
.custom-text-field /deep/ .v-text-field__slot input {
  width: unset;
}
</style>
