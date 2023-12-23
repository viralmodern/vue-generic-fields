<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :disabled="disabled"
        :rules="[v => !!v || 'This field is required']"
        required
        :value="value"
        :label="label"
        :append-icon="appendIcon"
        :hide-details="hideDetails"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu"
      :min="min"
      :value="value"
      @change="
        $emit('change', $event);
        menu = false;"
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    value: String,
    rules: Array,
    min: String,
    label: {
      type: String,
      default: () => "Time To"
    },
    appendIcon: String,
    hideDetails: Boolean,
    disabled: Boolean,
  },
  data() {
    return {
      menu: false
    };
  }
};
</script>
