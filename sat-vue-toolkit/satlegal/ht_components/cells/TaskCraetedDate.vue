<template>
  <td>{{dataRow.createdDate | formatYYYYMMDD }}</td>
</template>

<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  }
};
</script>