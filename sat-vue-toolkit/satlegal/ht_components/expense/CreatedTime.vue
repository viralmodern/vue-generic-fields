<template>
  <td>
    <span>{{ time }}</span>
  </td>
</template>
<script>
export default {
  data() {
    return {
      time: ""
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  mounted() {
    this.time = this.dataRow.createTtime;
  }
};
</script>
