<template>
  <PdfViewODT :content="detail.pdf" />
</template>

<script>
import PdfViewODT from '~/features/odt/PdfViewODT'
export default {
  components: { PdfViewODT },
  props: {
    detail: {},
  },
}
</script>

<style scoped></style>
