import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'

export const fieldsJudgesOdt = {
  name: {
    name: 'name',
    label: 'judge name',
    type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
    width: 250,
  },
  biographical: {
    name: 'biographical',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  political_affiliations: {
    name: 'political_affiliations',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  campaign_finance: {
    name: 'campaign_finance',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  current_status: {
    name: 'current_status',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  race: {
    name: 'race',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  gender: {
    name: 'gender',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  aba_ratings: {
    name: 'aba_ratings',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  university: {
    name: 'university',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  degree: {
    name: 'degree',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  year: {
    name: 'year',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  type: {
    name: 'type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  jurisdiction: {
    name: 'jurisdiction',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  from: {
    name: 'from',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  to: {
    name: 'to',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  position_length: {
    name: 'position_length',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  appointed_by: {
    name: 'appointed_by',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  confirmation_date: {
    name: 'confirmation_date',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  selected_by: {
    name: 'selected_by',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  senior_status_date: {
    name: 'senior_status_date',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  time_since_confirmed: {
    name: 'time_since_confirmed',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  total_opinions: {
    name: 'total_opinions',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_dockets: {
    name: 'total_dockets',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_orders: {
    name: 'total_orders',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_order_granting_in_part_and_denying_in_part: {
    name: 'total_order_granting_in_part_and_denying_in_part',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_order_granting: {
    name: 'total_order_granting',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_order_denying: {
    name: 'total_order_denying',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },

  total_cited_by: {
    name: 'total_cited_by',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  trend_line: {
    name: 'trend_line',
    type: ATTRIBUTE_FIELDS.SPARK_LINE.TYPE,
  },
  opinions_trendline: {
    name: 'opinions_trendline',
    type: ATTRIBUTE_FIELDS.SPARK_LINE.TYPE,
  },

  cited_by_trendline: {
    name: 'cited_by_trendline',
    type: ATTRIBUTE_FIELDS.SPARK_LINE.TYPE,
  },
  quarter_1st: {
    name: 'quarter_1st',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  quarter_2nd: {
    name: 'quarter_2nd',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  quarter_3rd: {
    name: 'quarter_3rd',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  quarter_4th: {
    name: 'quarter_4th',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year_1: {
    name: 'year_1',
    label: (new Date().getFullYear() - 1).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year_2: {
    name: 'year_2',
    label: (new Date().getFullYear() - 2).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year_3: {
    name: 'year_3',
    label: (new Date().getFullYear() - 3).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year_4: {
    name: 'year_4',
    label: (new Date().getFullYear() - 4).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year_5: {
    name: 'year_5',
    label: (new Date().getFullYear() - 5).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year_6: {
    name: 'year_6',
    label: (new Date().getFullYear() - 6).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year_7: {
    name: 'year_7',
    label: (new Date().getFullYear() - 7).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year_8: {
    name: 'year_8',
    label: (new Date().getFullYear() - 8).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  year_9: {
    name: 'year_9',
    label: (new Date().getFullYear() - 9).toString(),
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
}
