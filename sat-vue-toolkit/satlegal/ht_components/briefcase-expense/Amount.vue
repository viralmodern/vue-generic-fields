<template>
  <td>
    ${{dataRow.amount | formatCurrency}}
  </td>
</template>
<script>
import { formatCurrency } from "@/sat-vue-toolkit/satlegal/ht_plugins/filter"

export default {
  filters: {
    formatCurrency
  },
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
