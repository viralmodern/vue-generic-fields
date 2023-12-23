<template>
  <div :id="subsDocuments.idFullScreen">
    <TopBarOfTableOdt v-bind="subsDocuments" />
    <GridAllPresidentialDocuments
      height="72.8vh"
      :root-path-link="$route.path"
    />
  </div>
</template>

<script>
import GridAllPresidentialDocuments from '~/features/odt/GridAllPresidentialDocuments'
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
let {
  PresidentialDocumentsInformation,
  PresidentialDocumentsMoreInformation,
  PresidentialDocumentsReadingMetrics,
} = ROUTES.UsPresidents
export default {
  components: { TopBarOfTableOdt, GridAllPresidentialDocuments },
  computed: {
    subsDocuments() {
      let { query } = this.$route
      let queryRoot = { ...query }
      delete queryRoot['by']
      let tabs = [
        generateToSub(PresidentialDocumentsInformation, queryRoot),
        generateToSub(PresidentialDocumentsMoreInformation, query),
        generateToSub(PresidentialDocumentsReadingMetrics, query),
      ]
      let idFullScreen = 'home-presidential-documents'
      return {
        tabs,
        idFullScreen,
      }
    },
  },
}
</script>

<style scoped></style>
