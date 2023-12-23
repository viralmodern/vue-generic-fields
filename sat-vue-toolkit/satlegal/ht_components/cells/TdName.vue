<template>
  <td>
    <span>{{dataRow[column.name]}}</span>
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
