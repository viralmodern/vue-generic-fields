<template>
  <div>
    <TopBarDocumentDetailOdt
      :links-view="linksView"
      disabled-bookmark
      disabled-info
      :root-path="rootPath"
      :v-bind="{ style: { top: 0 } }"
    />
    <div>
      <nuxt-child v-if="detail" :detail="detail" />
    </div>
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
      return `${this.$$rootPathDocketOdt}/${docket}/entities/entity-explorer/${document}`
    },
    linksView() {
      return [
        {
          text: 'Mentioned in Documents',
          icon: 'mdi-server-plus',
          path: `mentioned-documents`,
        },
        {
          text: 'Related Facts',
          icon: 'mdi-account',
          path: `related-facts`,
        },
        {
          text: 'Entity Occurrences',
          icon: ' mdi-sigma',
          path: `entity-occurrences`,
        },
        {
          text: 'Heatmap Mentioned',
          icon: 'mdi-chart-bar',
          path: `heatmap-mentioned`,
        },
      ]
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

<style scoped></style>
