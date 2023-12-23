<template>
  <TopBarOfTableOdt v-bind="combinedSubs" />
</template>

<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'

let {
  City,
  CollegesAndUniversities,
  CountyJudge,
  FDICInsuredBanks,
  Hospital,
  LawEnforcement,
  Prison,
  PrivateSchools,
  PublicSchools,
} = ROUTES.StateUsCountyDetail
export default {
  name: 'TopBarStateCountyDetail',
  components: { TopBarOfTableOdt },
  computed: {
    combinedSubs() {
      let { query, params } = this.$route
      let rootName = `odt-united-states-of-america-state-county-county`
      let tabs = [
        generateToSub(CountyJudge, query, {
          name: `${rootName}-${CountyJudge.path}`,
          params,
          // query,
        }),
        generateToSub(Hospital, query, {
          name: `${rootName}-${Hospital.path}`,
          params,
          // query,
        }),
        generateToSub(LawEnforcement, query, {
          name: `${rootName}-${LawEnforcement.path}`,
          params,
          // query,
        }),
        generateToSub(CollegesAndUniversities, query, {
          name: `${rootName}-${CollegesAndUniversities.path}`,
          params,
          // query,
        }),
        generateToSub(PrivateSchools, query, {
          name: `${rootName}-${PrivateSchools.path}`,
          params,
          // query,
        }),
        generateToSub(PublicSchools, query, {
          name: `${rootName}-${PublicSchools.path}`,
          params,
          // query,
        }),
        generateToSub(City, query, {
          name: `${rootName}-${City.path}`,
          params,
          // query,
        }),
        generateToSub(Prison, query, {
          name: `${rootName}-${Prison.path}`,
          params,
          // query,
        }),
        generateToSub(FDICInsuredBanks, query, {
          name: `${rootName}-${FDICInsuredBanks.path}`,
          params,
          // query,
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
