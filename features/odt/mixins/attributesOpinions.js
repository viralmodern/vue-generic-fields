import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
export const mxOpinions = {
  computed: {
    attributesOpinions() {
      let PrecedentialStatus = this.$store.getters[
        'appConfigs/getChoicesConfigByName'
      ]('PrecedentialStatus')
      return [
        {
          label: 'Matter Name',
          name: 'matter_name',
          type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
          pathLink: function () {
            return `/odt/opinions/${this.pk}`
          },
        }, // N/A

        {
          label: 'jurisdiction',
          name: 'court',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 200,
          multiple: false,
          readOnly: true,
        }, // N/A
        {
          label: 'docket number',
          name: 'docket_number',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          multiple: false,
          required: true,
          readOnly: true,
        }, // N/A
        {
          label: 'date created',
          name: 'date_filed',
          type: ATTRIBUTE_FIELDS.DATE.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A

        {
          label: 'Judges',
          name: 'judges',
          type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          label: 'Attorneys',
          name: 'attorneys',
          type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          label: 'nature of suit',
          name: 'nature_of_suit',
          type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
          width: 200,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          label: 'Precedential Status',
          name: 'cluster__precedential_status',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 200,
          list: PrecedentialStatus,
          groupBy: true,
          readOnly: true,
        }, // N/A
        {
          label: 'citations',
          name: 'citations',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 200,
          groupBy: false,
          multiple: true,
          readOnly: true,
        }, // N/A
      ]
    },
  },
}
