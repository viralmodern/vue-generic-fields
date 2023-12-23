<template>
  <td>
    <span>{{totalBought}}</span>
  </td>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    totalBought() {
      return this.dataRow.boughtAt * this.dataRow.quantity;
    }
  }
};
</script>
