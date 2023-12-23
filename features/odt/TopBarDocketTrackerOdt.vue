<template>
  <TheTopBarOdt>
    <v-btn
      :to="{ path: `/` }"
      depressed
      class="caption text-transform-unset"
      small
      rounded
      text
    >
      <v-icon small left>mdi-home</v-icon>
      All Trackers
    </v-btn>
    <template v-if="!disabled">
      <template v-if="labelLink">
        <v-icon small class="mx-2">mdi-chevron-double-right</v-icon>
        <router-link
          :title="labelLink"
          class="white--text caption text-decoration-none text-no-wrap label_link text-decoration-unset"
          :to="pathLink"
          v-html="labelLink"
        />
      </template>
      <BtnLinkInFormation
        v-if="docketNumber"
        :row="docket"
        disabled-bookmark-row
        icon
        end-point="/api/trackers/"
        :attributes="attributes"
        main-cell-id="name"
      />
      <Bookmark
        v-if="docketNumber"
        :end-point="`/api/dockets/${$route.params.tracker}/`"
        :bookmarked="bookmarkedRow"
        @bookmarked="onBookmarked"
      />
      <v-spacer />
      <div
        style="width: 450px; transform: scale(0.6) translateX(20%)"
        v-if="docketNumber"
        id="search-recent-visit-docket-2"
      >
        <SearchRecentHistory
          :search="q"
          activator-id-container="#search-recent-visit-docket-2"
          :placeholder="`Search ${
            docketNumber ? `in ${docketNumber} Tracker` : ``
          }`"
          :recent-visit="recentVisit"
          @update-visit="updateVisit"
          @search-visit="search"
        />
      </div>
    </template>
  </TheTopBarOdt>
</template>

<script>
import BtnLinkInFormation from '@/features/odt/BtnLinkInFormation.vue'
import SearchRecentHistory from '~/features/odt/SearchRecentHistory.vue'
import Bookmark from '@/sat-vue-toolkit/components/Bookmark/Bookmark.vue'
import TheTopBarOdt from '~/features/odt/TheTopBarOdt.vue'
import {
  mutations,
  observableData,
} from '~/features/odt/store/docketTrackerOdtDetail'
import { mxAttributesTrackers } from '~/features/odt/mixins/mxAttributesTrackersOdt'
export default {
  name: 'TopBarDocketTrackerOdt',
  components: {
    TheTopBarOdt,
    Bookmark,
    SearchRecentHistory,
    BtnLinkInFormation,
  },
  mixins: [mxAttributesTrackers],
  data() {
    return {
      q: '',
      disabled: true,
    }
  },
  computed: {
    docket() {
      try {
        return observableData.data
      } catch (e) {
        return {}
      }
    },
    recentVisit() {
      return this.$store.getters['userSettings/configsRecentHistoryTracker']
    },
    docketNumber() {
      try {
        return this.docket.name
      } catch (e) {
        return false
      }
    },
    labelLink() {
      try {
        let { name } = this.docket
        return `${name}`
      } catch (e) {
        return false
      }
    },
    pathLink() {
      try {
        return {
          path: '/',
          query: {
            ...this.$route.query,
            trackerlink__tracker: this.docket.pk,
          },
        }
      } catch (e) {
        return '/'
      }
    },
    bookmarkedRow() {
      try {
        return this.docket['bookmarked_pk']
      } catch (e) {
        return false
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
    updateVisit({ visitItems, deleted }) {
      // todo update store recent visit
      let items = [...visitItems]
      if (items.length > 10) {
        items.length = 10
      }
      let options = { RECENT_HISTORY_TRACKER: [...items] }
      this.$store.dispatch('userSettings/updateSettingsOptionsUser', options)
    },
    search(e, { query }) {
      const {
        params: { tracker },
      } = this.$route
      this.$router.push({ path: `/odt/trackers/${tracker}/search`, query })
    },
    onBookmarked({ bookmarked }) {
      mutations.updateDetail({
        ...this.docket,
        bookmarked_pk: bookmarked,
      })
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
</style>
