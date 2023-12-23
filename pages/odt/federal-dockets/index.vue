<template>
  <div>
    <TopBarOfTableOdt v-bind="subsJurisdictionTypes" />
    <v-container fluid>
      <v-divider />
      <div :id="subsJurisdiction.idFullScreen">
        <TopBarOfTableOdt v-bind="subsJurisdiction" />
        <GridAllJurisdictionFederalDocketsOdt
          height="72.5vh"
          :include-params="subsJurisdictionTypes.includeParams"
        />
      </div>
    </v-container>
  </div>
</template>
<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import GridAllJurisdictionFederalDocketsOdt from '~/features/odt/GridAllJurisdictionFederalDocketsOdt'
import { generateToSub } from '~/features/odt/helpers/function'
import { jurisdictionTypesMixin } from '~/features/odt/mixins/mxJurisdictionOdt'
export default {
  components: { GridAllJurisdictionFederalDocketsOdt, TopBarOfTableOdt },
  mixins: [jurisdictionTypesMixin],
  computed: {
    subsJurisdiction() {
      let {
        $route: { query },
      } = this
      let queryRoot = { ...query }
      delete queryRoot['by']
      let {
        FederalJurisdictionProfile,
        AnnualDocketLoads,
        AnnualDocketTrends,
      } = ROUTES.Jurisdiction
      let idFullScreen = `page-federal-dockets-fullscreen`
      let tabs = [
        generateToSub(FederalJurisdictionProfile, query),
        generateToSub(AnnualDocketLoads, query, {
          // path: `/odt/federal-dockets/${AnnualDocketLoads.path}`
        }),
        generateToSub(AnnualDocketTrends, query),
      ]
      return {
        tabs,
        idFullScreen,
      }
    },
    subsJurisdictionTypes() {
      let {
        jurisdictionsTypes,
        $route: { query },
      } = this
      let t = jurisdictionsTypes.filter((t) => ['F', 'FD'].includes(t.value))
      let tabs = t.map((type) => {
        let t = { ...type }
        t['path'] = type['value']
        let _query = { ...query }
        _query['ungroup'] = false
        _query['group_items'] = type['value']
        _query['group_by'] = 'jurisdiction'
        return generateToSub(t, query, { query: { ..._query } })
      })
      let includeParams = {
        ungroup: false,
        group_items: `F`,
        group_by: `jurisdiction`,
      }
      return {
        tabs,
        includeParams,
      }
    },
  },
}
</script>

<style scoped></style>
