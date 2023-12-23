<template>
  <div>
    <PdfViewODT v-if="detail" :content="detail.pdf" />
  </div>
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
