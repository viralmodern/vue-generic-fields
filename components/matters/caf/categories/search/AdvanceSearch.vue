<template>
  <v-card flat>
    <filter-builder @onSave="onSaveFilter"/>
    <v-divider/>
    <results-advance-search v-if="uiShowResults"/>
  </v-card>
</template>

<script>
  import FilterBuilder from "./advance/filter_builder/FilterBuilder"
  import ResultsAdvanceSearch from "./advance/ResultsAdvanceSearch"

  export default {
    name: "AdvanceSearch",
    components: { ResultsAdvanceSearch, FilterBuilder },
    data () {
      return {
        uiShowResults: false
      }
    },
    methods: {
      onSaveFilter () {
        this.uiShowResults = true
      }
    }
  }
</script>

<style scoped>

</style>
