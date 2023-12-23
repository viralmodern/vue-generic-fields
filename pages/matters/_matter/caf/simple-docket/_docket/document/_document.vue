<template>
  <div>
    <keep-alive>
      <nuxt-child :document="currentDoc" />
    </keep-alive>
  </div>
</template>

<script>
import keyBy from 'lodash/keyBy'

export default {
  validate({ params, store, app, error }) {
    return params.document
  },
  props: {
    documents: {},
  },
  created() {
    const { params } = this.$route
    try {
      let documentsByPk = keyBy(this.documents, 'pk')
      let currentDoc = documentsByPk[params.document]
      if (!currentDoc) {
        this.$nuxt.error({
          message: `Document ${params.document} not found`,
          statusCode: 1502,
        })
      }
    } catch (e) {}
  },
  computed: {
    currentDoc() {
      try {
        const { params } = this.$route
        let documentsByPk = keyBy(this.documents, 'pk')
        return documentsByPk[params.document]
      } catch (e) {
        return null
      }
    },
  },
}
</script>

<style scoped></style>
