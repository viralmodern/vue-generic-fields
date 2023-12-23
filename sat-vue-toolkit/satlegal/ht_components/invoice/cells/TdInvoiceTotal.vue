<template>
  <td>
    <span>{{Math.round(total)}}</span>
  </td>
</template>

<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    total() {
      const { discount, tax, price, quantity } = this.dataRow;
      const sumMoney = +quantity * +price;
      const sumDiscount = sumMoney - (sumMoney * +discount) / 100;
      return sumDiscount - (sumDiscount * +tax) / 100;
    }
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
.custom-text-field /deep/ .v-text-field {
  margin: unset;
}
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
