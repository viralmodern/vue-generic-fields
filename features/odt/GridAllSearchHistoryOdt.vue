<template>
  <div>
    <SlickGrid
      :attributes="attributes"
      no-group
      no-query-params
      :items="items"
      :has-vote-row="false"
      :has-report-row="false"
      disabled-bookmark-row
      disabled-add-new-row
      disabled-add-new-column
      disabled-filter
      :height="height"
    />
  </div>
</template>

<script>
import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
import SlickGrid from '~/sat-vue-toolkit/components/slick-grid/SlickGrid'

export default {
  name: 'GridAllSearchHistoryOdt',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${80}vh`,
    },
  },
  computed: {
    items() {
      return {
        '': {
          count: 2,
          results: [
            {
              key_word: 'Hallo',
              search_location: 'Doe v. The Trump Corporation (1:18-cv-09936)',
              name: '125 results',
              search_time: new Date().toString(),
              search_results: {
                text: '125 results',
              },
            },
            {
              key_word: 'epstein',
              search_location: 'Doe v. The Trump Corporation (1:18-cv-09936)',
              name: '1 result',
              search_time: new Date().toString(),
              search_results: {
                docket: 4354316,
                text: '1 result',
              },
            },
          ],
        },
      }
    },
    attributes() {
      let { $$rootPathDocketOdt } = this
      return [
        {
          name: 'key_word',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'search_location',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'search_time',
          type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
        },
        {
          name: 'search_results',
          type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
          pathLink: function () {
            if (this.search_results.hasOwnProperty('docket')) {
              let docket = this.search_results['docket']
              return `${$$rootPathDocketOdt}/${docket}/search?q=${this.key_word}`
            }
            return `/odt/opinions/search?q=${this.key_word}`
          },
        },
      ]
    },
  },
}
</script>

<style scoped></style>
