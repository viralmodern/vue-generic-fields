<template>
  <v-form ref="form">
    <v-textarea
      ref="refTextArea"
      hide-details
      auto-grow
      :value="value"
      @change="$emit('onChange', $event)"
      :class="`ma-0 pa-0 custom-text-field ${borderUnset ? 'border-unset' : ''}`"
      :rows="rows"
      :placeholder="placeholder"
      :readonly="isReadonly"
    ></v-textarea>
  </v-form>
</template>

<script>
export default {
  props: {
    value: String,
    placeholder: String,
    rows: {
      type: [String, Number],
      default: () => "1"
    },
    borderUnset: {
      type: Boolean,
      default: () => true
    },
    isReadonly: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    focusInput() {
      setTimeout(() => {
        this.$refs.refTextArea.focus();
      }, 200);
    }
  }
};
</script>

<style scoped>
.border-unset /deep/ .v-input__slot::before {
  border-style: unset;
}
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
</style>
