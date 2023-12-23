<template>
  <v-btn color="grey" text small icon @click="handleClear">
    <v-icon small>mdi-close</v-icon>
  </v-btn>
</template>
<script>
export default {
  name: 'ClearFilterItemButton',
  props: ['item'],
  methods: {
    handleClear() {
      this.$trigger('removeFilter', this.item)
    },
  },
}
</script>

<style scoped></style>
