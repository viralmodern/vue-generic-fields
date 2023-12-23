<template>
  <td>
    <v-switch
      hide-details
      class="ma-0"
      @change="$emit('update', $event)"
      :input-value="dataRow.objection"
    ></v-switch>
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