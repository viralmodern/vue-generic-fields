<template>
  <td>
    <span v-if="dataRow.approvalDate !== ''">{{ dataRow.approvalDate | formatMMDDYYYY }}</span>
  </td>
</template>
<script>
export default {
  props: {
    dataRow: Object
  }
};
</script>



