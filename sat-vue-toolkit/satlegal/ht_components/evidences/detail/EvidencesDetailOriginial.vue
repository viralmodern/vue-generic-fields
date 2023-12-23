<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <span v-on="on">{{ date }}</span>
    </template>
    <v-date-picker
      no-title
      :value="date"
      @input="menu = false"
      @change="$emit('update', $event)"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import moment from "moment";

export default {
  props: {
    originial: String
  },
  computed: {
    date() {
      return moment(this.originial).format("YYYY-MM-DD");
    }
  },
  data: () => ({
    menu: false
  })
};
</script>
