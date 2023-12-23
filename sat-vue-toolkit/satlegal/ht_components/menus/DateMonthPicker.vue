<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y

    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :disabled="disabled"
        :rules="rules"
        :value="value"
        :label="label"
        readonly
        prepend-icon="mdi-calendar"
        :placeholder="placeholder"
        v-on="on"
        :class="showDecoration ? 'custom' : ''"
        :hide-details="hideDetails"
      ></v-text-field>
    </template>
    <v-date-picker
      :min="min"
      :max="max"
      :value="value || new Date().toISOString().substr(0, 10)"
      @input="$emit('change', $event);menu = false"
    >
    <v-spacer></v-spacer>
    <v-btn text color="primary" @click="$emit('clear'); menu = false">Clear</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    value: String,
    min: String,
    max: String,
    rules: Array,
    label: String,
    hideDetails: Boolean,
    prependIcon: String,
    placeholder: String,
    appendIcon: String,
    disabled: Boolean,
    showDecoration: Boolean
  },
  data() {
    return {
      menu: false
    };
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
