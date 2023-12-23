<template>
  <TopBarOfTableOdt v-bind="combinedSubs" />
</template>

<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { generateToSub } from '~/features/odt/helpers/function'
import { ROUTES } from '~/features/odt/helpers/odt.json'
let {
  HouseOfRepresentatives,
  LegislativeActivity,
  HouseOfRepresentativesVote,
} = ROUTES.USAHouseOfRepresentatives
export default {
  name: 'TopBarUSAHouseOfRepresentativesOdt',
  components: { TopBarOfTableOdt },
  computed: {
    combinedSubs() {
      let { query, params } = this.$route
      let rootName = `odt-united-states-of-america-house-of-representatives`
      let tabs = [
        generateToSub(HouseOfRepresentatives, query, {
          name: `${rootName}-${HouseOfRepresentatives.path}`,
        }),
        generateToSub(LegislativeActivity, query, {
          name: `${rootName}-${LegislativeActivity.path}`,
        }),
        generateToSub(HouseOfRepresentativesVote, query, {
          name: `${rootName}-${HouseOfRepresentativesVote.path}`,
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
