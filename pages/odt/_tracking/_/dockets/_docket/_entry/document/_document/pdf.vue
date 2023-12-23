<template>
  <v-container fluid py-0>
    <BaseDocumentDetailOdt :height="heightFullScreen">
      <template v-slot:DOCUMENT_VIEW>
        <slot name="breadcrumbs" />
        <PdfViewODT height="85vh" v-if="pdf" :content="pdf" />
      </template>
    </BaseDocumentDetailOdt>
  </v-container>
</template>

<script>
import PdfViewODT from '~/features/odt/PdfViewODT'
import BaseDocumentDetailOdt from '~/features/odt/hoc/BaseDocumentDetailOdt'

export default {
  components: { BaseDocumentDetailOdt, PdfViewODT },
  props: {
    pdf: {},
    text: {},
    detail: {},
    heightFullScreen: {},
  },
}
</script>

<style scoped></style>
