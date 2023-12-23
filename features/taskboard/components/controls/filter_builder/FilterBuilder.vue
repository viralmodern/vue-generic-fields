<template>
  <v-card tile max-width="45vw">
    <v-card-text>
      <div v-if="hasFilters">
        <template v-for="(item, index) in allFilter">
          <FilterBuilderItem :item="item" :key="index" />
        </template>
      </div>
      <div v-else>
        <p class="ma-0">No Filters Applied</p>
        <p class="ma-0">
          Add a new filter to single out the items you want to see.
        </p>
      </div>
      <FilterBuilderAddNew />
    </v-card-text>
  </v-card>
</template>

<script>
import FilterBuilderItem from './FilterBuilderItem'
import FilterBuilderAddNew from './FilterBuilderAddNew'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FilterBuilder',
  components: {
    FilterBuilderAddNew,
    FilterBuilderItem,
  },
  data() {
    return {
      rows: [
        {
          id: 0,
        },
        {
          id: 1,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      allFilter: 'filterBuilder/allFilter',
    }),
    hasFilters() {
      try {
        return this.allFilter.length > 0
      } catch (e) {
        return false
      }
    },
  },
  mounted() {
    this.$eventHub
      .$on('change-tagables', this.changeLabels)
      .$on('add-filter', this.handleAddFilter)
      .$on('clear-filter', this.handleClearFilter)
  },
  methods: {
    ...mapActions('filterBuilder', ['addNewFilter']),
    handleAddFilter() {
      this.addNewFilter()
    },
    changeLabels(data) {
      console.log(data)
    },
    handleClearFilter(index) {
      this.rows.splice(index, 1)
    },
  },
}
</script>

<style lang="scss"></style>
