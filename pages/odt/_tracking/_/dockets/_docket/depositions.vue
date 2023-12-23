<template>
  <nuxt-child>
    <template #header>
      <BaseTabLinksPageEntries
        :v-bind="{ app: false, dark: false }"
        :links="links"
      />
    </template>
  </nuxt-child>
</template>

<script>
import BaseTabLinksPageEntries from '~/features/odt/BaseTabLinksPageEntries'
export default {
  components: {
    BaseTabLinksPageEntries,
  },
  computed: {
    links() {
      let {
        params: { docket },
      } = this.$route
      let rootPath = `${this.$$rootPathDocketOdt}/${docket}/depositions`
      return [
        {
          text: 'Depositions',
          to: `${rootPath}`,
        },
        {
          text: 'Transcript Explorer',
          to: `${rootPath}/explorer`,
        },
        {
          text: 'Deponent-FreqWord Table ',
          to: `${rootPath}/deponent-freq-word`,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
