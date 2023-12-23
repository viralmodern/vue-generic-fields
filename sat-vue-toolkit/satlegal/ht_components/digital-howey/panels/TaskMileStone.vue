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
            :value="startDateFormat"
            label="Start Date"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          :value="startDate"
          @input="
            $emit('update', { startDate: $event });
            menuStartDate = false;
          "
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
            :value="endDateFormat"
            label="Deadline"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          :value="endDate"
          :min="startDate"
          @input="
            $emit('update', { duaDate: $event });
            menuDeadline = false;
          "
          no-title
        ></v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>
<script>
import moment from "moment";
export default {
  props: {
    startDate: String,
    endDate: String
  },
  data() {
    return {
      menuStartDate: false,
      menuDeadline: false
    };
  },
  computed: {
    startDateFormat() {
      return moment(this.startDate).format("MM/DD/YYYY");
    },
    endDateFormat() {
      return moment(this.endDate).format("MM/DD/YYYY");
    }
  }
};
</script>
