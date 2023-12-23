<template>
  <span>{{display}}</span>
</template>

<script>
import moment from "moment";

export default {
  timeout: null,
  props: {
    expired: String
  },
  data() {
    return {
      guid: 0
    };
  },
  mounted() {
    this.timeout = setInterval(() => {
      this.guid++;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timeout);
  },
  computed: {
    display() {
      if (!this.expired) return "You have not set a deadline";
      var diff = moment
        .utc(this.expired)
        .local()
        .diff(moment(new Date()));
      if (diff < 0) return "Expired";
      const d = moment.utc(
        moment.duration(diff).asMilliseconds() + this.guid - this.guid
      );
      const days = d.get("date");
      const month = d.get("month");
      if (month - 1 > 0 && days - 1 > 0) {
        return `${month - 1} month, ${days - 1} day, ${d.format("HH:mm:ss")}`;
      }
      if (days - 1 > 0) {
        return `${days - 1} day, ${d.format("HH:mm:ss")}`;
      }
      return d.format("HH:mm:ss");
    }
  }
};
</script>
