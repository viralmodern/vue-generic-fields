<template>
  <div style="width: 200px;">
    <v-text-field
      dense
      style="font-size: 14px;"
      v-model="text"
      type="number"
      class="text_input_list"
      label="Number"
      outlined
      hide-details
    />
  </div>
</template>

<script>
export default {
  name: 'AttributesDecimalCell',
  data() {
    return {
      text: ''
    }
  },
  props: {
    value: {}
  },
  watch: {
    text: {
      handler(v) {
        console.log('contenteditable', v)
        this.$emit('input', v)
      },
      immediate: true
    }
  }
}
</script>

<style scoped></style>
<style scoped>
.text_input_list /deep/ > input {
  padding-left: 5px !important;
}
.text_input_list /deep/ > .v-input__control > .v-input__slot:before {
  /*border-color: transparent !important;*/
}
.text_input_list /deep/ .v-input input:focus,
.v-input input:active {
  /*border-color: transparent !important;*/
}
.text_input_list.v-text-field.v-input--is-disabled
  /deep/
  > .v-input__control
  > .v-input__slot:before {
  /*border-color: transparent !important;*/
  /*border-image: unset !important;*/
}
</style>
