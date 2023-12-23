<template>
  <td>
    <span v-if="dataRow.lastPayment">{{dataRow.lastPayment | formatYYYYMMDD}}</span>
    <span v-else>No last payment</span>
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