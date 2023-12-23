<template>
   <v-row no-gutters class="align-center" style="width:100%">
    <span class="caption text--secondary">{{ percent }}%</span>
    <v-progress-linear class="ma-0" :color="showColor(percent)" :value="percent"></v-progress-linear>
  </v-row>
</template>

<script>
export default {
  props: {
    name: String,
    done: Number,
    total: Number
  },
  computed: {
    percent() {
      if (!this.done) return 0;
      return (this.done * 100) / this.total;
    }
  },
  methods: {
    showColor(e) {
      if (e <= 20) {
        return "red darken-1";
      } else if (e <= 40) {
        return "red accent-1";
      } else if (e <= 60) {
        return "orange darken-1";
      } else if (e <= 80) {
        return "amber darken-1";
      } else if (e <= 90) {
        return "green darken-1";
      } else {
        return "light-green darken-1";
      }
    }
  }
};
</script>
