<template>
  <td class="custom">
    <DateMonthPicker
      hide-details
      :rules="[v => !!v || 'This field is required']"
      :max="dataRow.endDate | formatYYYYMMDD"
      :value="dataRow.startDate | formatYYYYMMDD"
      @change="$emit('update', $event)"
    />
  </td>
</template>

<script>
import DateMonthPicker from "../../../../menus/DateMonthPicker";
export default {
  components: {
    DateMonthPicker
  },
  props: {
    dataRow: Object,
    column: Object
  }
};
</script>

<style scoped>
.custom /deep/ .v-text-field{
  margin: 0px;
  padding: 0px;
  width:100px;
}
.custom /deep/ .v-text-field__slot{
  font-size: 13px;
}
.custom /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>