<template>
  <td>{{dataRow.receivedDate | formatYYYYMMDD }}</td>
</template>

<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  }
}
</script>