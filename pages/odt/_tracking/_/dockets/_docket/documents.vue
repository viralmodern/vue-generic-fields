<template>
  <div>
    <BaseTabLinksPageEntries
      :links="links"
      :v-bind="{ app: false }"
      :root-path="rootPath"
    />

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
      return `${this.$$isTrackerDocketsOdt}/${docket}/documents`
    },
    links() {
      return [
        {
          text: 'Documents',
          to: this.rootPath,
        },
        {
          text: 'Documents Explorer',
          to: `${this.rootPath}/explorer`,
        },
        {
          text: 'Document Analytics',
          to: `${this.rootPath}/analytics`,
        },
      ]
    },
  },
}
</script>

<style scoped lang="scss"></style>
