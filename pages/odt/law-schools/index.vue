<template>
  <v-container fluid>
    <div :id="subsLawSchool.idFullScreen">
      <TopBarOfTableOdt v-bind="subsLawSchool" />
      <GridAllLawSchoolOdt height="77.5vh" />
    </div>
  </v-container>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import GridAllLawSchoolOdt from '~/features/odt/GridAllLawSchoolOdt'
import { generateToSub } from '~/features/odt/helpers/function'
let {
  AnnualDocketLoads,
  AnnualDocketTrends,
  AnnualOpinionLoads,
  AnnualOpinionTrends,
  InFederalDockets,
  JudgeTypes,
  Profile,
} = ROUTES.LawSchool

export default {
  components: { GridAllLawSchoolOdt, TopBarOfTableOdt },
  computed: {
    linkOption() {
      return {
        small: true,
        rounded: false,
        depressed: true,
        class: 'caption text-capitalize',
      }
    },
    lawSchoolOption() {
      return {
        ...ROUTES.LitigationResearch.LawSchools,
      }
    },
    subsLawSchool() {
      let { query } = this.$route
      let queryRoot = { ...query }
      delete queryRoot['by']
      let tabs = [
        generateToSub(Profile, queryRoot),
        generateToSub(JudgeTypes, query),
        generateToSub(AnnualOpinionLoads, query),
        generateToSub(AnnualOpinionTrends, query),
        generateToSub(AnnualDocketLoads, query),
        generateToSub(AnnualDocketTrends, query),
        generateToSub(InFederalDockets, query),
      ]
      let idFullScreen = 'home-law-school'
      return {
        tabs,
        idFullScreen,
      }
    },
  },
}
</script>

<style scoped></style>
