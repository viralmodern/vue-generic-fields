<template>
  <TopBarOfTableOdt v-bind="combinedSubs" />
</template>

<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { generateToSub } from '~/features/odt/helpers/function'
import { ROUTES } from '~/features/odt/helpers/odt.json'

let { Business, SevereInjuryReport } = ROUTES.CountyCityDetail
export default {
  name: 'TopBarUsCityDetailOfCountyOdt',
  components: { TopBarOfTableOdt },
  computed: {
    combinedSubs() {
      let { query, params } = this.$route
      let rootName = `odt-united-states-of-america-state-county-county-city-city`
      let tabs = [
        generateToSub(Business, query, {
          name: `${rootName}-${Business.path}`,
          params,
        }),
        generateToSub(SevereInjuryReport, query, {
          name: `${rootName}-${SevereInjuryReport.path}`,
          params,
        }),
      ]
      return {
        tabs,
      }
    },
  },
}
</script>

<style scoped></style>
