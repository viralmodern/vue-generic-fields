<template>
  <v-row no-gutters>
    <TimerLabel :time="date" />
  </v-row>
</template>

<script>
import TimerLabel from "../labels/TimerLabel";
export default {
  components: {
    TimerLabel
  },
  props: {
    date: String
  }
};
</script>

<style scoped></style>
