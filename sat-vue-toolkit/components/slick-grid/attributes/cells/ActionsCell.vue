<template>
  <div>
    <v-btn icon
           @click="change"
           text
           x-small
           depressed>
      <v-icon small>mdi-dots-vertical</v-icon>
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: "ActionsCell",
    props: {
      actions: {
        type: Array,
        default: () => []
      },
      cellPk: {
        type: String,
        default: () => ''
      }
    },
    methods: {
      change(e) {
        this.$eventHub.$emit('menu-row-actions', {
          e,
          actions: this.actions,
        })
      }
    }
  }
</script>

<style scoped>

</style>
