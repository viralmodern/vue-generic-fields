<template>
  <td>
    <v-switch
      style="justify-content: center;"
      hide-details
      class="ma-0"
      @change="$emit('update', $event)"
      :input-value="dataRow[column.name]"
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