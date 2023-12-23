<template>
  <v-menu
    ref="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    v-model="menu"
    transition="scale-transition"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-on="on"
        :value="filter.value"
        persistent-hint
        prepend-icon="search"
        label="Due date filter"
        placeholder="Select a date to search"
      ></v-text-field>
    </template>
    <v-date-picker @input="onChange" :value="filter.value" no-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="clearDate">Clear</v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: {
    filter: Object
  },
  data() {
    return {
      menu: false
    };
  },
  methods: {
    ...mapMutations("ht_store/project/board/filter", ["updateFilterValue"]),
    onChange(v) {
      this.menu = false;
      this.callData = true;
      this.updateFilterValue({ filterName: this.filter.name, value: v });
    },
    clearDate() {
      this.updateFilterValue({ filterName: this.filter.name, value: null });
      this.menu = false;
    }
  }
};
</script>
