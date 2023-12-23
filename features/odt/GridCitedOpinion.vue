<template>
  <div>
    <SlickGrid
      :attributes="attributes"
      :height="height"
      disabled-add-new-row
      disabled-add-new-column
      :has-vote-row="false"
      :has-report-row="false"
      disabled-bookmark-row
      no-group
      :path-link-row-detail="`/odt/opinions`"
      :end-point="endPoint"
    />
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import { ATTRIBUTE_FIELDS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
export default {
  name: 'GridCitedOpinion',
  components: { SlickGrid },
  props: {
    endPoint: {
      type: String,
      default: () => '',
    },
    height: {
      type: String,
      default: () => '70vh',
    },
  },
  computed: {
    attributes() {
      let PrecedentialStatus = this.$store.getters[
        'appConfigs/getChoicesConfigByName'
      ]('PrecedentialStatus')
      return [
        {
          name: 'matter_name',
          type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
          width: 250,
          pathLink: function () {
            return `/odt/opinions/${this.pk}`
          },
        },
        {
          name: 'docket_number',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'date_filed',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'judges',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'attorneys',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'nature_of_suit',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'cluster__precedential_status',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 300,
          list: PrecedentialStatus,
        },
        {
          name: 'court',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'citations',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'times',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'cited_by',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
