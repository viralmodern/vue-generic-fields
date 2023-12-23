<template>
  <v-row no-wrap no-gutters class="align-center">
    <v-text-field
      hide-details
      :value="value"
      @change="$emit('update', $event)"
      class="ma-0 pa-0 custom-text-field"
    ></v-text-field>
    <v-btn small @click="$emit('openEmoji')" icon>
      <v-icon>mdi-emoticon</v-icon>
    </v-btn>
  </v-row>
</template>
<script>
export default {
  props: {
    value: String
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
