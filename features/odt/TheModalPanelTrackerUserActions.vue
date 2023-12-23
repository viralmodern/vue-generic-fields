<template>
  <div>
    <v-menu
      open-on-click
      offset-x
      :close-on-content-click="false"
      v-model="uiShowMenu"
      :activator="activatorId"
    >
      <v-card
        flat
        v-click-outside="closeMenuPanel"
        width="300px"
        class="overflow-hidden overflow-y-auto"
      >
        <v-card-text>
          <template v-if="uiShowContent.isCaseName">
            <SearchInput
              v-model="q"
              :default-style="false"
              :placeholder="placeholder"
              @searchSubmit="onSearch"
            />
            <ContentPanelTrackerUserActions :row="row" />
          </template>
          <template v-if="uiShowContent.isNatureOfSuit">
            <ThumbnailNatureOfSuit v-bind="natureOfSuitOptions" />
          </template>
          <template v-if="uiShowContent.isCause">
            <ThumbnailCauseTooltip
              v-bind="causeOptions"
              @onExpand="onExpandPanel"
            />
          </template>
          <template v-if="uiShowContent.isJurisdiction">
            <ThumbnailCauseTooltip
              v-bind="jurisdictionOptions"
              @onExpand="onExpandPanel"
            />
          </template>
        </v-card-text>
      </v-card>
    </v-menu>
    <PanelDocketTrackerThumbnail v-model="uiShowPanel">
      <template v-if="uiShowContent.isCause">
        <CauseDetailDocketTracker />
      </template>
      <template v-if="uiShowContent.isJurisdiction">
        <WikipediaJurisdiction v-bind="jurisdictionOptions" />
      </template>
    </PanelDocketTrackerThumbnail>
  </div>
</template>

<script>
import SearchInput from '@/components/utils/SearchInput.vue'
import ContentPanelTrackerUserActions from '~/features/odt/ContentPanelTrackerUserActions.vue'
import ThumbnailNatureOfSuit from '@/features/odt/ThumbnailNatureOfSuit.vue'
import ThumbnailCauseTooltip from '@/features/odt/ThumbnailCauseTooltip.vue'
import PanelDocketTrackerThumbnail from '~/features/odt/PanelDocketTrackerThumbnail.vue'
import WikipediaJurisdiction from '~/features/odt/WikipediaJurisdiction.vue'
import CauseDetailDocketTracker from '~/features/odt/CauseDetailDocketTracker.vue'
import debounce from 'lodash/debounce'
export default {
  name: 'TheModalPanelTrackerUserActions',
  components: {
    CauseDetailDocketTracker,
    WikipediaJurisdiction,
    PanelDocketTrackerThumbnail,
    ThumbnailCauseTooltip,
    ThumbnailNatureOfSuit,
    ContentPanelTrackerUserActions,
    SearchInput,
  },
  data() {
    return {
      activatorId: null,
      row: null,
      q: '',
      attributeName: null,
      uiShowPanel: false,
      uiShowMenu: false,
    }
  },
  computed: {
    rootPath() {
      let { row } = this
      let entry = (row && row['pk']) || false
      if (entry) {
        return `${this.$$rootPathDocketOdt}/${entry}`
      }
      return `${this.$$rootPathDocketOdt}`
    },
    placeholder() {
      try {
        let { row } = this
        return `Search in ${row.docket_number} Tracker`
      } catch (e) {
        return ``
      }
    },
    uiShowContent() {
      let { attributeName } = this
      let isNatureOfSuit = attributeName && attributeName === 'nature_of_suit'
      let isCaseName = attributeName && attributeName === 'case_name'
      let isCause = attributeName && attributeName === 'cause'
      let isJurisdiction = attributeName && attributeName === 'court'
      return {
        isNatureOfSuit,
        isCaseName,
        isCause,
        isJurisdiction,
      }
    },
    natureOfSuitOptions() {
      let { row } = this
      let title, code, description
      title = (row && row['nature_of_suit']) || ``
      return {
        title,
        code,
        description,
      }
    },
    causeOptions() {
      let { row } = this
      let title, code, description
      title = (row && row['cause']) || ``
      return {
        title,
        description,
      }
    },
    jurisdictionOptions() {
      let { row } = this
      let courtId = (row && row['court']) || '',
        courtInfo
      courtInfo = this.$store.getters['appConfigs/findCourtById'](courtId)
      let title = (courtInfo && courtInfo['full_name']) || ''
      console.error(courtInfo)
      return {
        title,
        courtInfo,
      }
    },
  },
  events: {
    hoverCaseName(evt, { e, row, $$attribute, hide, cellPk }) {
      let { name } = $$attribute
      this.setAttributeName(name)
      if (hide) {
        this.closeMenuPanel(cellPk)
        // console.log({ e, row, name, hide })
      } else {
        this.openMenuPanel(cellPk)
        this.updateRow(row)
      }
    },
  },
  methods: {
    setAttributeName(name) {
      this.attributeName = name
    },
    openMenuPanel: debounce(function (activatorId) {
      this.activatorId = null
      this.uiShowMenu = false
      this.$nextTick(() => {
        this.activatorId = `#${activatorId}`
        this.uiShowMenu = true
      })
    }, 0),
    closeMenuPanel(e) {
      // console.error('CLOSE')
      this.activatorId = null
      this.uiShowMenu = false
    },
    updateRow(row) {
      this.row = row
    },
    onSearch(searchQuery) {
      try {
        let { rootPath } = this
        let query = { q: searchQuery }
        this.$router.replace({
          path: `${rootPath}/search`,
          query,
        })
      } catch (e) {}
    },
    onExpandPanel({ e }) {
      this.uiShowPanel = true
    },
  },
}
</script>

<style scoped></style>
