<template>
  <DocumentDetailOdt>
    <template #default="{ views, panels, titleView }">
      <v-card flat tile class="background-transparent">
        <TopBarDocumentDetailOdt
          :views="views"
          :panels="panels"
          :row="detail"
          :title-button="titleView"
          :root-path="parentPath"
          is-abstract-document
          :is-admin="true"
          :end-point-abstract-document="endPointAbstractDocument"
          @requestSyncingAbstractDocument="requestSyncingAbstractDocument"
          @syncAbstractDocument="syncAbstractDocument"
        />
        <div :id="pageId" style="z-index: 1; background: #f1f1f1">
          <v-card flat tile class="background-transparent">
            <v-card-text class="d-flex py-0 pl-0 align-center">
              <v-breadcrumbs :items="breadcrumbs" :large="false" class="pr-0" />
              <v-spacer />
              <v-btn
                :title="fullScreenInfo.label"
                small
                fab
                text
                color="primary"
                v-on="fullScreenInfo.on"
              >
                <v-icon>
                  {{ fullScreenInfo.icon }}
                </v-icon>
              </v-btn>
            </v-card-text>
            <nuxt-child
              :heightFullScreen="isFullScreen ? `${90}vh` : `${67}vh`"
              :panels="panels"
              :pdf="detail && detail.document"
              :text="detail && detail.text"
              :detail="detail"
            />
          </v-card>
        </div>
      </v-card>
    </template>
  </DocumentDetailOdt>
</template>

<script>
import TopBarDocumentDetailOdt from '~/features/odt/TopBarDocumentDetailOdt'
import DocumentDetailOdt from '~/features/odt/hoc/DocumentDetailOdt'
import { SETTINGS } from '@/features/odt/helpers/odt.json'
import { fullScreenMixin } from '~/features/odt/mixins/mxFullScreen'

export default {
  components: { DocumentDetailOdt, TopBarDocumentDetailOdt },
  props: {
    docket: {
      type: Object,
      default: () => ({}),
    },
    docketEntryDetail: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.fetchDocumentDetail()
  },
  data() {
    return {
      detail: {},
      loading: false,
      isFullScreen: false,
    }
  },
  mixins: [fullScreenMixin],
  computed: {
    pageId() {
      return `docket-entry-document-detail`
    },
    fullScreenInfo() {
      let { isFullScreen } = this
      return {
        ...SETTINGS.FULL_SCREEN,
        label:
          (isFullScreen && SETTINGS.FULL_SCREEN.labelRollback) ||
          SETTINGS.FULL_SCREEN.label,
        icon:
          (isFullScreen && SETTINGS.FULL_SCREEN.iconRollback) ||
          SETTINGS.FULL_SCREEN.icon,
        on: {
          click: this.handleFullScreen,
        },
      }
    },
    isAdmin() {
      try {
        return this.$store.getters['auth/user']['is_admin']
      } catch (e) {
        return false
      }
    },
    parentPath() {
      const {
        params: { docket, entry, document },
      } = this.$route
      return `${this.$$rootPathDocketOdt}/${docket}/${entry}/document/${document}`
    },
    endPointAbstractDocument() {
      const {
        params: { docket, entry, document },
      } = this.$route
      return `/api/dockets/${docket}/docket-entries/${entry}/documents/${document}/ocr/`
    },
    docketLabel() {
      try {
        return `${this.docket['case_name']} (${this.docket['docket_number']})`
      } catch (e) {
        return ''
      }
    },
    docketEntryLabel() {
      try {
        return this.docketEntryDetail['entry_number']
      } catch (e) {
        return ''
      }
    },

    documentName() {
      try {
        return this.detail['name']
      } catch (e) {
        return ''
      }
    },
    documentDescription() {
      try {
        return this.detail['description']
      } catch (e) {
        return ''
      }
    },
    getTrackerDetail() {
      try {
        let {
          params: { pathMatch },
        } = this.$route
        if (!this.$$isTrackerDocketsOdt) {
          return false
        }
        return this.$store.getters['publicTrackersOdt/findTrackerById'](
          pathMatch
        )
      } catch (e) {
        return false
      }
    },
    includeBreadcrumbsTracker() {
      if (!this.getTrackerDetail) {
        return []
      }
      let { name, pk } = this.getTrackerDetail
      return [
        {
          text: name,
          to: `/odt/t/${pk}/dockets`,
          exact: true,
          disabled: false,
        },
      ]
    },
    breadcrumbs() {
      const {
        params: { docket, entry, document },
      } = this.$route
      let rootPath = `${this.$$rootPathDocketOdt}`
      let linkRoot = this.$$isTrackerDocketsOdt ? `/` : `${rootPath}`
      let labelRoot = this.$$isTrackerDocketsOdt
        ? `All Trackers`
        : `All Dockets`
      return [
        {
          text: `${labelRoot}`,
          disabled: false,
          exact: true,
          to: `${linkRoot}`,
        },
        ...this.includeBreadcrumbsTracker,
        {
          text: `${this.docketLabel}`,
          disabled: false,
          exact: true,
          to: `${rootPath}/${docket}`,
        },
        {
          text: `Docket Entries`,
          exact: true,
          disabled: false,
          to: `${rootPath}/${docket}`,
        },
        {
          text: `${this.docketEntryLabel}`,
          exact: true,
          disabled: false,
          to: `${rootPath}/${docket}/${entry}`,
        },

        {
          text: `Documents`,
          exact: true,
          disabled: false,
          to: `${rootPath}/${docket}/${entry}`,
        },

        {
          text: `${this.documentName} ${this.documentDescription && `-`} ${
            this.documentDescription
          }`,
          disabled: true,
          exact: true,
          to: `${rootPath}/${docket}/${entry}/document/${document}`,
        },
      ]
    },
  },
  methods: {
    requestSyncingAbstractDocument() {
      this.loading = true
    },
    syncAbstractDocument() {
      this.fetchDocumentDetail()
    },
    async fetchDocumentDetail() {
      try {
        const {
          params: { docket, entry, document },
        } = this.$route
        this.loading = true
        let res = await this.$api.get(
          `/api/dockets/${docket}/docket-entries/${entry}/documents/${document}/`
        )
        this.detail = res['data']
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    handleFullScreen() {
      let { isFullScreen, pageId } = this
      let is_full_screen = this.onFullScreen(isFullScreen, pageId)
      this.isFullScreen = is_full_screen
    },
  },
  destroyed() {
    this.detail = null
  },
}
</script>

<style lang="scss">
html.full_screen {
  .v-app-bar.v-app-bar--fixed,
    #app-left-sidebar,
      /*.v-sheet.v-app-bar.v-toolbar,*/
      .v-btn--fixed,
    .v-footer {
    opacity: 0 !important;
    pointer-events: none;
    z-index: -999;
    visibility: hidden;
  }

  .full_screen:not(.dashboard-table-scroll) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .dashboard-table-scroll {
    height: 89.2vh !important;
  }
}
</style>
