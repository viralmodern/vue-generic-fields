<template>
  <div>
    <div class="font-weight-medium subheading">{{label}}</div>
    <v-textarea
      hide-details
      auto-grow
      :value="value"
      @change="$emit('change', $event)"
      class="ma-0 pa-2 custom-text-field fieldDes"
      rows="1"
    ></v-textarea>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: String
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.fieldDes {
  background: #eceff1;
}
.theme--dark.fieldDes {
  background: #909090;
}
</style>
