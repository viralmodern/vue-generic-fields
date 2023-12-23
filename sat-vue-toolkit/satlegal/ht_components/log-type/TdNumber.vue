<template>
  <td>
    <v-text-field
      class="custom-text-field"
      :value="dataRow.number"
      single-line
      @input="onChange"
      mask="##"
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
      const data = {
        column: this.column.name,
        parentId: this.dataRow.id,
        value: value
      };
      this.$emit("onChange", data);
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
