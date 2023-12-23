<template>
  <v-card
    tile
    flat
    :loading="loading"
    min-width="250px"
    class="overflow-y-auto"
  >
    <div class="box_content_search fill-height">
      <v-card-text>
        <v-card tile flat>
          <SearchInputContentDocket
            :disabled-input-search="disabledInputSearch"
            v-model="q"
            :end-point="endPoint"
            @submitting="submitting"
            @submitted="submitted"
            @errored="errored"
          />
          <p class="mb-0">
            Results for <mark>"{{ q }}"</mark>
          </p>
        </v-card>
        <div class="d-flex align-center">
          <SearchCountThumbnailContentDocket
            v-if="countEntries"
            :content="contentCount"
          />
        </div>
        <SearchResultsInDocket
          :pinned-row="pinnedRow"
          :pinned-row-id="pinnedRowId"
          @click-row="(data) => $emit('click-row', data)"
          :attributes="attributesOpinions"
          :items="results"
          :type-odt-search="TYPE_ODT_SEARCH.OPINIONS"
        />
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import SearchInputContentDocket from '~/features/odt/SearchInputContentDocket'
import SearchCountThumbnailContentDocket from '~/features/odt/SearchCountThumbnailContentDocket'
import SearchResultsInDocket from '~/features/odt/SearchResultsInDocket'
import { TYPE_ODT_SEARCH } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import { $$strNumFormat } from '~/sat-vue-toolkit/functions'
import { mxOpinions } from '~/features/odt/mixins/attributesOpinions'
export default {
  name: 'SearchKeyWordOpinions',
  components: {
    SearchResultsInDocket,
    SearchCountThumbnailContentDocket,
    SearchInputContentDocket,
  },
  filters: {
    $$strNumFormat,
  },
  props: {
    height: {
      type: [String],
      default: () => '85vh',
    },
    disabledInputSearch: {
      type: Boolean,
      default: () => false,
    },
    TYPE_ODT_SEARCH: {
      default: () => TYPE_ODT_SEARCH,
    },
    endPoint: {
      type: String,
      default: `https://www.courtlistener.com/api/rest/v3/search/`,
    },
    resultsDocket: {
      type: Object,
      default: () => ({}),
    },
    keyWord: {
      type: String,
      default: () => '',
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
      q: '',
      resultsData: {},
      loading: false,
    }
  },
  mixins: [mxOpinions],
  watch: {
    keyWord: {
      immediate: true,
      handler(v) {
        this.q = v
      },
    },
  },
  computed: {
    contentCount() {
      return `<strong>${$$strNumFormat(
        this.countEntries
      )}</strong>&nbsp;Opinions`
    },
    results() {
      try {
        return this.resultsData['results']
      } catch (e) {
        return []
      }
    },
    countEntries() {
      try {
        return this.resultsData['count']
      } catch (e) {
        return 0
      }
    },
    caseNameInfo() {
      try {
        return this.resultsData['results'][0]
      } catch (e) {
        return {}
      }
    },
    courts() {
      try {
        return this.$store.getters['courts/list']
      } catch (e) {
        return []
      }
    },
  },
  methods: {
    submitting(queryRoute) {
      this.$emit('submitting', queryRoute)
      this.loading = true
    },
    submitted(data) {
      this.$emit('submitted', data)
      this.resultsData = data
      this.loading = false
    },
    errored(err) {
      this.$emit('errored', err)
      this.loading = false
    },
  },
}
</script>

<style scoped>
.box_content_search {
  border: solid 1px rgba(0, 0, 0, 0.05);
}
</style>
