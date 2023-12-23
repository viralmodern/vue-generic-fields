<template>
  <div>
    <SlickGrid
      no-query-params
      count-label-singular="Opinion"
      count-label-many="Opinions"
      :owner-pk="ownerPk"
      :height="height"
      disabled-add-new-column
      disabled-add-new-row
      main-cell-id="matter_name"
      bus-event-name="bus-opinion-entries"
      :attributes="attributes"
      disabled-sort
    />
  </div>
</template>

<script>
import SlickGrid from '~/sat-vue-toolkit/components/slick-grid/SlickGrid'
import { $$arrToString } from '@/sat-vue-toolkit/functions'
import { SESSION, setSESSION } from '~/utils'
import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'

export default {
  name: 'GridAllDeposition',
  components: { SlickGrid },
  filters: {
    $$arrToString,
  },
  data() {
    return {
      // endPoint: 'https://www.courtlistener.com/api/rest/v3/search',
      endPoint: '/api/opinions/',
    }
  },
  async created() {},
  props: {
    height: {
      default: () => `${80}vh`,
    },
    pathLinkRowDetail: {
      type: String,
      default: `/odt/depositions`,
    },
  },
  computed: {
    attributes() {
      return [
        {
          name: 'matter_name',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.TITLE,
        }, // N/A
        {
          name: 'entry_number',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        }, // N/A
        {
          name: 'date_filed',
          type: ATTRIBUTE_FIELDS.DATE.TYPE,
        }, // N/A
        {
          name: 'document',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        }, // N/A
        {
          name: 'deposition_name',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        }, // N/A
        {
          name: 'deponent',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        }, // N/A
        {
          name: 'deposition_location',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        }, // N/A
        {
          name: 'deposition_party',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        }, // N/A
        {
          name: 'presented_counsel_1',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        }, // N/A
        {
          name: 'presented_counsel_2',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        }, // N/A
        {
          name: 'deposition_date',
          type: ATTRIBUTE_FIELDS.DATE.TYPE,
        }, // N/A
        {
          name: 'transcript_pages',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        }, // N/A
        {
          name: 'estimated_reading_time',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        }, // N/A
        {
          name: 'rake',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        }, // N/A
        {
          name: 'location',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        }, // N/A
        {
          name: 'people',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        }, // N/A
        {
          name: 'organization',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        }, // N/A
        {
          name: 'time',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        }, // N/A
      ]
    },
    ownerPk() {
      try {
        return this.$store.getters['auth/user']['pk']
      } catch (e) {
        return ''
      }
    },
    matterId() {
      return this.$route.params.matter
    },
  },
  methods: {
    clickLink(item) {
      setSESSION(SESSION.OPINION_ACTIVE, JSON.stringify(item))
    },
  },
}
</script>

<style scoped></style>
