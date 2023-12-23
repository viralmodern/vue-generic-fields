<template>
  <v-card flat tile :loading="loading" class="background-transparent">
    <template v-if="docket && docketEntryDetail">
      <nuxt-child :docket="docket" :docketEntryDetail="docketEntryDetail">
        <template v-slot:breadcrumbs="{ link }">
          <div class="d-flex align-center">
            <v-breadcrumbs
              :items="getBreadcrumbs(link)"
              class="px-0 py-2 pt-0"
            />
            <v-spacer />
            <div class="px-0 py-2 pt-0">
              <BtnLinkInFormation
                icon
                main-cell-id="entry_number"
                :attributes="attributes"
                :row="docketEntryDetail"
              />
            </div>
          </div>
          <!--          <v-divider />-->
          <v-alert
            v-if="descriptionEntryDetail"
            text
            dense
            color="teal"
            icon="mdi-information-outline"
            border="left"
            v-html="descriptionEntryDetail"
          >
          </v-alert>
        </template>
        <v-spacer />
        <template v-slot:detail-entry>
          <v-card-text class="px-0 pb-0 background-transparent">
            <DocketEntryDetailThumbnailOdt
              v-if="docketEntryDetail"
              :docket="docket"
              :docket-entry-detail="docketEntryDetail"
            />
          </v-card-text>
        </template>
      </nuxt-child>
    </template>
  </v-card>
</template>

<script>
import { docketDetail } from '~/features/odt/store/docketOdtDetail'
import DocketEntryDetailThumbnailOdt from '~/features/odt/DocketEntryDetailThumbnailOdt'
import BtnLinkInFormation from '~/features/odt/BtnLinkInFormation'
import mxAttributesDocketEntry from '~/features/odt/mixins/mxAttributesDocketEntry'

export default {
  components: { BtnLinkInFormation, DocketEntryDetailThumbnailOdt },
  mixins: [mxAttributesDocketEntry],
  data() {
    return {
      loading: false,
      docketEntryDetail: null,
    }
  },
  computed: {
    docket() {
      return docketDetail.data
    },
    docketId() {
      try {
        return `${this.docket.pk}`
      } catch (e) {
        return ''
      }
    },
    docketNumber() {
      try {
        return `${this.docket.docket_number}`
      } catch (e) {
        return ''
      }
    },
    docketCaseName() {
      try {
        return `${this.docket.case_name} (${this.docketNumber})`
      } catch (e) {
        return ''
      }
    },
    getTrackerDetail() {
      try {
        let {
          params: { pathMatch },
        } = this.$route
        if (!this.$$isTrackerDocketsOdt) return false
        return this.$store.getters['publicTrackersOdt/findTrackerById'](
          pathMatch
        )
      } catch (e) {
        return false
      }
    },
    descriptionEntryDetail() {
      try {
        return this.docketEntryDetail.description
      } catch (e) {
        return false
      }
    },
    includeBreadcrumbsTracker() {
      if (!this.getTrackerDetail) return []
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
    linksBreadcrumbs() {
      let rootPath = `${this.$$rootPathDocketOdt}`
      let {
        params: { docket, entry, document },
      } = this.$route
      let labelRoot = this.$$isTrackerDocketsOdt
        ? `All Trackers`
        : `All Dockets`
      let linkRoot = this.$$isTrackerDocketsOdt ? `/` : `${rootPath}`
      return [
        {
          text: `${labelRoot}`,
          to: `${linkRoot}`,
          exact: true,
          disabled: false,
        },
        ...this.includeBreadcrumbsTracker,
        {
          text: `${this.docketCaseName}`,
          to: `${rootPath}/${docket}`,
          exact: true,
          disabled: false,
        },
        {
          text: `Docket Entries`,
          to: `${rootPath}/${docket}`,
          exact: true,
          disabled: false,
        },
      ]
    },
  },
  mounted() {
    this.fetchDocketEntryDetail()
  },
  methods: {
    async fetchDocketEntryDetail() {
      try {
        this.loading = true
        let {
          params: { docket, entry },
        } = this.$route
        let res = await this.$api.get(
          `/api/dockets/${docket}/docket-entries/${entry}/`
        )
        this.docketEntryDetail = res['data']
      } catch (e) {
      } finally {
        this.loading = false
      }
    },

    getBreadcrumbs(link) {
      try {
        let rootPath = `${this.$$rootPathDocketOdt}`
        return [
          ...this.linksBreadcrumbs,
          { text: link.text, disabled: true, to: `${rootPath}/${link.to}` },
        ]
      } catch (e) {
        console.log(e.message)
        return this.linksBreadcrumbs
      }
    },
  },
}
</script>

<style scoped></style>
