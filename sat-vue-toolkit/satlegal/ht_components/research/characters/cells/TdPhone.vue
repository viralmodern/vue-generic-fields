<template>
  <td>
    <v-text-field
      hide-details
      mask="+1 (###) ###-####"
      return-masked-value
      :value="dataRow.avatar.phone"
      @change="$emit('onChange', $event)"
      class="ma-0 pa-0 custom-text-field"
    ></v-text-field>
  </td>
</template>

<script>
export default {
  props: {
    column: Object,
    dataRow: Object
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}

.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
</style>
