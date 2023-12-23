<template>
  <div>
    <SlickGrid
      count-label-singular="Opinion"
      count-label-many="Opinions"
      :has-vote-row="false"
      :end-point="endPoint"
      :owner-pk="ownerPk"
      :height="height"
      disabled-add-new-column
      main-cell-id="matter_name"
      :show-quick-add-row="false"
      :show-button-quick-add-modal="false"
      :ui-show-add-row-modal="false"
      bus-event-name="bus-opinion-entries"
      :attributes="attributes"
      :path-link-row-detail="`/odt/deposition`"
      disabled-sort
      no-link-detail
      :items-per-page="2000000"
    >
    </SlickGrid>
  </div>
</template>

<script>
import SlickGrid from '~/sat-vue-toolkit/components/slick-grid/SlickGrid'
import { $$arrToString } from '@/sat-vue-toolkit/functions'
import { SESSION, setSESSION } from '~/utils'
import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
export default {
  name: 'GridDepositionTranscriptQA',
  components: { SlickGrid },
  filters: {
    $$arrToString,
  },
  data() {
    return {
      endPoint: '/api/opinions/',
    }
  },
  async created() {},
  props: {
    height: {
      default: () => `${80}vh`,
    },
  },
  computed: {
    attributes() {
      return [
        {
          label: 'transcript context',
          name: 'matter_name',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'context_type',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'rake',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'people',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'organization',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'pos',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'compound',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'neu',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'neg',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
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
