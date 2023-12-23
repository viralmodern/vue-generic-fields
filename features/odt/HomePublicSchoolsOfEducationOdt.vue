<template>
  <div>
    <div :id="combinedSubs.idFullScreen">
      <TopBarOfTableOdt v-bind="combinedSubs" />
      <GridAllPublicSchoolsOfEducationOdt
        :height="height"
        :includes-subs="includesSubs"
      />
    </div>
  </div>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'

let {
  Others,
  BasicInformation,
  PublicSchoolProfile,
} = ROUTES.EducationPublicSchools
export default {
  name: 'HomePublicSchoolsOfEducationOdt',
  props: {
    height: {
      type: String,
      default: () => `${67}vh`,
    },
    includesSubs: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    TopBarOfTableOdt: () => import('~/features/odt/TopBarOfTableOdt'),
    GridAllPublicSchoolsOfEducationOdt: () =>
      import('~/features/odt/GridAllPublicSchoolsOfEducationOdt'),
  },
  computed: {
    reduceIncludesSubs() {
      let { includesSubs } = this
      let { query } = this.$route
      if (!Array.isArray(includesSubs)) {
        return []
      }
      return includesSubs.map((sub) => ({
        ...generateToSub(sub, query, sub.to || {}),
      }))
    },
    combinedSubs() {
      let { reduceIncludesSubs } = this
      let { query } = this.$route
      let tabs = [
        ...reduceIncludesSubs,
        { ...generateToSub(BasicInformation, query) },
        { ...generateToSub(PublicSchoolProfile, query) },
        { ...generateToSub(Others, query) },
      ]
      let idFullScreen = `home-state-us-county`
      return {
        tabs,
        idFullScreen,
      }
    },
  },
}
</script>

<style scoped></style>
