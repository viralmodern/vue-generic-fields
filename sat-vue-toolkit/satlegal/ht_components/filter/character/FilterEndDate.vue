<template>
  <v-row no-gutters class="ml-1">
    <v-menu
      v-model="menuEndDate"
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
          v-model="endDate"
          label="To time"
          placeholder="To time"
          readonly
        ></v-text-field>
      </template>
      <v-date-picker
        @change="changeEndtDate"
        v-model="endDate"
        no-title
        @input="menuEndDate = false"
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
      menuEndDate: false,
      endDate: ""
    };
  },
  methods: {
    ...mapMutations("ht_store/matter/character/characterProfile/character", [
      "updateFilterValue"
    ]),
    changeEndtDate(v) {
      this.updateFilterValue({ filterName: "enddate", value: v });
    },
    clearDate() {
      this.endDate = "";
      this.updateFilterValue({ filterName: "enddate", value: null });
      this.menuEndDate = false;
    }
  }
};
</script>
