<template>
  <v-card flat :loading="loading" max-height="65vh" class="overflow-y-auto">
    <div class="px-3 pt-3 pb-1">
      <template v-if="!loading">
        <p class="mb-0">
          <router-link
            class="subtitle-2 text-decoration-none"
            :to="`${rootPath}/${opinionDetail.pk}`"
            v-html="opinionDetail.matter_name"
          />
          <sup>
            <BtnLinkInFormation
              icon
              end-point="/api/opinions/"
              :attributes="attributesOpinions"
              main-cell-id="matter_name"
              :row="opinionDetail"
              :is-owner-row="false"
            />
          </sup>
        </p>
      </template>
      <div class="d-flex align-center">
        <p class="caption ma-0">
          {{ opinionDetail.date_filed | $$formatFullDate }}
        </p>
        <v-spacer />
        <v-btn
          class="caption text-capitalize"
          rounded
          active-class="primary--text"
          depressed
          x-small
          @click="tabActive = 0"
          :input-value="
            tabActive == 0 && $$countArr(opinionDetail.opinions_cited)
          "
        >
          Authorities {{ opinionDetail.opinions_cited | totalPanel }}
        </v-btn>
        <div class="mx-1"></div>
        <v-btn
          class="caption text-capitalize"
          rounded
          active-class="primary--text"
          depressed
          x-small
          :input-value="
            tabActive == 1 && $$countArr(opinionDetail.opinions_citing)
          "
          @click="tabActive = 1"
        >
          Cited By {{ opinionDetail.opinions_citing | totalPanel }}
        </v-btn>
      </div>
    </div>
    <ThumbListAuthoritiesOpinions
      v-if="tabActive === 0"
      label="Authorities"
      disabled-label
      :path="`${rootPath}/${opinionDetail.pk}/authorities`"
      :list="opinionDetail.opinions_cited"
      label-link-paging="View all Authorities"
    />
    <ThumbListAuthoritiesOpinions
      v-if="tabActive === 1"
      label="Cited By"
      disabled-label
      :list="opinionDetail.opinions_citing"
      :path="`${rootPath}/${opinionDetail.pk}/cited`"
      label-link-paging="View Citing Opinions"
    />
  </v-card>
</template>

<script>
import ThumbListAuthoritiesOpinions from '~/features/odt/ThumbListAuthoritiesOpinions'
import {
  $$arrToString,
  $$formatFullDate,
  $$lastArrItem,
  $$countArr,
  $$strNumFormat,
} from '~/sat-vue-toolkit/functions'
import { mxOpinions } from '~/features/odt/mixins/attributesOpinions'
import BtnLinkInFormation from '~/features/odt/BtnLinkInFormation'
export default {
  name: 'OpinionAuthorityCitedByThumbNail',
  components: { BtnLinkInFormation, ThumbListAuthoritiesOpinions },
  filters: {
    $$arrToString,
    $$formatFullDate,
    $$lastArrItem,
    totalPanel(v) {
      let total = $$countArr(v)
      return total ? `(${$$strNumFormat(total)})` : ``
    },
  },
  props: {
    rootPath: {
      type: String,
      default: '/odt/opinions',
    },
    detail: {
      type: Object,
      default: () => {},
    },
    opinion: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      tabActive: 0,
      opinionDetail: {},
      loading: false,
    }
  },
  mixins: [mxOpinions],
  methods: {
    $$countArr,
    async fetchOpinionDetail() {
      try {
        this.loading = true
        let res = await this.$api.get(`/api/opinions/${this.opinion}`)
        this.opinionDetail = res['data']
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
  watch: {
    opinion: {
      immediate: true,
      handler(v) {
        if (v) {
          this.opinionDetail = {}
          this.fetchOpinionDetail()
        }
      },
    },
  },
}
</script>

<style scoped></style>
