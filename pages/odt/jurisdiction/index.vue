<template>
  <div>
    <div :id="subsJurisdiction.idFullScreen">
      <TopBarOfTableOdt v-bind="subsJurisdictionTypes" disabled-setting />
      <v-container fluid>
        <TopBarOfTableOdt v-bind="subsJurisdiction" />
        <GridAllJurisdictionOdt
          height="72vh"
          :include-params="subsJurisdictionTypes.includeParams"
        />
      </v-container>
    </div>
  </div>
</template>

<script>
import GridAllJurisdictionOdt from '~/features/odt/GridAllJurisdictionOdt'
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
import { jurisdictionTypesMixin } from '~/features/odt/mixins/mxJurisdictionOdt'

export default {
  components: { TopBarOfTableOdt, GridAllJurisdictionOdt },
  mixins: [jurisdictionTypesMixin],
  computed: {
    subsJurisdiction() {
      let {
        $route: { query },
      } = this
      let queryRoot = { ...query }
      delete queryRoot['by']
      let {
        JurisdictionProfile,
        JurisdictionAnnualLoads,
        JurisdictionAnnualTrends,
      } = ROUTES.Jurisdiction
      let idFullScreen = 'page-jurisdiction-fullscreen'
      let tabs = [
        generateToSub(JurisdictionProfile, query, { query: { ...queryRoot } }),
        generateToSub(JurisdictionAnnualLoads, query),
        generateToSub(JurisdictionAnnualTrends, query),
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
      let tabs = jurisdictionsTypes.map((type) => {
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
        group_items: `C`,
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
