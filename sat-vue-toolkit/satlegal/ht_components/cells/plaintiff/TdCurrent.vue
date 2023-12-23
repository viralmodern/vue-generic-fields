<template>
  <td :style="{background: current > 0 ? 'green' : 'red'}">
    <span class="white--text">{{current}}</span>
  </td>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    current() {
      var totalBought = this.dataRow.boughtAt * this.dataRow.quantity;
      var currentPrice = 60;
      return totalBought - currentPrice * this.dataRow.quantity;
    }
  }
};
</script>
