<template>
  <div>
    <SlickGrid
      no-query-params
      :items="dataGroup"
      :attributes="attributes"
      :height="height"
      disabled-add-new-column
      disabled-bookmark-row
      :has-vote-row="false"
      :has-report-row="false"
      :disabled-overflow-scroll-body="disabledOverflowScrollBody"
      disabled-sort
      no-print
      no-export
      :ui-show-add-row-modal="false"
      :show-button-quick-add-modal="false"
      no-link-detail
      no-group
    />
  </div>
</template>

<script>
import { ATTRIBUTE_FIELDS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'

export default {
  name: 'GridAllFactsOfEntityCoOccurrences',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${76}vh`,
    },
    disabledOverflowScrollBody: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    attributes() {
      return [
        {
          label: 'Name',
          name: 'name',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          required: true,
        },
        {
          label: 'Fact Type',
          name: 'type',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 200,
          groupBy: true,
          required: true,
        },
        {
          label: 'Time',
          name: 'time',
          type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        },
        {
          label: 'Fact Description ',
          name: 'desc',
          type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        },
        {
          label: 'Subject Matter',
          name: 'subjects',
          type: ATTRIBUTE_FIELDS.LIST.TYPE,
          width: 200,
          itemText: 'name',
          itemValue: 'pk',
          multiple: true,
          chips: true,
          groupBy: false,
        },
        {
          label: 'Characters',
          name: 'characters',
          type: ATTRIBUTE_FIELDS.LIST.TYPE,
          width: 200,
          itemText: 'first_name',
          itemValue: 'pk',
          multiple: true,
          chips: true,
          groupBy: true,
        },
        {
          label: 'Cause of Action',
          name: 'cause_of_actions',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        },
        {
          label: 'Location',
          name: 'location',
          type: ATTRIBUTE_FIELDS.LOCATION.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          required: false,
        },

        {
          label: 'Disputed',
          name: 'dispute',
          type: ATTRIBUTE_FIELDS.CHECKBOX.TYPE,
          width: 200,
          list: [
            {
              value: 'True',
              label: 'Disputed',
            },
            {
              value: false,
              label: 'None Disputed',
            },
          ],
          groupBy: true,
        },
        {
          label: 'Legal Issue',
          name: 'legal_issues',
          type: ATTRIBUTE_FIELDS.LIST.TYPE,
          itemText: 'name',
          itemValue: 'pk',
          multiple: true,
          chips: true,
          width: 200,
          groupBy: true,
        },
        {
          label: 'Relief Sought',
          name: 'relief_sought',
          type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        },
        {
          label: 'Favorable',
          name: 'favorable',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 200,
          list: [
            {
              value: 1,
              label: 'Plaintiff',
            },
            {
              value: 2,
              label: 'Defendant',
            },
            {
              value: 3,
              label: 'Non Party',
            },
          ],
          groupBy: true,
        },
        {
          label: 'Value Important Index',
          name: 'important',
          type: ATTRIBUTE_FIELDS.PROGRESS.TYPE,
          width: 200,
          list: [],
          groupBy: true,
        },
        {
          label: 'Relevant Index',
          name: 'relevant',
          type: ATTRIBUTE_FIELDS.PROGRESS.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        },
        {
          label: 'Value Level',
          name: 'value_level',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 200,
          groupBy: true,
        },
        {
          label: 'Relevant Level',
          name: 'relevant_level',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 200,
          groupBy: true,
        },
        {
          label: 'Important Level',
          name: 'important_level',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 200,
          groupBy: true,
        },

        {
          label: 'Fact Source',
          name: 'sources',
          type: ATTRIBUTE_FIELDS.LIST.TYPE,
          width: 200,
          list: [],
          itemText: 'name',
          itemValue: 'pk',
          multiple: true,
          chips: true,
          groupBy: false,
        },
        {
          label: 'Fact Interpretation',
          name: 'interpretation',
          type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
        },
      ]
    },
    dataGroup() {
      return {
        '': {
          results: [
            {
              name: 'lorem',
            },
          ],
        },
      }
    },
  },
}
</script>

<style scoped></style>
