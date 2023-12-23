<template>
  <TopBarOfTableOdt v-bind="subsLawyers" />
</template>

<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
let { BillActions, Sponsors, Votes } = ROUTES.StateBills
export default {
  name: 'TopBarBillStateOdt',
  components: { TopBarOfTableOdt },
  computed: {
    reduceIncludesSubs() {
      let { includesSubs } = this
      let { query } = this.$route
      if (!Array.isArray(includesSubs)) return []
      return includesSubs.map((sub) => ({
        ...generateToSub(sub, query, sub.to || {}),
      }))
    },
    subsLawyers() {
      let { reduceIncludesSubs } = this
      let { query, params } = this.$route
      let rootPathName = `odt-united-states-of-america-state-bills-bill`
      let tabs = [
        ...reduceIncludesSubs,
        {
          ...generateToSub(BillActions, query, {
            name: `${rootPathName}-${BillActions.path}`,
            params,
          }),
        },
        {
          ...generateToSub(Sponsors, query, {
            name: `${rootPathName}-${Sponsors.path}`,
            params,
          }),
        },
        {
          ...generateToSub(Votes, query, {
            name: `${rootPathName}-${Votes.path}`,
            params,
          }),
        },
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
