<template>
  <v-text-field
    :type="typeInput"
    ref="refTextField"
    hide-details
    :value="value"
    @change="change"
    :class="`ma-0 pa-0 custom-text-field ${borderUnset ? 'border-unset' : ''}`"
    :rows="rows"
    :placeholder="placeholder"
    :readonly="isReadOnly"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    typeInput: String,
    value: [String, Number],
    placeholder: String,
    rows: {
      type: [String, Number],
      default: () => "1"
    },
    borderUnset: {
      type: Boolean,
      default: () => true
    },
    isReadOnly: {
      type: Boolean,
      default: () => false
    },
  },
  methods: {
    focusInput() {
      setTimeout(() => {
        this.$refs.refTextField.focus();
      }, 200);
    },
    change(event) {
      if(this.value !== event) {
        this.$emit('onChange', event)
      }
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
