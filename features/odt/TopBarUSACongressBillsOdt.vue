<template>
  <TopBarOfTableOdt v-bind="combinedSubs" />
</template>

<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { generateToSub } from '~/features/odt/helpers/function'
import { ROUTES } from '~/features/odt/helpers/odt.json'

let {
  CommitteeMeetings,
  CommitteeReports,
  CongressionalRecord,
  HouseCommunications,
  Legislation,
  Members,
  Nominations,
  SenateCommunications,
  TreatyDocuments,
} = ROUTES.USABills
export default {
  name: 'TopBarUSACongressBillsOdt',
  components: { TopBarOfTableOdt },
  computed: {
    combinedSubs() {
      let { query, params } = this.$route
      let rootName = `odt-united-states-of-america`
      let tabs = [
        generateToSub(Legislation, query, {
          params,
        }),
        generateToSub(Members, query, {
          params,
        }),
        generateToSub(HouseCommunications, query, {
          params,
        }),
        generateToSub(CommitteeMeetings, query, {
          params,
        }),
        generateToSub(CommitteeReports, query, {
          params,
        }),
        generateToSub(CongressionalRecord, query, {
          params,
        }),
        generateToSub(Nominations, query, {
          params,
        }),
        generateToSub(SenateCommunications, query, {
          params,
        }),
        generateToSub(TreatyDocuments, query, {
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
