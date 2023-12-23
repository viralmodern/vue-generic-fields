<template>
  <div>
    <v-text-field
      class="custom-text-field field_number"
      :value="value"
      single-line
      @input="$emit('update', $event)"
      mask="##"
      type="number"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Number]
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.field_number{
  width: 60px;
}
</style>
