<template>
  <div>
    <DocketViewPDF :file="file" />
  </div>
</template>

<script>
import DocketViewPDF from '~/features/simple-docket/components/DocketViewPDF'
export default {
  components: { DocketViewPDF },
  props: {
    document: {},
  },
  computed: {
    file() {
      try {
        return this.document.file
      } catch (e) {
        return null
      }
    },
  },
}
</script>

<style scoped></style>
