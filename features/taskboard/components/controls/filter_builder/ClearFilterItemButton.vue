<template>
  <v-btn color="grey" text small icon @click="handleClear">
    <v-icon small>mdi-close</v-icon>
  </v-btn>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'ClearFilterItemButton',
  props: ['item'],
  methods: {
    ...mapActions('filterBuilder', ['removeFilter']),
    handleClear() {
      this.removeFilter(this.item)
    },
  },
}
</script>

<style scoped></style>
