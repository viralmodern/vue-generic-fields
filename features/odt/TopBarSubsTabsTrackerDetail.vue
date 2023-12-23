<template>
  <div>
    <TopBarOfTableOdt v-bind="subsTrackerDetail" />
    <slot></slot>
  </div>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
let {
  Dockets,
  LawFirms,
  Lawyers,
  Judges,
  Calendar,
  Motions,
  Orders,
  Complaints,
  Parties,
} = ROUTES.TrackerDetail
export default {
  name: 'TopBarSubsTabsTrackerDetail',
  components: { TopBarOfTableOdt },
  computed: {
    prefixPagesOfTrackerDetail() {
      return `odt-tracking-all`
    },
    subsTrackerDetail() {
      let { prefixPagesOfTrackerDetail } = this
      let { query, params } = this.$route
      let n = `${prefixPagesOfTrackerDetail}`
      let queryRoot = {}
      let tabs = [
        generateToSub(Dockets, queryRoot, {
          name: `${n}-dockets`,
          params,
          query,
        }),
        generateToSub(Lawyers, queryRoot, {
          name: `${n}-lawyers`,
          params,
          query,
        }),
        generateToSub(Judges, queryRoot, {
          name: `${n}-judges`,
          params,
          query,
        }),
        generateToSub(Parties, queryRoot, {
          name: `${n}-parties`,
          params,
          query,
        }),
        generateToSub(LawFirms, queryRoot, {
          name: `${n}-law-firms`,
          params,
          query,
        }),
        generateToSub(Motions, queryRoot, {
          name: `${n}-motions`,
          params,
          query,
        }),
        generateToSub(Orders, queryRoot, {
          name: `${n}-orders`,
          params,
          query,
        }),
        generateToSub(Complaints, queryRoot, {
          name: `${n}-complaints`,
          params,
          query,
        }),

        generateToSub(Calendar, queryRoot, {
          name: `${n}-calendar`,
          params,
          query,
        }),
      ]
      let idFullScreen = ''
      return {
        tabs,
        idFullScreen,
      }
    },
  },
}
</script>

<style scoped></style>
