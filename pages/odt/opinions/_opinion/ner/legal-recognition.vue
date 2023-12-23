<template>
  <v-card flat tile :loading="loading">
    <NerViewODT v-if="detail" :content="detail.html" />
  </v-card>
</template>

<script>
import mxNerBaseDetail from '~/features/odt/mixins/mxNerBaseDetail'
import NerViewODT from '~/features/odt/NerViewODT'
export default {
  name: 'legal-recognition',
  components: { NerViewODT },
  mixins: [mxNerBaseDetail],
}
</script>

<style scoped></style>
