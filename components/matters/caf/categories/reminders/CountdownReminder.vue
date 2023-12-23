<template>
  <countdown :time="time" :interval="100" tag="div">
    <template slot-scope="props">
      <v-chip :color="props.totalMilliseconds !== 0 ? 'success' : 'warning'" small>
        <v-icon small left>mdi-calendar-clock</v-icon>
        <strong>{{ props.days }}</strong> &nbsp; days,&nbsp;
        <strong>{{ props.hours }}</strong> &nbsp; hours,&nbsp;
        <strong>{{ props.minutes }}</strong> &nbsp; minutes, &nbsp;
        <strong>{{ props.seconds }}</strong> &nbsp; seconds
      </v-chip>
    </template>
  </countdown>
</template>

<script>
  import VueCountdown from "@chenfengyuan/vue-countdown"
  import momen from "moment"

  window.momen = momen
  export default {
    name: "CountdownReminder",
    components: {
      countdown: VueCountdown
    },
    props: {
      deadline: {
        type: String
      }
    },
    data () {
      let now = new Date()
      let newYear1 = new Date(now.getFullYear() + 1, 0, 1)
      let newYear = new Date(this.deadline)
      console.log("deadline", this.deadline)
      return {
        counting: false,
        time: newYear - now < 0 ? 0 : newYear - now
      }
    },
    methods: {
      startCountdown: function () {
        this.counting = true
      },
      handleCountdownEnd: function () {
        this.counting = false
      }
    }
  }
</script>

<style scoped>

</style>
