<template>
  <span>{{ hourTracking }}</span>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    calculateTimeWorklogs() {
      if (this.dataRow.object && this.dataRow.object.worklogs) {
        return (this.dataRow.object || []).worklogs
          .map(x => x.timeSpent)
          .reduce((a, b) => a + b, 0);
      } else {
        return 0;
      }
    },
    hourTracking() {
      if (this.calculateTimeWorklogs > 0) {
        var mins_num = parseFloat(this.calculateTimeWorklogs, 10);
        var hours = Math.floor(mins_num / 60);
        var minutes = Math.floor(mins_num - (hours * 3600) / 60);
        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        return hours + "h" + minutes;
      } else {
        return null;
      }
    }
  }
};
</script>
