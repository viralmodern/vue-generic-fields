<template>
  <TheTopBarOdt>
    <v-btn
      input-value="true"
      :to="rootPathHomeLink"
      depressed
      class="caption text-transform-unset"
      small
      rounded
      text
    >
      <v-icon small left>mdi-home</v-icon>
      {{ labelRoot }}
    </v-btn>
    <template v-if="publicTrackerDetail">
      <v-icon small class="mx-2">mdi-chevron-double-right</v-icon>
      <router-link
        :title="labelTracker.description"
        class="white--text caption text-decoration-none text-no-wrap label_link text-decoration-unset"
        :to="rootPath"
        v-html="labelTracker.name"
      />
    </template>
    <template v-if="labelLink">
      <v-icon small class="mx-2">mdi-chevron-double-right</v-icon>
      <router-link
        :title="labelLink"
        class="white--text caption text-decoration-none text-no-wrap label_link text-decoration-unset"
        :to="pathLink"
        v-html="labelLink"
      />
    </template>
    <template v-if="uiShowInformation">
      <BtnLinkInFormation
        :row="rowDetail"
        icon
        :end-point="endPointInformation.urlInformation"
        :attributes="attributesRow"
        :main-cell-id="endPointInformation.mainCellId"
      />
      <Bookmark
        :end-point="endPointInformation.urlBookmark"
        :bookmarked="endPointInformation.bookmarkedRow"
        @bookmarked="onBookmarked"
      />
    </template>
    <template v-if="uiShowWikipedia">
      <FaviconThumbnail v-if="wikipediaUrl" :domain-url="wikipediaUrl">
        <template v-slot:default="{ url }">
          <router-link replace :to="pathLinkWikipediaTracker" title="Wikipedia">
            <img :src="url" alt="" />
          </router-link>
        </template>
      </FaviconThumbnail>
    </template>
    <v-spacer />
    <div
      class="right-search-topbar"
      v-if="uiShowRightSearch"
      id="search-recent-visit-docket-2"
    >
      <SearchRecentHistory
        append-icon="mdi-filter"
        :search="q"
        activator-id-container="#search-recent-visit-docket-2"
        :placeholder="labelPlaceholderSearch"
        :recent-visit="recentVisit"
        @update-visit="updateVisit"
        @search-visit="search"
        @click-append="clickAppend"
      />
    </div>
  </TheTopBarOdt>
</template>

<script>
import BtnLinkInFormation from '@/features/odt/BtnLinkInFormation.vue'
import mxAttributesDockets from '@/features/odt/mixins/mxAttributesDockets'
import SearchRecentHistory from '~/features/odt/SearchRecentHistory.vue'
import Bookmark from '@/sat-vue-toolkit/components/Bookmark/Bookmark.vue'
import { mutations } from '~/features/odt/store/docketOdtDetail'
import TheTopBarOdt from '~/features/odt/TheTopBarOdt.vue'
import { mxAttributesPublicTrackers } from '~/features/odt/mixins/mxAttributesTrackersOdt'
import FaviconThumbnail from '~/sat-vue-toolkit/components/FaviconThumbnail.vue'
import { docketTrackerMixin } from '~/features/odt/mixins/mxDocketOdt'

export default {
  name: 'TopBarDocketsODT',
  components: {
    FaviconThumbnail,
    TheTopBarOdt,
    Bookmark,
    SearchRecentHistory,
    BtnLinkInFormation,
  },
  mixins: [mxAttributesDockets, mxAttributesPublicTrackers, docketTrackerMixin],
  data() {
    return {
      q: '',
    }
  },
  mounted() {
    this.getPublicTrackerDetail()
  },
  computed: {
    recentVisit() {
      return this.$store.getters[
        'userSettings/configsRecentHistoryDocketEntries'
      ]
    },
    rootPathHomeLink() {
      if (this.$$isTrackerDocketsOdt) {
        return `/`
      }
      return `${this.$$rootPathDocketOdt}`
    },
    rootPath() {
      return `${this.$$rootPathDocketOdt}`
    },
    pathLinkWikipediaTracker() {
      let { params } = this.$route
      return {
        name: `odt-tracking-all-wikipedia`,
        params,
      }
    },
    pathLink() {
      try {
        return `${this.rootPath}/${this.docket.pk}`
      } catch (e) {
        return `${this.rootPath}`
      }
    },
    bookmarkedRow() {
      try {
        return this.docket['bookmarked_pk']
      } catch (e) {
        return false
      }
    },
    labelRoot() {
      if (this.$$isTrackerDocketsOdt) {
        return `All Trackers`
      }
      return `All Dockets`
    },
    labelPlaceholderSearch() {
      let { docketNumber, $$isTrackerDocketsOdt, publicTrackerDetail } = this
      let label = `Search`,
        middle = ``,
        end = ``
      if (docketNumber) {
        middle = `${docketNumber ? `in ${docketNumber}` : ``}`
      } else if ($$isTrackerDocketsOdt) {
        let trackerName =
          (publicTrackerDetail && publicTrackerDetail.name) || ``
        middle = `${trackerName ? `in ${trackerName}` : ``}`
      }
      if ($$isTrackerDocketsOdt) {
        end = `Tracker`
      }
      return `${label} ${middle} ${end}`
    },

    uiShowRightSearch() {
      let { $$isTrackerDocketsOdt, docketNumber } = this
      return docketNumber || $$isTrackerDocketsOdt
    },
    uiShowInformation() {
      let { $$isTrackerDocketsOdt, docketNumber } = this
      return docketNumber || $$isTrackerDocketsOdt
    },
    uiShowWikipedia() {
      let { $$isTrackerDocketsOdt, docketNumber } = this
      return !docketNumber && $$isTrackerDocketsOdt
    },
    wikipediaUrl() {
      let { uiShowWikipedia, rowDetail } = this
      if (uiShowWikipedia)
        return (rowDetail && rowDetail['wikipedia_url']) || false
      return false
    },
    attributesRow() {
      let { $$isTrackerDocketsOdt, docketNumber } = this
      if (docketNumber) {
        return this.attributes
      } else {
        return this.attributesPublicTrackers
      }
    },
    rowDetail() {
      let { docketNumber, docket, publicTrackerDetail } = this
      if (docketNumber) {
        return docket
      }
      return publicTrackerDetail
    },
    endPointInformation() {
      let {
        docketNumber,
        docket,
        publicTrackerDetail,
        $route: { params },
      } = this
      let urlInformation = ``,
        urlBookmark = ``,
        mainCellId = ``,
        bookmarkedRow = ``
      if (docketNumber) {
        urlInformation = `/api/dockets/`
        urlBookmark = `/api/dockets/${params.docket}/`
        mainCellId = `docket_number`
        bookmarkedRow = (docket && docket['bookmarked_pk']) || null
      } else {
        let { pathMatch } = params
        urlInformation = `/api/public-trackers/`
        urlBookmark = `/api/public-trackers/${pathMatch}/`
        mainCellId = `name`
        bookmarkedRow =
          (publicTrackerDetail && publicTrackerDetail['bookmarked_pk']) || null
      }
      return {
        urlInformation,
        urlBookmark,
        mainCellId,
        bookmarkedRow,
      }
    },
  },
  watch: {
    '$route.query.q': {
      immediate: true,
      handler(v) {
        this.q = v
      },
    },
  },
  methods: {
    getPublicTrackerDetail() {
      let { $$isTrackerDocketsOdt } = this
      if (!$$isTrackerDocketsOdt) {
        return
      }
      let {
        params: { pathMatch },
      } = this.$route
      this.$store.dispatch('publicTrackersOdt/getTrackerDetail', pathMatch)
    },
    updateVisit({ visitItems, deleted }) {
      // todo update store recent visit
      let items = [...visitItems]
      if (items.length > 10) {
        items.length = 10
      }
      let options = { RECENT_HISTORY_DOCKET_ENTRIES: [...items] }
      this.$store.dispatch('userSettings/updateSettingsOptionsUser', options)
    },
    search(e, { query }) {
      // if (!this.q) return
      const {
        params: { docket },
      } = this.$route
      let queryRoute = this.$route.query || {}
      let { docketNumber } = this
      if (docketNumber) {
        this.$router.push({
          path: `${this.rootPath}/${docket}/search`,
          query: { ...queryRoute, ...query },
        })
      } else {
        this.$router.push({
          path: `${this.rootPath}/search`,
          query: { ...queryRoute, ...query },
        })
      }
    },
    clickAppend() {
      // todo clickAppend trigger event search panel
      this.$trigger('$openSearchPanel')
    },
    onBookmarked({ bookmarked }) {
      let { docketNumber } = this
      if (docketNumber) {
        mutations.updateDetail({
          ...this.docket,
          bookmarked_pk: bookmarked,
        })
      } else {
        this.getPublicTrackerDetail()
      }
    },
  },
}
</script>

<style scoped>
.label_link {
  max-width: 45%;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

.right-search-topbar {
  width: 450px;
  transform: scale(0.6) translateX(20%);
}
</style>
