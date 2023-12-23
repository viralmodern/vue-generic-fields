<template>
  <div v-if="dataRow.ctype === 'task'">In Progress</div>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  }
};
</script>
