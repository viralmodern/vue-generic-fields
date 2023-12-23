<template>
  <TopBarOfTableOdt v-bind="combinedSubs" />
</template>

<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { generateToSub } from '~/features/odt/helpers/function'
import { ROUTES } from '~/features/odt/helpers/odt.json'

let {
  Bills,
  CongressMembers,
  HistoricalCongressMembers,
  HouseOfCommittees,
  HouseOfRepresentatives,
  States,
} = ROUTES.USA
let { UnitedStatesOfAmerica } = ROUTES.LitigationResearch
export default {
  name: 'TopBarUSAOdt',
  components: { TopBarOfTableOdt },
  computed: {
    combinedSubs() {
      let { query, params } = this.$route
      let rootName = `odt-united-states-of-america`
      let rootPath = `${UnitedStatesOfAmerica.path}`
      let tabs = [
        generateToSub(States, query, {
          // name: rootName,
          path: rootPath,
          params,
          query: { ...query },
        }),
        generateToSub(Bills, query, {
          name: `${rootName}-${Bills.path}`,
          params,
          query: { ...query },
        }),
        generateToSub(HouseOfRepresentatives, query, {
          name: `${rootName}-${HouseOfRepresentatives.path}`,
          params,
          query: { ...query },
        }),
        generateToSub(HouseOfCommittees, query, {
          name: `${rootName}-${HouseOfCommittees.path}`,
          params,
          query: { ...query },
        }),
        generateToSub(CongressMembers, query, {
          name: `${rootName}-${CongressMembers.path}`,
          params,
          query: { ...query },
        }),
        generateToSub(HistoricalCongressMembers, query, {
          name: `${rootName}-${HistoricalCongressMembers.path}`,
          params,
          query: { ...query },
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
