<template>
  <v-container>
    <template v-if="textContent">
      <TextRangy enable-setting :text-content="textContent" />
    </template>
  </v-container>
</template>

<script>
import TextRangy from '~/features/odt/TextRangy'

export default {
  components: { TextRangy },
  data() {
    return {
      document: null,
    }
  },
  async mounted() {
    await this.fetchDocument()
  },
  computed: {
    textContent() {
      let { document } = this
      if (document && Boolean(document.text)) {
        return document.text
      }
      return false
    },
  },
  methods: {
    async fetchDocument() {
      try {
        let res = await this.$api.get(
          `/api/dockets/16974501/docket-entries/789857/documents/852016/`
        )
        this.document = res['data']
      } catch (e) {
      } finally {
      }
    },
  },
}
</script>

<style scoped lang="scss"></style>
