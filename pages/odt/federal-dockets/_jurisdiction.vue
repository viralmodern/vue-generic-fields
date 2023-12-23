<template>
  <div :id="subsFederalJurisdiction.idFullScreen">
    <TopBarOfTableOdt v-bind="subsFederalJurisdiction" />
    <v-container fluid>
      <nuxt-child />
    </v-container>
  </div>
</template>

<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { ROUTES } from '@/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
let {
  FederalJudge,
  FederalDocketsMonthlyLoads,
  FederalDocketsMonthlyTrends,
  FederalMonthlyDockets,
} = ROUTES.FederalJurisdiction
let { FederalDockets } = ROUTES.LitigationResearch
export default {
  components: { TopBarOfTableOdt },
  mounted() {
    this.fetchJurisdiction()
  },
  computed: {
    rootFederalJurisdictionDetail() {
      let { params } = this.$route
      let jurisdiction = params[`jurisdiction`]
      return `${FederalDockets.path}/${jurisdiction}`
    },
    subsFederalJurisdiction() {
      let { rootFederalJurisdictionDetail } = this
      let { query } = this.$route
      let tabs = [
        generateToSub(FederalJudge, query, {
          path: `${rootFederalJurisdictionDetail}/${FederalJudge.path}`,
        }),
        generateToSub(FederalMonthlyDockets, query, {
          path: `${rootFederalJurisdictionDetail}/${FederalMonthlyDockets.path}`,
        }),
      ]
      let idFullScreen = `federal-jurisdiction-detail`
      idFullScreen = ``
      return {
        tabs,
        idFullScreen,
      }
    },
  },
  methods: {
    fetchJurisdiction() {
      let {
        params: { jurisdiction },
      } = this.$route
      this.$store.dispatch(
        'odtJurisdiction/getJurisdictionDetail',
        jurisdiction
      )
    },
  },
  destroyed() {
    // todo reset federal jurisdiction
    this.$store.commit(`odtJurisdiction/getJurisdictionDetail`, null)
  },
}
</script>

<style scoped></style>
