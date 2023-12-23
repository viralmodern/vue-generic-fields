<template>
  <v-row>
    <v-col cols="12" class="pb-0">
      <v-btn
        style="font-size: 12px;"
        depressed
        small
        tile
        @click.stop="onAdd"
        class="text-capitalize"
        color="primary"
      >
        <v-icon small left>mdi-plus</v-icon>
        new filter
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FilterBuilderAddNew',
  methods: {
    ...mapActions('filterBuilder', ['addNewFilter']),
    onAdd() {
      this.addNewFilter()
    },
  },
}
</script>

<style scoped></style>
