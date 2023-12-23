<template>
  <td>
    <div v-if="countdown === true" class="check-year error"></div>
    <div v-else>Countdown {{countdown}} years</div>
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
    countdown() {
      var timeNow = moment();
      var timeDateHappened = moment(this.dataRow.limitaion.date);
      var countDays = timeNow.diff(timeDateHappened, "days");
      var gapTime = Math.ceil(countDays / 365 / 0.25) * 0.25;
      if (gapTime > this.dataRow.limitaion.yearLimitation) {
        return true;
      } else {
        return this.dataRow.limitaion.yearLimitation - gapTime;
      }
    }
  }
};
</script>
<style scoped>
.check-year {
  width: 200px;
  height: 30px;
}
</style>
