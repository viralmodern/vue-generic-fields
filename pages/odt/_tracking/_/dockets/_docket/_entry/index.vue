<template>
  <v-container fluid>
    <slot name="breadcrumbs"></slot>
    <!--    <slot name="detail-entry"></slot>-->
    <template v-if="docketEntryDetail && docket && docketEntryDetail.documents">
      <GirdAllDocumentsOfDocketEntryOdt
        height="68vh"
        v-if="docketEntryDetail.documents"
        :root-path="`${$$rootPathDocketOdt}/${docket.pk}/${docketEntryDetail.pk}`"
        :documents="docketEntryDetail.documents"
      />
    </template>
  </v-container>
</template>

<script>
import GirdAllDocumentsOfDocketEntryOdt from '~/features/odt/GirdAllDocumentsOfDocketEntryOdt'
export default {
  components: { GirdAllDocumentsOfDocketEntryOdt },
  props: {
    docket: {
      type: Object,
      default: () => ({}),
    },
    docketEntryDetail: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style scoped></style>
