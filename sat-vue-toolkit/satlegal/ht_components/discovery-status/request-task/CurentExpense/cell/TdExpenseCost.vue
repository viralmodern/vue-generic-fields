<template>
  <td>
    <span>{{this.dataRow.expense_cost}}</span>
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
