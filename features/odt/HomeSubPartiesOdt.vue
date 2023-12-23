<template>
  <div :id="subsPartiesOfDocket.idFullScreen">
    <TopBarOfTableOdt v-bind="subsPartiesOfDocket" />
    <GridAllPartiesOfDocketOdt :height="height" :includes-subs="includesSubs" />
  </div>
</template>
<script>
import GridAllPartiesOfDocketOdt from '~/features/odt/GridAllPartiesOfDocketOdt'
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
let { FilingLog, PartyProfile } = ROUTES.DocketTrackerParties
export default {
  name: 'HomeSubPartiesOdt',
  components: { TopBarOfTableOdt, GridAllPartiesOfDocketOdt },
  props: {
    height: {
      type: String,
      default: () => `${67}vh`,
    },
    includesSubs: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    reduceIncludesSubs() {
      let { includesSubs } = this
      let { query } = this.$route
      if (!Array.isArray(includesSubs)) return []
      return includesSubs.map((sub) => ({
        ...generateToSub(sub, query, sub.to || {}),
      }))
    },
    subsPartiesOfDocket() {
      let { reduceIncludesSubs } = this
      let { query } = this.$route
      let tabs = [
        ...reduceIncludesSubs,
        { ...generateToSub(PartyProfile, query) },
        { ...generateToSub(FilingLog, query) },
      ]
      let idFullScreen = `docket-tracker-detail-parties`
      return {
        tabs,
        idFullScreen,
      }
    },
  },
}
</script>

<style scoped></style>
