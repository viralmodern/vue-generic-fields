<template>
  <div>
    <SlickGrid
      :items="dataGroup"
      :height="height"
      no-query-params
      disabled-bookmark-row
      :has-vote-row="false"
      :has-report-row="false"
      no-link-detail
      disabled-add-new-column
      :show-button-quick-add-modal="false"
      :ui-show-add-row-modal="false"
      :attributes="attributes"
    />
  </div>
</template>

<script>
import { ATTRIBUTE_FIELDS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'

export default {
  name: 'GridAllMentionedDocuments',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => '80vh',
    },
  },
  computed: {
    dataGroup() {
      return {
        '': {
          results: [
            {
              docket_entry: 'rc2435',
            },
          ],
        },
      }
    },
    attributes() {
      return [
        {
          name: 'docket_entry',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
        },
        {
          name: 'date_filed',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'document',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'filed_by',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'entry_type',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'description',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'mentioned_frequency',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'concordance_plot',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
