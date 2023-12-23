<template>
  <v-list>
    <v-row no-gutters class="px-2 align-center">
      <v-col cols="12" sm="4">
        <v-row no-gutters>
          <v-col cols="12" sm="9">
            <v-text-field
              prepend-inner-icon="search"
              class="ma-0 pa-0 custom-text-field"
              hide-details
              label="Type to search"
              solo
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="4" class="text-xs-center">
        <WeekOfYear
          v-if="type === 1"
          :weekYear="weekYear"
          @submit="changeWeekOfYear"
        />
        <MonthOfYear
          v-else-if="type === 2"
          :monthYear="monthYear"
          @submit="changeMonthOfYear"
        />
        <DayMonthYear
          v-else
          :dayMonthYear="dayMonthYear"
          @submit="changeDayMonthYear"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-row no-gutters class="justify-end">
          <PrevAndNextCalendar class="mr-3" @prev="prev" @next="next" />
          <v-btn-toggle :value="type" @change="change" mandatory>
            <v-btn class="px-3" :value="0">Day</v-btn>
            <v-btn class="px-3" :value="1">Week</v-btn>
            <v-btn class="px-3" :value="2">Month</v-btn>
          </v-btn-toggle>
        </v-row>
      </v-col>
    </v-row>
  </v-list>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import moment from "moment";
import WeekOfYear from "../menus/WeekOfYear";
import MonthOfYear from "../menus/MonthOfYear";
import DayMonthYear from "../menus/DayMonthYear";
import PrevAndNextCalendar from "../calendar/PrevAndNextCalendar";

export default {
  components: {
    WeekOfYear,
    MonthOfYear,
    DayMonthYear,
    PrevAndNextCalendar
  },
  computed: {
    ...mapGetters("ht_store/project/resources", [
      "weekYear",
      "monthYear",
      "dayMonthYear",
      "endDate",
      "type"
    ])
  },
  methods: {
    change(type) {
      this.updateType(type);
    },
    changeWeekOfYear({ week, year }) {
      this.updateWeekYear({ week, year });
    },
    changeMonthOfYear({ month, year }) {
      this.updateMonthYear({ month, year });
    },
    changeDayMonthYear({ day, month, year }) {
      this.updateDayMonthYear({ day, month, year });
    },
    prev() {
      switch (this.type) {
        case 1: //week
          if (this.weekYear.week === 1) {
            this.updateWeekYear({ week: 52, year: this.weekYear.year - 1 });
          } else {
            this.updateWeekYear({
              week: this.weekYear.week - 1,
              year: this.weekYear.year
            });
          }
          break;
        case 2: //month
          if (this.monthYear.month === 0) {
            this.updateMonthYear({ month: 11, year: this.monthYear.year - 1 });
          } else {
            this.updateMonthYear({
              month: this.monthYear.month - 1,
              year: this.monthYear.year
            });
          }
          break;
        default: {
          let momentDate = moment([
            this.dayMonthYear.year,
            this.dayMonthYear.month,
            this.dayMonthYear.day
          ]);
          momentDate.add(-1, "day");
          this.updateDayMonthYear({
            day: momentDate.date(),
            month: momentDate.month(),
            year: momentDate.year()
          });
          break;
        }
      }
    },
    next() {
      switch (this.type) {
        case 1: //week
          if (this.weekYear.week === 52) {
            this.updateWeekYear({ week: 1, year: this.weekYear.year + 1 });
          } else {
            this.updateWeekYear({
              week: this.weekYear.week + 1,
              year: this.weekYear.year
            });
          }
          break;
        case 2: //month
          if (this.monthYear.month === 11) {
            this.updateMonthYear({ month: 0, year: this.monthYear.year + 1 });
          } else {
            this.updateMonthYear({
              month: this.monthYear.month + 1,
              year: this.monthYear.year
            });
          }
          break;
        default: {
          let momentDate = moment([
            this.dayMonthYear.year,
            this.dayMonthYear.month,
            this.dayMonthYear.day
          ]);
          momentDate.add(1, "day");
          this.updateDayMonthYear({
            day: momentDate.date(),
            month: momentDate.month(),
            year: momentDate.year()
          });
          break;
        }
      }
    },
    ...mapMutations("ht_store/project/resources", [
      "updateWeekYear",
      "updateMonthYear",
      "updateType",
      "updateDayMonthYear"
    ])
  }
};
</script>

<style scoped>
.custom-text-field /deep/ .v-input__control {
  min-height: 40px;
}
</style>
