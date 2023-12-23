<template>
  <v-card tile :height="height" :loading="loading" flat>
    <iframe
      :src="content"
      width="100%"
      frameborder="0"
      @load="onLoaded"
      style="resize: vertical;"
      height="100%"
    ></iframe>
  </v-card>
</template>

<script>
export default {
  name: 'PdfViewODT',
  props: {
    height: {
      type: String,
      default: () => '600px',
    },
    content: {
      default: () => 'http://www.pdf995.com/samples/pdf.pdf',
    },
  },
  data() {
    return {
      loading: true,
    }
  },
  methods: {
    onLoaded() {
      this.loading = false
    },
  },
}
</script>

<style scoped></style>
