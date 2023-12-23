<template>
  <div style="position: relative;">
    <TopBarDocumentDetailOdt :root-path="rootPath" />
    <v-container fluid>
      <nuxt-child :detail="detail" />
    </v-container>
  </div>
</template>

<script>
import TopBarDocumentDetailOdt from '~/features/odt/TopBarDocumentDetailOdt'
export default {
  components: { TopBarDocumentDetailOdt },
  data() {
    return {
      detail: null,
    }
  },
  computed: {
    rootPath() {
      let {
        params: { document, docket },
      } = this.$route
      return `/odt/dockets/${docket}/depositions/explorer/${document}`
    },
  },
  methods: {
    async fetchDocumentDetail() {
      try {
        let res = await this.$api.get('/api/opinions/4545223/')
        this.detail = res['data']
      } catch (e) {}
    },
  },
  watch: {
    '$route.params.document': {
      immediate: true,
      handler(v) {
        this.fetchDocumentDetail()
      },
    },
  },
}
</script>

<style scoped></style>
