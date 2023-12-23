<template>
  <td>
    <v-badge class="badge ml-1" overlap color="purple">
      <template v-slot:badge>
        <span>{{dataRow.message}}</span>
      </template>
      <v-icon color="grey">mdi-mail</v-icon>
    </v-badge>
  </td>
</template>

<script>
export default {
  props: {
    dataRow: Object
  }
};
</script>
