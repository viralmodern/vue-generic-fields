<template>
  <div>
    <div>
      <template v-for="(item, index) in items">
        <SearchResultsInOpinionsItem
          @click-row="(data) => $emit('click-row', data)"
          v-if="typeOdtSearch === TYPE_ODT_SEARCH.OPINIONS"
          :key="index"
          :item="item"
          :attributes-opinions="attributes"
        >
          <template v-slot:attach-title-right>
            <template v-if="pinnedRow">
              <PinnedEntry
                :row="item"
                :session-id="pinnedRowId"
                :pinned="item['pinned']"
                icon
              />
            </template>
          </template>
        </SearchResultsInOpinionsItem>
        <SearchResultsInDocketItem v-else :key="index" :item="item">
          <template v-slot:attach-title-right>
            <template v-if="pinnedRow">
              <PinnedEntry
                :session-id="pinnedRowId"
                :row="item"
                :pinned="item['pinned']"
                icon
              />
            </template>
          </template>
        </SearchResultsInDocketItem>
      </template>
    </div>
  </div>
</template>

<script>
import SearchResultsInDocketItem from './SearchResultsInDocketItem.vue'
import { TYPE_ODT_SEARCH } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import SearchResultsInOpinionsItem from '@/features/odt/SearchResultsInOpinionsItem.vue'
import PinnedEntry from '@/sat-vue-toolkit/components/Pinned/PinnedEntry.vue'

export default {
  name: 'SearchResultsInDocket',
  components: {
    PinnedEntry,
    SearchResultsInOpinionsItem,
    SearchResultsInDocketItem,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    typeOdtSearch: {
      default: () => TYPE_ODT_SEARCH.OPINIONS,
    },
    attributes: {
      type: Array,
      default: () => [],
    },
    pinnedRow: {
      type: Boolean,
      default: () => false,
    },
    pinnedRowId: {
      type: String,
      default: () => ``,
    },
  },
  data() {
    return {
      TYPE_ODT_SEARCH,
    }
  },
}
</script>

<style scoped></style>
