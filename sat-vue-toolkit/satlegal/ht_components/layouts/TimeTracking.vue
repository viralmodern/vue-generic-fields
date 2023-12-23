<template>
  <v-col v-if="showTimeTrack" class="v-col-container">
    <v-btn icon v-if="!timer" @click="startTimer">
      <v-icon :size="type ? 30 : 25" :color="iconColor"
        >play_circle_filled</v-icon
      >
    </v-btn>
    <v-btn icon v-if="timer" @click="stopTimer">
      <v-icon :size="type ? 30 : 25" color="error">fiber_manual_record</v-icon>
    </v-btn>
    <span :class="type ? `text-h4 primary--text` : `text-h5`">{{
      minutes
    }}</span>
    <span :class="type ? `text-h4 primary--text` : `text-h5`">:</span>
    <span :class="type ? `text-h4 primary--text` : `text-h5`">{{
      seconds
    }}</span>
    <v-btn icon @click="resetTimer" v-if="!type">
      <v-icon :size="type ? 30 : 25" color="error">stop</v-icon>
    </v-btn>
  </v-col>
</template>
<script>
export default {
  props: {
    showTimeTrack: Boolean,
    iconColor: String,
    type: String
  },
  data() {
    return {
      timer: null,
      totalTime: 0 * 60,
      resetButton: false,
      hideTimeTrack: false,
      message: "",
      snackbar: false,
      resultSeconds: null,
      resultMinutes: null
    };
  },
  methods: {
    emitSnackbar(message) {
      this.snackbar = true;
      this.$emit("snackbar", this.snackbar, message);
    },
    startTimer() {
      this.timer = setInterval(() => this.countup(), 1000);
      this.resetButton = true;
      this.message = "Start counting time !";
      this.emitSnackbar(this.message);
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
      this.message = "Pause time !";
      this.emitSnackbar(this.message);
      if (this.type) {
        this.saveTimeTracking();
      }
    },
    resetTimer() {
      this.totalTime = 0 * 60;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
      this.saveTimeTracking();
      this.playHideTimeTrack();
    },
    padTime(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countup() {
      if (this.totalTime >= 0) {
        this.totalTime++;
      } else {
        this.totalTime = 0;
        this.resetTimer();
      }
    },
    playHideTimeTrack() {
      this.hideTimeTrack = false;
      this.message = "Time Finish !";
      if (!this.type) {
        this.emitSnackbar(this.message);
      }
      this.$emit("hideTimeTrack", this.hideTimeTrack);
    },
    saveTimeTracking() {
      const data = {
        minutes: this.resultMinutes,
        seconds: this.resultSeconds
      };
      this.$emit("emitTimeTracking", data);
      return data;
    },
    numberMinutes(minutes) {
      this.resultMinutes = minutes;
    },
    numberSenconds(seconds) {
      this.resultSeconds = seconds;
    }
  },
  computed: {
    minutes() {
      const minutes = Math.floor(this.totalTime / 60);
      return `${this.numberMinutes(minutes)}`, `${this.padTime(minutes)}`;
    },
    seconds() {
      const seconds = this.totalTime - this.minutes * 60;
      return `${this.numberSenconds(seconds)}`, `${this.padTime(seconds)}`;
    }
  },
  mounted() {
    this.$emit("emitStartTimer", this.startTimer);
  }
};
</script>
<style scoped>
.v-col-container {
  align-items: center;
  display: flex;
}
</style>
