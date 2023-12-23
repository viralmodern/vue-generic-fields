<template>
  <div>
    <PdfViewODT height="90vh" />
  </div>
</template>

<script>
import PdfViewODT from '~/features/odt/PdfViewODT'
export default {
  name: 'PdfViewerRegulation',
  components: { PdfViewODT },
}
</script>

<style scoped></style>
