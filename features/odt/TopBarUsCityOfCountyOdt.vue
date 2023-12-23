<template>
  <TopBarOfTableOdt v-bind="combinedSubs" />
</template>

<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { generateToSub } from '~/features/odt/helpers/function'
import { ROUTES } from '~/features/odt/helpers/odt.json'

let {
  Education,
  AgeDemographic,
  CityProfile,
  FamilyDemographic,
  HomeOwnership,
  HouseholdIncome,
  LaborForce,
  Misc,
  Race,
} = ROUTES.CountyCity
export default {
  name: 'TopBarUsCityOfCountyOdt',
  components: { TopBarOfTableOdt },
  computed: {
    combinedSubs() {
      let { query, params } = this.$route
      let tabs = [
        generateToSub(CityProfile, query),
        generateToSub(AgeDemographic, query),
        generateToSub(FamilyDemographic, query),
        generateToSub(HouseholdIncome, query),
        generateToSub(HomeOwnership, query),
        generateToSub(Education, query),
        generateToSub(LaborForce, query),
        generateToSub(Race, query),
      ]
      return {
        tabs,
      }
    },
  },
}
</script>

<style scoped></style>
