<template>
  <td>
    <span>{{countTime}} years</span>
  </td>
</template>
<script>
import moment from "moment";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    countTime() {
      var timeNow = moment();
      var timeDateHappened = moment(this.dataRow.limitaion.date);
      var countDays = timeNow.diff(timeDateHappened, "days");
      return Math.ceil(countDays / 365 / 0.25) * 0.25;
    }
  }
};
</script>