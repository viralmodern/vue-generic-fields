<template>
  <v-btn icon small @click="click">
    <v-icon small>mdi-information-outline</v-icon>
  </v-btn>
</template>

<script>
  export default {
    name: "LinkTooltipCell",
    props: {
      row: {
        type: Object,
        default: () => ({})
      },
      attribute: {
        type: Object,
        default: () => ({})
      },
      busEventHoverCell: {
        type: String,
        default: () => ''
      },
      cellPk: {
        type: String,
        default: () => ''
      }
    },
    methods: {
      click(e) {
        let {row, attribute: $$attribute, busEventHoverCell, cellPk} = this
        if(!busEventHoverCell || !cellPk) return
        this.$trigger(busEventHoverCell, {row, e, $$attribute, cellPk})
      }
    }
  }
</script>

<style scoped>

</style>
