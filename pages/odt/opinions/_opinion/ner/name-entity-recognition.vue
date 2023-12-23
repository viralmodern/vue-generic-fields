<template>
  <v-card flat tile :loading="loading" min-height="350px">
    <NerViewODT v-if="detail" :content="detail.html" />
  </v-card>
</template>

<script>
import NerViewODT from '~/features/odt/NerViewODT'
import mxNerBaseDetail from '~/features/odt/mixins/mxNerBaseDetail'
export default {
  name: 'name-entity-recognition',
  components: { NerViewODT },
  mixins: [mxNerBaseDetail],
}
</script>

<style scoped></style>
