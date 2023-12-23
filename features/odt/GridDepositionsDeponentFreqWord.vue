<template>
  <div>
    <SlickGrid
      :height="height"
      disabled-add-new-column
      :show-quick-add-row="false"
      :show-button-quick-add-modal="false"
      :ui-show-add-row-modal="false"
      no-query-params
      :has-vote-row="false"
      :items="tempResults"
      no-link-detail
      :attributes="attributes"
    />
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
export default {
  name: 'GridDepositionsDeponentFreqWord',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${75}vh`,
    },
  },
  computed: {
    attributes() {
      return [
        {
          name: 'deponent',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          readOnly: true,
        },
        {
          name: 'Ghislaine_Maxwell',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          readOnly: true,
        },
        {
          name: 'bill_clinton',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          readOnly: true,
        },
        {
          name: 'jeffery_epstein',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          readOnly: true,
        },
        {
          name: 'tarama_foundation',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          readOnly: true,
        },
      ]
    },
    tempResults() {
      return {
        '': {
          results: [
            {
              deponent: 'Sexual abuse',
              Ghislaine_Maxwell: {
                color: 'ffecb3',
                label: 42,
                percent: 42,
              },
              bill_clinton: {
                color: 'ffecb3',
                label: 82,
                percent: 82,
              },
              jeffery_epstein: {
                color: 'ffecb3',
                label: 62,
                percent: 62,
              },
              tarama_foundation: {
                color: 'ffecb3',
                label: 72,
                percent: 72,
              },
            },
            {
              deponent: 'Virgin Island ',
              Ghislaine_Maxwell: {
                color: 'ffecb3',
                label: 32,
                percent: 32,
              },
              bill_clinton: {
                color: 'ffecb3',
                label: 82,
                percent: 82,
              },
              jeffery_epstein: {
                color: 'ffecb3',
                label: 92,
                percent: 92,
              },
              tarama_foundation: {
                color: 'ffecb3',
                label: 72,
                percent: 72,
              },
            },
            {
              deponent: 'Virgin Island ',
              Ghislaine_Maxwell: {
                color: 'ffecb3',
                label: 22,
                percent: 22,
              },
              bill_clinton: {
                color: 'ffecb3',
                label: 62,
                percent: 62,
              },
              jeffery_epstein: {
                color: 'ffecb3',
                label: 12,
                percent: 12,
              },
              tarama_foundation: {
                color: 'ffecb3',
                label: 72,
                percent: 72,
              },
            },
          ],
        },
      }
    },
  },
}
</script>

<style scoped></style>
