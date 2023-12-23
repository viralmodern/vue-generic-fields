<template>
  <div>{{estimate}}</div>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    estimate() {
      if (this.dataRow.object) {
        return this.dataRow.object.estimation
          ? `${this.dataRow.object.estimation}h`
          : "";
      }
      return ""
    }
  }
};
</script>
