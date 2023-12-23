<template>
  <v-container fluid pt-0>
    <BaseDocumentDetailOdt :height="heightFullScreen">
      <template v-slot:DOCUMENT_VIEW>
        <TextViewODT
          v-if="text"
          :content="text"
          @selection="onSelection"
          disabled-dialog
        />
      </template>
    </BaseDocumentDetailOdt>
  </v-container>
</template>

<script>
import TextViewODT from '~/features/odt/TextViewODT'
import ThePanelResizableBase from '~/features/odt/ThePanelResizableBase'
import BaseDocumentDetailOdt from '~/features/odt/hoc/BaseDocumentDetailOdt'
export default {
  components: { BaseDocumentDetailOdt, ThePanelResizableBase, TextViewODT },
  props: {
    documentDetail: {},
    detail: {},
    pdf: {},
    text: {},
    heightFullScreen: {},
  },
  computed: {
    rootPath() {
      // @kenz2e
      let {
        params: { docket, entry, document },
      } = this.$route
      return `${this.$$rootPathDocketOdt}/${docket}/${entry}/document/${document}`
    },
  },
  methods: {
    onSelection(content) {
      this.$router.push({
        path: `${this.rootPath}/search`,
        query: { q: content },
      })
    },
  },
}
</script>

<style scoped lang="scss"></style>
