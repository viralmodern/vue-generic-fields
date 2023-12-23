<template>
  <div v-if="dataRow.ctype === 'task'">{{ dataRow.duration | fromSecondsToDays }} days</div>
</template>
<script>
  import { fromSecondsToDays } from "@/sat-vue-toolkit/satlegal/ht_plugins/filter"

  export default {
    filters: {
      fromSecondsToDays
    },
  props: {
    dataRow: Object,
    column: Object
  },
};
</script>
