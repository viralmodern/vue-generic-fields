<template>
  <td>
    <span>{{dataRow.addedDate | formatMMDDYYYY}}</span>
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