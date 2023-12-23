<template>
  <v-row no-gutters class="ml-1">
    <v-menu
      v-model="menuStartDate"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-on="on"
          prepend-icon="search"
          class="timePicker"
          v-model="startDate"
          label="From time"
          placeholder="From time"
          readonly
        ></v-text-field>
      </template>
      <v-date-picker
        @change="changeStartDate"
        v-model="startDate"
        no-title
        @input="menuStartDate = false"
      >
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="clearDate">Clear</v-btn>
      </v-date-picker>
    </v-menu>
  </v-row>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      status: false,
      menuStartDate: false,
      startDate: ""
    };
  },
  methods: {
    ...mapMutations("ht_store/project/research/facts/factsGrid", ["updateFilterValue"]),
    changeStartDate(v) {
      this.updateFilterValue({ filterName: "startdate", value: v });
    },
    clearDate() {
      this.startDate = "";
      this.updateFilterValue({ filterName: "startdate", value: null });
      this.menuStartDate = false;
    }
  }
};
</script>
<style scoped>
.timePicker {
  margin-top: 14px;
}
</style>
