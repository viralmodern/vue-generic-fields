<template>
  <v-row no-gutters>
    <v-col cols="12" sm="6">
      <v-menu
        ref="menuStartDate"
        v-model="menuStartDate"
        :close-on-content-click="false"
        :nudge-right="40"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-on="on"
            v-model="startDateFormat"
            label="Start Date"
            prepend-icon="mdi-calendar"
            readonly
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="startDate"
          @input="changeStartDate(startDate)"
          no-title
        ></v-date-picker>
      </v-menu>
    </v-col>

    <v-col cols="12" sm="6">
      <v-menu
        ref="menuDeadline"
        v-model="menuDeadline"
        :close-on-content-click="false"
        :nudge-right="40"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-on="on"
            v-model="endDateFormat"
            label="Deadline"
            prepend-icon="mdi-calendar"
            readonly
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="endDate"
          :min="startDate"
          @input="changeEndDate(endDate)"
          no-title
        ></v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>
<script>
import moment from "moment";
import { mapActions } from "vuex";
import {$$STORE_PREFIX} from "../../utils";
export default {
  data: () => ({
    startDate: new Date().toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    menuStartDate: false,
    menuDeadline: false
  }),
  computed: {
    startDateFormat() {
      return moment(this.startDate).format("MM/DD/YYYY");
    },
    endDateFormat() {
      return moment(this.endDate).format("MM/DD/YYYY");
    }
  },
  methods: {
    changeStartDate(startDate) {
      this.menuStartDate = false;
      this.postSaveStartDate({ startDate: startDate });
    },
    changeEndDate(endDate) {
      this.menuDeadline = false;
      this.postSaveEndDate({ endDate: endDate });
    },
    ...mapActions("ht_store/task/detail/milestone", [
      "postSaveStartDate",
      "postSaveEndDate"
    ])
  }
};
</script>
