<template>
  <td>
    <v-textarea
      hide-details
      auto-grow
      :value="dataRow.name"
      @input="change"
      class="ma-0 pa-0 custom-text-field"
      rows="2"
    ></v-textarea>
  </td>
</template>

<script>
export default {
  props: {
    idGroup: Number,
    column: Object,
    dataRow: Object,
    expanId: Number
  },
  methods: {
    change(name) {
      const data = {
        expanId: this.expanId,
        idGroup: this.idGroup,
        columnName: this.column.name,
        id: this.dataRow.id,
        newValue: name
      };
      this.$emit("updateTaskPhoto", data);
    }
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
</style>
