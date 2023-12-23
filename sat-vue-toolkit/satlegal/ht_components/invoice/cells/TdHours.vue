<template>
  <td>
    <v-text-field
      class="custom-text-field"
      :value="dataRow[this.column.name]"
      @change="$emit('update', $event)"
      mask="##:##"
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
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
  width: 50px;
}
.custom-text-field /deep/ .v-text-field {
  margin: unset;
}
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
