<template>
  <span v-if="(dataRow.object || {}).worklogs">{{ dataRow.object.worklogs }}h</span>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  }
};
</script>
