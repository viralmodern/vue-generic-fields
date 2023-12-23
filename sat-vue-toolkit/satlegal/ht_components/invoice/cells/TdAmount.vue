<template>
  <td>${{dataRow.amount | formatCurrency}}</td>
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
  }
};
</script>
