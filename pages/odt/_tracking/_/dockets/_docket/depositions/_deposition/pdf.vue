<template>
  <div>
    <slot name="nlp" />
    <PdfViewODT :content="pdf" />
  </div>
</template>

<script>
import PdfViewODT from '~/features/odt/PdfViewODT'
export default {
  components: { PdfViewODT },
  props: {
    pdf: {},
    text: {},
    detail: {},
  },
}
</script>

<style scoped></style>
