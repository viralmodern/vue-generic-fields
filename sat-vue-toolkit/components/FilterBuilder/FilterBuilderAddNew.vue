<template>
  <v-btn max-width="unset"
         @click="onAdd"
         depressed
         text
         small
         min-width="unset"
         width="unset"
         class="text-capitalize text-caption"
         style="border-radius: 0px;"
         color="primary">
    <v-icon x-small style="transform: translateY(1px)">mdi-plus</v-icon>
    New filter
  </v-btn>
</template>

<script>
export default {
  name: 'FilterBuilderAddNew',
  methods: {
    onAdd() {
      this.$trigger('addNewFilter');
      // this.addNewFilter()
    },
  },
}
</script>

<style scoped></style>
