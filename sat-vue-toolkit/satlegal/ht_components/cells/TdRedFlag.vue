<template>
  <td>
    <v-btn class="ma-0" @click="$emit('update', !dataRow[column.name])" icon>
      <v-icon :color="dataRow[column.name] ? 'red' : 'grey lighten-2'">mdi-flag</v-icon>
    </v-btn>
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
