<template>
  <v-row no-gutters>
    <v-col cols="12" sm="11">
      <CalendarHeatmap
        :values="values"
        :end-date="endDate"
        no-data-text="Not enought time entries for display"
        tooltip-unit="hours"
      />
    </v-col>
    <v-col cols="12" sm="1" class="px-0" shrink>
      <div class="title primary--text">
        <span>{{ totalHours }}</span>
        <span>&nbsp;hours</span>
      </div>
      <div class="text-caption text--secondary">On last 12 months</div>
    </v-col>
  </v-row>
</template>

<script>
import { CalendarHeatmap } from "vue-calendar-heatmap";
export default {
  props: {
    values: Array,
    endDate: String
  },
  computed: {
    totalHours() {
      if (!this.values) return 0;
      return this.values.map(x => x.count).reduce((a, b) => a + b, 0);
    }
  },
  components: {
    CalendarHeatmap
  }
};
</script>
