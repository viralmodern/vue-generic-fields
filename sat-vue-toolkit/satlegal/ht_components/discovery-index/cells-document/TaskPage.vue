<template>
  <td>
    <span>{{dataRow.page}}</span>
  </td>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  }
};
</script>