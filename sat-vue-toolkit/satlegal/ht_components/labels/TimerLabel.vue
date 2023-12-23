<template>
  <span class="caption text--secondary" :title="time | $formatFullDateTime">{{timespan}}</span>
</template>

<script>
import moment from "moment";
import { $formatFullDateTime } from "@/sat-vue-toolkit/functions"
export default {
  filters: {
    $formatFullDateTime
  },
  props: {
    time: String
  },
  computed: {
    timespan() {
      if (!this.time) return "";
      return moment(this.time).fromNow();
    }
  }
};
</script>
