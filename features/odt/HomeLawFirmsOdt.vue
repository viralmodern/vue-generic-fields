<template>
  <v-container fluid>
    <div :id="subsLawyers.idFullScreen">
      <TopBarOfTableOdt v-bind="subsLawyers" />
      <GridAllLawFirmsOdt :height="height" />
    </div>
  </v-container>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
let { CompanyProfile, CompanyRevenue } = ROUTES.LawFirms
export default {
  name: 'HomeLawFirmsOdt',
  components: {
    TheTopBarOdt: () => import('~/features/odt/TheTopBarOdt'),
    TopBarOfTableOdt: () => import('~/features/odt/TopBarOfTableOdt'),
    GridAllLawFirmsOdt: () => import('~/features/odt/GridAllLawFirmsOdt'),
  },
  props: {
    height: {
      type: String,
      default: () => `${77}vh`,
    },
  },
  computed: {
    subsLawyers() {
      let { query } = this.$route
      let tabs = [
        { ...generateToSub(CompanyProfile, query) },
        { ...generateToSub(CompanyRevenue, query) },
      ]
      let idFullScreen = `home-law-firms-odt`
      return {
        tabs,
        idFullScreen,
      }
    },
  },
}
</script>

<style scoped></style>
