<template>
  <div>
    <TopBarOfTableOdt v-bind="subNavs" disabled-setting />
    <v-container fluid>
      <nuxt-child />
    </v-container>
  </div>
</template>

<script>
import { ROUTES } from '@/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'

let { Judges, TrendLine, InFederalDockets } = ROUTES.Jurisdiction
let { LawSchools } = ROUTES.LitigationResearch
export default {
  components: { TopBarOfTableOdt },
  computed: {
    subNavs() {
      let { query, params } = this.$route
      let lawSchool = params['school']
      const rootLawSchool = `${LawSchools.path}/${lawSchool}`
      let tabs = [
        generateToSub(Judges, query, {
          path: `${rootLawSchool}/${Judges.path}`,
        }),
        generateToSub(TrendLine, query, {
          path: `${rootLawSchool}/${TrendLine.path}`,
        }),
        generateToSub(InFederalDockets, query, {
          path: `${rootLawSchool}/${InFederalDockets.path}`,
        }),
      ]
      return { tabs }
    },
  },
}
</script>

<style scoped></style>
