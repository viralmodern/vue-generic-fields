<template>
  <div>
    <SlickGrid
      no-query-params
      disabled-filter
      :attributes="attributes"
      :items="items"
      :height="height"
      no-group
      disabled-sort
      disabled-bookmark-row
      disabled-add-new-row
      disabled-add-new-column
    />
  </div>
</template>

<script>
import SlickGrid from '~/sat-vue-toolkit/components/slick-grid/SlickGrid'
import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
export default {
  name: 'GirdAllDocumentsOfDocketEntryOdt',
  components: { SlickGrid },
  props: {
    documents: {
      type: Array,
      default: () => [],
    },
    height: {
      type: String,
      default: () => `45vh`,
    },
    rootPath: {
      type: String,
      default: () => `/odt`,
    },
  },
  computed: {
    items() {
      return {
        '': {
          count: this.documents.length,
          results: this.documents,
        },
      }
    },
    attributes() {
      let _self = this
      return [
        {
          name: 'name',
          type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
          width: 250,
          pathLink() {
            return `${_self.rootPath}/document/${this.pk}`
          },
        },
        {
          name: 'document_number',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
        },
        {
          name: 'page_count',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },

        {
          name: 'description',
          type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
          width: 250,
        },
        /*{
          name: 'document',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
        },*/
      ]
    },
  },
}
</script>

<style scoped></style>
