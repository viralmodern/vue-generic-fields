<template>
  <td>
    <span v-if="dataRow.total_expense">{{ dataRow.total_expense }}</span>
    <span v-else>N/A</span>
  </td>
</template>

<script>
export default {
  props: {
    column: Object,
    dataRow: Object
  },
};
</script>
