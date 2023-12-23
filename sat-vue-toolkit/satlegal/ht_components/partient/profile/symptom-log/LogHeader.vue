<template>
  <v-row class="align-center" no-gutters>
    <v-col cols="12" sm="2">
      <v-menu
        v-model="menu"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-on="on"
            v-model="picker"
            prepend-icon="mdi-calendar"
            readonly
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="picker"
          type="month"
          no-title
          scrollable
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="12" sm="10">
      <span v-for="item in appConfigs.symptomType" :key="item.name">
        <v-btn :color="item.color" class="white--text">{{ item.name }}</v-btn>
      </span>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    date: String
  },
  data() {
    return {
      menu: false,
      picker: this.date
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  watch: {
    picker: function(val) {
      this.$emit("changeDate", val);
    }
  }
};
</script>
