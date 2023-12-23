<template >
  <td class="custom">
    <TimePicker
      label=""
      :rules="[v => !!v || 'This field is required']"
      :value="dataRow[column.name]"
      hide-details
      @change="$emit('update', $event)"
    />
  </td>
</template>

<script>
import TimePicker from "../menus/TimePicker";
export default {
  components: {
    TimePicker
  },
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
  width: 80px;
}
.custom /deep/ .v-text-field__slot {
  font-size: 13px;
}
.custom /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
