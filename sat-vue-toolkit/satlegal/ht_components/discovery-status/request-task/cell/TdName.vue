<template>
  <td>
    <v-textarea
      hide-details
      name="input-7-1"
      :value="dataRow.name"
      class="ma-0 pa-0 custom-text-field input-size"
      @change="change"
      rows="1"
    ></v-textarea>
  </td>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    change(e) {
      this.$emit('update', e);
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.input-size {
  width: 130px;
  font-size: 13px;
}
</style>
