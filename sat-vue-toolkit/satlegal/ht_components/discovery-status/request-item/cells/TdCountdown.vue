<template>
  <td>
    <CountDown style="white-space: nowrap;" :expired="dataRow.deadline" />
  </td>
</template>

<script>
import CountDown from "../../../inputs/CountDown";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  components: {
    CountDown
  }
};
</script>
