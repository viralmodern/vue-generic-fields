<template>
  <div :style="{ height: height }" class="content_pdf_view">
    <!--    <pdf src="http://satlegal.ebitc.com/media/docket-entry-documents/13/sample_copy.pdf"></pdf>-->
    <!--<iframe class="d-block" width="100%"
            src="http://satlegal.ebitc.com/media/docket-entry-documents/13/sample_copy.pdf#toolbar=1"></iframe>-->
    <iframe
      v-if="file"
      :src="`${file}#toolbar=1`"
      width="100%"
      frameborder="0"
      class="d-block"
      height="100%"
    ></iframe>
    <!--<iframe src="https://docs.google.com/viewer?url=http://www.pdf995.com/samples/pdf.pdf&embedded=true#toolbar=1"
            frameborder="0" height="500px" width="100%"></iframe>-->
  </div>
</template>

<script>
export default {
  name: 'DocketViewPDF',
  props: {
    file: {},
    height: {
      type: String,
      default: () => `${75}vh`,
    },
  },
  data() {
    return {
      // src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    }
  },
  computed: {
    f() {
      try {
        return this.file.replace('https', 'http')
      } catch (e) {
        return this.file
      }
    },
  },
}
</script>

<style scoped>
.content_pdf_view {
  border: solid 1px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  resize: vertical;
}
</style>
