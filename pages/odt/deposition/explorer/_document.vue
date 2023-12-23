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
      rootPath: `/odt/deposition/explorer`,
      detail: null,
    }
  },
  computed: {
    rootPath() {
      let {
        params: { document },
      } = this.$route
      return `/odt/deposition/explorer/${document}`
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
