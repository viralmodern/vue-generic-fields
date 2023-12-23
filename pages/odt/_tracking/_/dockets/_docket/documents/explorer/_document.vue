<template>
  <div>
    <TopBarDocumentDetailOdt
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
  middleware({ store, redirect, route }) {
    console.log('1: middleware', arguments)
  },
  validate({ params }) {
    console.log('2: validate', arguments)
    return true
    // return !isNaN(+params.document)
  },
  asyncData({ params }) {
    console.log('3: asyncData', arguments)
  },
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
      return `${this.$$rootPathDocketOdt}/${docket}/documents/explorer/${document}`
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
