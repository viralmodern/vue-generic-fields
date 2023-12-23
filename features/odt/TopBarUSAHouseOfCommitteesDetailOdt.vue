<template>
  <TopBarOfTableOdt v-bind="combinedSubs" />
</template>

<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { generateToSub } from '~/features/odt/helpers/function'
import { ROUTES } from '~/features/odt/helpers/odt.json'
let { Members, Bills, Subcommittee } = ROUTES.USAHouseOfCommitteesDetail
export default {
  name: 'TopBarUSAHouseOfCommitteesDetailOdt',
  components: { TopBarOfTableOdt },
  computed: {
    combinedSubs() {
      let { query, params } = this.$route
      let rootName = `odt-united-states-of-america-house-of-committees-committee`
      let tabs = [
        generateToSub(Subcommittee, query, {
          params,
          query,
          name: `${rootName}-${Subcommittee.path}`,
        }),
        generateToSub(Members, query, {
          params,
          query,
          name: `${rootName}-${Members.path}`,
        }),
        generateToSub(Bills, query, {
          params,
          query,
          name: `${rootName}-${Bills.path}`,
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
