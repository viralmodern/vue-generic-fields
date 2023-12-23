<template>
  <td>
    <v-chip small :color="dataRow[column.name].color" label class="white--text">
      <span>{{ dataRow[column.name].name }}</span>
    </v-chip>
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
