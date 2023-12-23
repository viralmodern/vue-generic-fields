<template>
  <div>
    <EntityOccurrenceExplorerHeatMap
      :count="100"
      style="z-index: 2;"
      @cell-click="cellClick"
    />
    <v-navigation-drawer v-model="uiShowModal" fixed right width="65vw">
      <v-card class="fill-height" flat>
        <v-btn absolute icon small right top @click="closeModal">
          <v-icon small>mdi-close</v-icon>
        </v-btn>
        <v-card-title> Fact Entries ({{ totalEntries }})</v-card-title>
        <v-card-text>
          <div v-if="row">
            <p>{{ row.y }} - {{ row.x.name }}</p>
          </div>
        </v-card-text>
        <div>
          <GridAllFactsOfEntityCoOccurrences
            height="79.2vh"
            disabled-overflow-scroll-body
          />
        </div>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
import EntityOccurrenceExplorerHeatMap from '~/features/odt/EntityOccurrenceExplorerHeatMap'
import GridAllFactsOfEntityCoOccurrences from '~/features/odt/GridAllFactsOfEntityCoOccurrences'
export default {
  components: {
    GridAllFactsOfEntityCoOccurrences,
    EntityOccurrenceExplorerHeatMap,
  },
  data() {
    return {
      uiShowModal: false,
      row: null,
    }
  },
  mounted() {
    document.documentElement.classList.remove('no_scroll')
  },
  computed: {
    totalEntries() {
      try {
        return Number(this.row.value)
      } catch (e) {
        return false
      }
    },
  },
  methods: {
    cellClick(row) {
      this.uiShowModal = true
      this.row = row
    },
    closeModal() {
      this.uiShowModal = false
      this.row = null
    },
  },
}
</script>

<style scoped></style>
