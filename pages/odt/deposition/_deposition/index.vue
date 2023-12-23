<template>
  <div>
    <TopBarDocumentDetailOdt
      disabled-bookmark
      :root-path="rootPath"
      disabled-info
    />
    <nuxt-child :detail="detail" :pdf="pdf" :text="text" />
  </div>
</template>

<script>
import TopBarDocumentDetailOdt from '~/features/odt/TopBarDocumentDetailOdt'
export default {
  components: {
    TopBarDocumentDetailOdt,
  },
  middleware({ store, redirect, route }) {},
  props: {
    pdf: {},
    text: {},
    detail: {},
  },
  computed: {
    rootPath() {
      const {
        params: { deposition },
      } = this.$route
      return `/odt/deposition/${deposition}`
    },
  },
}
</script>

<style scoped></style>
