import { ATTRIBUTE_FIELDS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'

export const fieldsLawSchool = {
  University: {
    name: 'University',
    type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
    width: 300,
    pathLink() {
      return `/odt/law-schools/${this.pk}`
    },
  },
  TotalJudges: {
    name: 'Total_Judges',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  DemocraticJudges: {
    name: 'Democratic_Judges',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  RepublicanJudges: {
    name: 'Republican_Judges',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  TotalOpinions: {
    name: 'Total_Opinions',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  TotalDockets: {
    name: 'Total_Dockets',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  FederalDistrict: {
    name: 'Federal_District',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  StateSupreme: {
    name: 'State_Supreme',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  Trendline: {
    name: 'Trendline',
    type: ATTRIBUTE_FIELDS.SPARK_LINE.TYPE,
  },
  quarter1st: {
    name: 'quarter_1st',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  quarter2nd: {
    name: 'quarter_2nd',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  quarter3rd: {
    name: 'quarter_3rd',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  quarter4th: {
    name: 'quarter_4th',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  today: {
    name: 'to_day',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  legalIssues: {
    name: 'legal_issues',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
    multiple: true,
    width: 300,
  },

  yesterday: {
    name: 'yesterday',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  last7day: {
    name: 'last_7_day',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  last30day: {
    name: 'last_30_day',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },

  year1: {
    name: 'year_1',
    label: (new Date().getFullYear() - 1).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year2: {
    name: 'year_2',
    label: (new Date().getFullYear() - 2).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year3: {
    name: 'year_3',
    label: (new Date().getFullYear() - 3).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year4: {
    name: 'year_4',
    label: (new Date().getFullYear() - 4).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year5: {
    name: 'year_5',
    label: (new Date().getFullYear() - 5).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year6: {
    name: 'year_6',
    label: (new Date().getFullYear() - 6).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year7: {
    name: 'year_7',
    label: (new Date().getFullYear() - 7).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year8: {
    name: 'year_8',
    label: (new Date().getFullYear() - 8).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year9: {
    name: 'year_9',
    label: (new Date().getFullYear() - 9).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
}
export const jurisdictionTypesMixins = {
  computed: {
    jurisdictionsTypes() {
      let gt = this.$store.getters['appConfigs/getChoicesConfigByName']
      return gt('Jurisdictions')
      // return types.filter((t) => ['F', 'FD'].includes(t.value)) // FEDERAL APPEALLATE và FEDERAL DISTRICT
    },
    jurisdictionsTypesFields() {
      let { jurisdictionsTypes } = this
      let attributes = jurisdictionsTypes.map((type) => {
        let t = {}
        t['name'] = type['value']
        t['label'] = type['label']
        t['type'] = ATTRIBUTE_FIELDS.INTEGER.TYPE
        return t
      })
      return attributes
    },
  },
}
export const attributesUniversityMixin = {
  computed: {
    attributes() {
      return [
        fieldsLawSchool.University,
        fieldsLawSchool.TotalJudges,
        fieldsLawSchool.DemocraticJudges,
        fieldsLawSchool.RepublicanJudges,
        fieldsLawSchool.TotalOpinions,
        fieldsLawSchool.TotalDockets,
      ]
    },
  },
}
