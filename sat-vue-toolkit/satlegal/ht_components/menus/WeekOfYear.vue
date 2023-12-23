<template>
  <div>
    <v-menu offset-x v-model="menu">
      <template v-slot:activator="{ on }">
        <div class="text-h4" v-on="on">
          Week {{ this.weekYear.week }}
          <span class="text--secondary">{{ this.weekYear.year }}</span>
        </div>
      </template>
      <v-list @click.native.stop class="px-2">
        <div class="title">Select the week of year</div>
        <v-divider class="mt-2"></v-divider>
        <v-row no-gutters class="align-center">
          <div style="width:80px">
            <v-select
              class="px-1"
              v-model="week"
              :items="weeks"
              menu-props="auto"
              label="Week"
            ></v-select>
          </div>
          <div style="width:80px">
            <v-select
              class="px-1"
              v-model="year"
              :items="years"
              menu-props="auto"
              label="Year"
            ></v-select>
          </div>
          <div>
            <v-btn class="my-0 primary" @click="submit">Ok</v-btn>
          </div>
        </v-row>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    weekYear: Object
  },
  data() {
    return {
      weeks: [],
      years: [],
      week: null,
      year: null,
      menu: false
    };
  },
  created() {
    for (let i = 1; i <= 52; i++) {
      this.weeks.push(i);
    }
    for (let i = 2000; i <= 2100; i++) {
      this.years.push(i);
    }
  },
  mounted() {
    this.week = this.weekYear.week;
    this.year = this.weekYear.year;
  },
  methods: {
    submit() {
      const data = {
        week: this.week,
        year: this.year
      };
      this.$emit("submit", data);
      this.menu = false;
    }
  },
  watch: {
    weekYear({ week, year }) {
      this.week = week;
      this.year = year;
    }
  }
};
</script>
