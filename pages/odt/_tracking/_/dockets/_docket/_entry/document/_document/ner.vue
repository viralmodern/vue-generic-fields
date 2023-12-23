<template>
  <v-container fluid pt-0>
    <BaseDocumentDetailOdt :height="heightFullScreen">
      <template v-slot:DOCUMENT_VIEW>
        <slot name="breadcrumbs" />
        <nuxt-child />
      </template>
    </BaseDocumentDetailOdt>
  </v-container>
</template>

<script>
import BaseDocumentDetailOdt from '~/features/odt/hoc/BaseDocumentDetailOdt'
export default {
  components: { BaseDocumentDetailOdt },
  props: {
    pdf: {},
    text: {},
    detail: {},
    heightFullScreen: {},
  },
}
</script>

<style scoped></style>
