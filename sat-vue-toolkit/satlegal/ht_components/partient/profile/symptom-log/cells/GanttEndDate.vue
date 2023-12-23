<template>
  <div>{{ dataRow.endDate | formatDMY }}</div>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  }
};
</script>
