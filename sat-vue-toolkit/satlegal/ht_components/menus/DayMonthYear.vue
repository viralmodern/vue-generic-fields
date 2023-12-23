<template>
  <v-menu :close-on-content-click="false" offset-x v-model="menu">
    <template v-slot:activator="{ on }">
      <div v-on="on" class="text-h4">
        {{ this.dayMonthYear.day }}, {{ monthName(this.dayMonthYear.month) }}
        <span class="text--secondary">{{ this.dayMonthYear.year }}</span>
      </div>
    </template>
    <v-date-picker
      :value="pickerValue"
      no-title
      @change="changeDate"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    menu: false
  }),
  props: {
    dayMonthYear: Object
  },
  methods: {
    monthName(month) {
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ][month % 12];
    },
    changeDate(v) {
      const d = new Date(v);
      this.$emit("submit", {
        day: d.getDate(),
        month: d.getMonth(),
        year: d.getFullYear()
      });
      this.menu = false;
    }
  },
  computed: {
    pickerValue() {
      return `${this.dayMonthYear.year}-${(
        this.dayMonthYear.month +
        1 +
        ""
      ).padStart(2, "0")}-${(this.dayMonthYear.day + "").padStart(2, "0")}`;
    }
  }
};
</script>
