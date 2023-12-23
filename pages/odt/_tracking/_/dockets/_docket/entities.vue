<template>
  <div>
    <BaseTabLinksPageEntries :links="links" :v-bind="{ app: false }" />
    <nuxt-child />
  </div>
</template>

<script>
import BaseTabLinksPageEntries from '~/features/odt/BaseTabLinksPageEntries'
export default {
  components: { BaseTabLinksPageEntries },
  computed: {
    rootPath() {
      let {
        params: { docket },
      } = this.$route
      return `${this.$$rootPathDocketOdt}/${docket}/entities`
    },
    links() {
      return [
        {
          text: 'Entities',
          to: `${this.rootPath}`,
        },
        {
          text: 'Entity explorer',
          to: `${this.rootPath}/entity-explorer`,
        },
        {
          text: 'Entity Cooccurrence Matrix',
          to: `${this.rootPath}/entity-cooccurrence-matrix`,
        },
        {
          text: 'Entity Analytics',
          to: `${this.rootPath}/entity-analytics`,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
