<template>
  <v-row no-gutters class="align-center">
    <div class="mr-1">{{percent}}%</div>
    <v-progress-linear :color="color" v-model="totalChecked"></v-progress-linear>
  </v-row>
</template>

<script>
export default {
  props: {
    done: Number,
    totals: Number
  },
  computed: {
    color() {
      const totalPercentage = Math.round(this.totalChecked);
      if (totalPercentage === 100) {
        return "success";
      } else {
        return "primary";
      }
    },
    totalChecked() {
      if (!this.done) return 0;
      return (this.done * 100) / this.totals;
    },
    percent() {
      return Math.round(this.totalChecked);
    }
  }
};
</script>
