<template>
  <v-chip
    :color="itemChip.type === 1 ? 'green' : null ||
    itemChip.type === 2 ? 'lime' : null ||
    itemChip.type === 3 ? 'success' : null ||
    itemChip.type === 4 ? 'amber' : null ||
    itemChip.type === 5 ? 'brown' : null ||
    itemChip.type === 6 ? 'yellow' : null ||
    itemChip.type === 7 ? 'error' : null ||
    itemChip.type === 8 ? 'orange' : null ||
    itemChip.type === 9 ? 'primary' : null "
    small
    class="pa-1"
    text-color="white"
  >
    <v-avatar>
      <v-icon v-if="itemChip.type === 1">mdi-search</v-icon>
      <v-icon v-if="itemChip.type === 2">mdi-next_week</v-icon>
      <v-icon v-if="itemChip.type === 3">mdi-mail</v-icon>
      <v-icon v-if="itemChip.type === 4">mdi-flare</v-icon>
      <v-icon v-if="itemChip.type === 5">mdi-memory</v-icon>
      <v-icon v-if="itemChip.type === 6">mdi-book</v-icon>
      <v-icon v-if="itemChip.type === 7">mdi-speaker</v-icon>
      <v-icon v-if="itemChip.type === 8">mdi-attach_money</v-icon>
      <v-icon v-if="itemChip.type === 9">mdi-ballot</v-icon>
    </v-avatar>
    {{itemChip.name}}
  </v-chip>
</template>
<script>
export default {
  props: {
    itemChip: Object
  }
};
</script>
