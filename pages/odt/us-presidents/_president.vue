<template>
  <div>
    <TopBarOfTableOdt v-bind="subsPresident" disabled-setting />
    <v-container fluid>
      <nuxt-child />
    </v-container>
  </div>
</template>

<script>
import { ROUTES } from '@/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'

export default {
  components: { TopBarOfTableOdt },
  computed: {
    subsPresident() {
      let {
        About,
        AppointedJudges,
        PresidentialDocuments,
      } = ROUTES.UsPresidents
      let { USPresidents } = ROUTES.LitigationResearch
      let { query, params } = this.$route
      let president = params['president']
      let rootPresidentDetail = `${USPresidents.path}/${president}`
      let tabs = [
        generateToSub(About, query, {
          path: `${rootPresidentDetail}`,
        }),
        generateToSub(AppointedJudges, query, {
          path: `${rootPresidentDetail}/${AppointedJudges.path}`,
        }),
        generateToSub(PresidentialDocuments, query, {
          path: `${rootPresidentDetail}/${PresidentialDocuments.path}`,
        }),
      ]
      let idFullScreen = ``
      return {
        tabs,
        idFullScreen,
      }
    },
  },
}
</script>

<style scoped></style>
