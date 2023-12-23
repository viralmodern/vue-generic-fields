<template >
  <td class="custom">
    <DateMonthPicker
      :min="minDate"
      hide-details
      :value="dateFormat"
      @change="$emit('update', $event)"
    />
  </td>
</template>

<script>
import DateMonthPicker from "../menus/DateMonthPicker";
export default {
  components: {
    DateMonthPicker
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    minDate() {
      return this.dataRow[this.column.name];
    },
    dateFormat() {
      if (!this.dataRow[this.column.name]) return "";
      return this.$options.filters.formatYYYYMMDD(
        this.dataRow[this.column.name]
      );
    }
  }
};
</script>


<style scoped>
.custom /deep/ .v-text-field {
  margin: 0px;
  padding: 0px;
  width: 80px;
}
.custom /deep/ .v-text-field__slot {
  font-size: 13px;
}
.custom /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
