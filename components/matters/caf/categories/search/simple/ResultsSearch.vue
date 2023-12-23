<template>
    <div>
        <template v-for="(item, index) in items">
            <results-search-item class="mb-2"
                                 :key="index"
                                 :item="item"/>
            <v-divider :key="'dfv-'+index" v-if="index !== items.length - 1"></v-divider>
        </template>
    </div>
</template>

<script>
  import ResultsSearchItem from "./ResultsSearchItem"

  export default {
    name: "ResultsSearch",
    components: { "results-search-item": ResultsSearchItem },
    props: {
      items: {
        type: Array,
        default: () => []

      }
    }
  }
</script>

<style scoped>

</style>
