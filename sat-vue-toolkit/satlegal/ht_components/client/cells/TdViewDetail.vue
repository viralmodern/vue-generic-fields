<template>
  <td>
    <v-btn :to="`/client/profile/${this.dataRow.id}`" class="ma-0" icon exact>
      <v-icon color="#757575" size="18">visibility</v-icon>
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
