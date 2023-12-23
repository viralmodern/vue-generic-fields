<template>
  <td>
    <v-btn class="ma-0" icon>
      <v-icon color="#757575" size="18">mdi-eye</v-icon>
    </v-btn>
  </td>
</template>
<script>
export default {
  props: {
    column: Object,
    dataRow: Object
  }
};
</script>
