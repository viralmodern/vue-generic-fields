<template>
  <td>
    <span>{{ date | formatMMDDYYYY }}</span>
  </td>
</template>
<script>
import moment from "moment"
export default {
  data() {
    return {
      date: ""
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  mounted() {
    this.date = moment(this.dataRow.createdDate).format('YYYY-MM-DD');
  }
};
</script>
