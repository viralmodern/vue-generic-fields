<template>
  <td>
    <v-text-field
      class="custom-text-field"
      :value="dataRow[column.name]"
      single-line
      @change="onChange"
      mask="####"
    ></v-text-field>
  </td>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    onChange(value) {
      this.$emit("update", value);
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
