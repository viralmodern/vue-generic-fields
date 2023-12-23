<template>
  <td>{{dataRow.payments}}</td>
</template>

<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  }
};
</script>