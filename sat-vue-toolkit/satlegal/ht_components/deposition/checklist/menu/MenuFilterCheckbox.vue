<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="primary" class="text-capitalize">
        {{ name }}
        <v-icon class="ml-1">keyboard_arrow_down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in menuFilter"
        :key="index"
        @click="changeFilter(item)"
        :class="name === item.name ? `primary--text text-capitalize` : null"
      >
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import { filterCheckList } from "../../../../config";
export default {
  props: {
    nameFilters: String
  },
  data() {
    return {
      name: "",
      menuFilter: filterCheckList
    };
  },
  mounted() {
    this.name = this.menuFilter[1].name;
  },
  methods: {
    changeFilter(item) {
      this.name = item.name;
      this.$emit("filterCheckboxType", item);
    }
  },
  watch: {
    nameFilters(name) {
      this.name = name;
    }
  }
};
</script>
