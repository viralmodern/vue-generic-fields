<template>
  <div>
    <div :id="combinedSubs.idFullScreen">
      <TopBarOfTableOdt v-bind="combinedSubs" />
      <GridAllPrivateSchoolsOfEducationOdt
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
  BasicInformation,
  Others,
  PrivateSchoolProfile,
} = ROUTES.EducationPrivateSchools
export default {
  name: 'HomePrivateSchoolsOfEducationOdt',
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
    GridAllPrivateSchoolsOfEducationOdt: () =>
      import('~/features/odt/GridAllPrivateSchoolsOfEducationOdt'),
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
        { ...generateToSub(PrivateSchoolProfile, query) },
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
