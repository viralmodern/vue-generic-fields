<template>
  <div v-if="dataRow.ctype === 'task'">{{ dataRow.object.dueDate |formatDMY }}</div>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  }
};
</script>
