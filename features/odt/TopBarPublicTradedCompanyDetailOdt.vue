<template>
  <TopBarOfTableOdt v-bind="combinedSubs" />
</template>

<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { generateToSub } from '~/features/odt/helpers/function'
import { ROUTES } from '~/features/odt/helpers/odt.json'
let {
  Opinions,
  FederalLitigation,
  InsiderOwnership,
  Patents,
  People,
  SECFilings,
} = ROUTES.StatePublicCompanyDetail
export default {
  name: 'TopBarPublicTradedCompanyDetailOdt',
  components: { TopBarOfTableOdt },
  computed: {
    combinedSubs() {
      let { query, params } = this.$route
      let rootNameCompanyDetail = `odt-united-states-of-america-state-public-companies-company`
      let tabs = [
        generateToSub(People, query, {
          name: `${rootNameCompanyDetail}-${People.path}`,
          params,
        }),
        generateToSub(SECFilings, query, {
          name: `${rootNameCompanyDetail}-${SECFilings.path}`,
          params,
        }),
        generateToSub(Patents, query, {
          name: `${rootNameCompanyDetail}-${Patents.path}`,
          params,
        }),
        generateToSub(FederalLitigation, query, {
          name: `${rootNameCompanyDetail}-${FederalLitigation.path}`,
          params,
        }),
        generateToSub(Opinions, query, {
          name: `${rootNameCompanyDetail}-${Opinions.path}`,
          params,
        }),
        generateToSub(InsiderOwnership, query, {
          name: `${rootNameCompanyDetail}-${InsiderOwnership.path}`,
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
