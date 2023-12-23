<template>
  <div>
    <SlickGrid
      :attributes="attributes"
      no-query-params
      :items="items"
      disabled-add-new-column
      disabled-add-new-row
      :has-report-row="false"
      :has-vote-row="false"
      disabled-bookmark-row
      no-link-detail
      no-group
      :height="height"
    />
  </div>
</template>

<script>
import { ATTRIBUTE_FIELDS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'

export default {
  name: 'GridAllRecentVisitOdt',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `92vh`,
    },
  },
  computed: {
    items() {
      return {
        '': {
          count: 2,
          results: [
            {
              name:
                'Jarrow Formulas, Inc. v. LaMarche, 74 P.3d 737 (Cal. 2003)',
              recent_visit: {
                path: `/opinions/2625375`,
                name:
                  'Jarrow Formulas, Inc. v. LaMarche, 74 P.3d 737 (Cal. 2003)',
              },
              date_time: new Date().toString(),
            },
            {
              name: 'Probulk Carriers Limited v. Marvel International',
              recent_visit: {
                path: `/dockets/4354316`,
                name: 'Probulk Carriers Limited v. Marvel International',
              },
              date_time: new Date().toString(),
            },
          ],
        },
      }
    },
    attributes() {
      return [
        {
          name: 'recent_visit',
          type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
          pathLink: `/odt`,
          // pathLinkValue: ['opinion', 'docket'],
          width: 350,
        },
        {
          name: 'date_time',
          type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
