<template>
  <td>{{dataRow.addedDate | formatYYYYMMDD }}</td>
</template>

<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  }
}
</script>