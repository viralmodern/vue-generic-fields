<template>
  <td class="custom">
    <v-text-field hide-details :value="dataRow.created | formatYYYYMMDD" readonly/>
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


<style scoped>
.custom /deep/ .v-text-field {
  margin: 0px;
  padding: 0px;
}
.custom /deep/ .v-text-field__slot {
  font-size: 13px;
}
.custom /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>

