<template>
  <v-row no-gutters>
    <v-col cols="12">
    <div class="ml-4 text-body-2">Next filling deadline</div>
    </v-col>
    <v-row
      no-gutters
      class="justify-center align-center"
      v-if="isShow === true"
    >
      <v-row no-gutters class="ml-3">
        <div class="ml-2 text-xs-center">
          <div class="title">{{ days }}</div>
          <div>DAYS</div>
        </div>
        <div class="ml-3 text-xs-center">
          <div class="title">{{ hours > 10 ? hours : "0" + hours }}</div>
          <div>HOURS</div>
        </div>
        <div class="ml-3 text-xs-center">
          <div class="title">{{ minutes > 10 ? minutes : "0" + minutes }}</div>
          <div>MIN</div>
        </div>
        <div class="ml-3 text-xs-center">
          <div class="title">{{ seconds }}</div>
          <div>SEC</div>
        </div>
      </v-row>
      <v-btn icon @click="isShow = false">
        <v-icon>edit</v-icon>
      </v-btn>
    </v-row>

    <v-col cols="12" class="ml-3" v-else-if="isShow === false">
      <v-row no-gutters class="justify-center align-center">
        <v-menu
          v-model="menu"
          transition="scale-transition"
          offset-y
          :close-on-content-click="false"
          style="width: 100%"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              readonly
              v-on="on"
              v-model="date"
              label="Due date"
              persistent-hint
              prepend-icon="mdi-calendar"
            ></v-text-field>
          </template>
          <v-date-picker
            @change="changeDate"
            no-title
            v-model="date"
          ></v-date-picker>
        </v-menu>
        <v-btn icon @click="isShow = true">
          <v-icon>done</v-icon>
        </v-btn>
      </v-row>
    </v-col>
    <span class="red--text ml-3 mr-1 text-xs-center.">{{ message }}</span>
  </v-row>
</template>
<script>
import moment from "moment";
export default {
  props: {
    timeDeadline: String
  },
  data() {
    return {
      menu: false,
      days: "0",
      minutes: "0",
      hours: "0",
      seconds: "",
      interval: "",
      date: null,
      isShow: true,
      timerCountDown: "",
      message: ""
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      this.timerCount();
    }, 1000);
    this.date = new Date(this.timeDeadline).toISOString().substr(0, 10);
  },
  methods: {
    timerCount() {
      var timer = moment(this.date).format("MMM DD, YYYY hh:mm:ss");
      var countDownDate = new Date(timer).getTime();
      var now = new Date().getTime();
      var dist = countDownDate - now;
      if (dist < 0) {
        this.days = "0";
        this.hours = "0";
        this.minutes = "0";
        this.seconds = "0";
        this.message =
          "The date you selected is smaller than the current date. Please select again !";
      } else if (dist > 0) {
        this.message = "";
        this.calcTime(dist);
      }
    },
    calcTime(dist) {
      this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
    },
    changeDate(timer) {
      this.date = timer;
      this.menu = false;
    }
  }
};
</script>
