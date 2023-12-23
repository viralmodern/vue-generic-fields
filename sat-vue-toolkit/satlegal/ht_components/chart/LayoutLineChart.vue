<template>
  <v-col cols="12">
    <v-col cols="12">
      <v-row no-gutters class="justify-space-between">
        <v-col sm="2">
          <v-select
            v-model="select"
            :items="items"
            item-text="state"
            item-value="id"
            label="Select"
            persistent-hint
            return-object
            class="ml-2 mr-2"
            @change="seeBy"
          ></v-select>
        </v-col>

        <v-col sm="6">
          <v-row no-gutters>
            <v-col lg="6">
              <v-select
                v-if="see === 'months'"
                v-model="months"
                :items="itemsMonths"
                item-text="state"
                item-value="id"
                label="Month"
                return-object
                class="ml-2 mr-2"
                @change="getMonth"
              ></v-select>
            </v-col>

            <v-col lg="6">
              <v-select
                v-model="years"
                :items="itemsYears"
                item-text="state"
                item-value="id"
                label="Years"
                return-object
                class="ml-2 mr-2"
                @change="getYear"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <div>
      <LineChart
        v-if="see === 'years'"
        :arrCurrentMonthDays="arrCurrentMonth"
        :dataChartOfYears="dataChartOfYears"
      />
      <LineChart
        v-if="see === 'months'"
        :arrCurrentMonthDays="arrCurrentDays"
        :dataChartOfYears="dataChartOfYears"
      />
    </div>
  </v-col>
</template>
<script>
import moment from "moment";
import { implementYear, implementMonth } from "../../config";
import LineChart from "./LineChart";
export default {
  components: {
    LineChart
  },
  props: {
    dataLineChart: Object
  },
  data() {
    return {
      see: "months",
      select: { state: "Months", id: "months" },
      items: [
        { state: "Months", id: "months" },
        { state: "Years", id: "years" }
      ],
      currentYears: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      months: { id: new Date().getMonth() + 1 },
      years: { id: new Date().getFullYear() },
      itemsMonths: implementMonth,
      itemsYears: implementYear,
      arrCurrentMonth: [],
      arrCurrentDays: []
    };
  },

  methods: {
    seeBy(e) {
      this.see = e.id;
    },
    getYear(e) {
      this.currentYears = e.state;
    },
    getMonth(e) {
      this.currentMonth = e.state;
    },
    takeTheDaysOfTheMonth() {
      var date = new Date(this.currentYears, this.currentMonth - 1, 1);
      var days = [];
      while (date.getMonth() === this.currentMonth - 1) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      this.arrCurrentDays = days.map(e => moment(e).format("DD"));
    }
  },

  mounted() {
    this.takeTheDaysOfTheMonth();
  },

  computed: {
    dataChartOfYears() {
      var month = this.currentMonth;
      var date = month + "/" + this.currentYears;
      var chartData = this.dataLineChart;
      if (this.see === "months") {
        return chartData.dataDays.filter(item => {
          return item.date.toLowerCase().includes(String(date).toLowerCase());
        });
      } else if (this.see === "years") {
        return chartData.dataMonth.filter(item => {
          return item.date
            .toLowerCase()
            .includes(String(this.currentYears).toLowerCase());
        });
      } else {
        return [];
      }
    }
  },

  watch: {
    currentMonth(val) {
      this.currentMonth = val;
      if (this.see === "months") {
        this.takeTheDaysOfTheMonth();
      }
    },

    currentYears(val) {
      this.currentYears = val;
      if (this.see === "months") {
        this.takeTheDaysOfTheMonth();
        return this.dataChartOfYears;
      }
    },

    see(val) {
      if (val === "years") {
        this.arrCurrentMonth = Array.apply(0, Array(12)).map(function(_, i) {
          return moment()
            .month(i)
            .format("MMM");
        });
      } else {
        this.takeTheDaysOfTheMonth();
      }
    }
  }
};
</script>
