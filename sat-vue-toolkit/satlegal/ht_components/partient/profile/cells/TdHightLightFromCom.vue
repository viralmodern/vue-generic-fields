<template>
  <td>
    <v-textarea
      hide-details
      name="input-7-1"
      :value="dataRow.hightlightName"
      class="ma-0 pa-0 custom-text-field input-size"
      @input="change"
      rows="1"
    ></v-textarea>
  </td>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    change(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      this.$emit("updateTask", data);
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.input-size {
  width: 130px;
  font-size: 13px;
}
</style>
