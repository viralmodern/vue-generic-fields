<template>
  <v-text-field
    type="number"
    :value="value"
    @change="$emit('onChange', $event)"
    class="ma-0 pa-0 custom-text-field"
    :rules="rules"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    value: Number,
    min: {
      type: Number,
      default: () => 0
    },
    max: {
      type: Number,
      default: () => 0
    },
    messagesError: {
      numberFloat: String,
      min: String,
      max: String
    }
  },
  computed: {
    rules() {
      const checkNumberFloat = v =>
        /^[0-9]?\d+(\.\d+)?$/.test(v) || this.messagesErrorDefault.numberFloat;
      const checkMin = v => v >= this.min || this.messagesErrorDefault.min;
      const checkMax = v => v <= this.max || this.messagesErrorDefault.max;
      const rules = [checkNumberFloat, checkMin, checkMax];
      return rules;
    },
    messagesErrorDefault() {
      return {
        numberFloat: "Incorrect number format",
        min: `The smallest number must be ${this.min}`,
        max: `The largest number must be ${this.max}`,
        ...this.messagesError
      };
    }
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  /* border-style: unset; */
}
.custom-text-field /deep/ .v-text-field__slot {
  font-size: 13px;
}
</style>
