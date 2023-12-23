<template>
  <div v-if="dataRow.object">{{ dataRow.object.duaDate |formatDMY }}</div>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  }
};
</script>
