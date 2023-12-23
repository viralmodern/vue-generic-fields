<template>
  <TopBarOfTableOdt v-bind="combinedSubs" />
</template>

<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { generateToSub } from '~/features/odt/helpers/function'
import { ROUTES } from '~/features/odt/helpers/odt.json'
let {
  PublicSchools,
  CollegeAndUniversities,
  PrivateSchools,
  SupplementalColleges,
} = ROUTES.Education
export default {
  name: 'TopBarEducationOdt',
  components: { TopBarOfTableOdt },
  computed: {
    combinedSubs() {
      let { query, params } = this.$route
      let rootName = `odt-education`
      let tabs = [
        generateToSub(CollegeAndUniversities, query, {
          name: `${rootName}-${CollegeAndUniversities.path}`,
          params,
        }),
        generateToSub(SupplementalColleges, query, {
          name: `${rootName}-${SupplementalColleges.path}`,
          params,
        }),
        generateToSub(PrivateSchools, query, {
          name: `${rootName}-${PrivateSchools.path}`,
          params,
        }),
        generateToSub(PublicSchools, query, {
          name: `${rootName}-${PublicSchools.path}`,
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
