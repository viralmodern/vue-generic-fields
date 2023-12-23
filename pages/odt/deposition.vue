<template>
  <nuxt-child>
    <template #header>
      <BaseTabLinksPageEntries
        :v-bind="{ app: true, color: 'primary', flat: false, dark: true }"
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
      let rootPath = '/odt/deposition'
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
