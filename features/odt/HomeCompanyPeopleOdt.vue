<template>
  <div :id="subsLawyers.idFullScreen">
    <TopBarOfTableOdt v-bind="subsLawyers" />
    <GridAllPeopleOfCompanyOdt :height="height" :includes-subs="includesSubs" />
  </div>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
let { Others, BasicInfo, Qualifications } = ROUTES.PublicCompanyPeople
export default {
  name: 'HomeCompanyPeopleOdt',
  props: {
    height: {
      type: String,
      default: () => `${77}vh`,
    },
    includesSubs: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    TheTopBarOdt: () => import('~/features/odt/TheTopBarOdt'),
    TopBarOfTableOdt: () => import('~/features/odt/TopBarOfTableOdt'),
    GridAllPeopleOfCompanyOdt: () =>
      import('~/features/odt/GridAllPeopleOfCompanyOdt'),
  },
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
      let { query } = this.$route
      let tabs = [
        ...reduceIncludesSubs,
        { ...generateToSub(BasicInfo, query) },
        { ...generateToSub(Qualifications, query) },
        { ...generateToSub(Others, query) },
      ]
      let idFullScreen = `home-lawyers-odt`
      return {
        tabs,
        idFullScreen,
      }
    },
  },
}
</script>

<style scoped></style>
