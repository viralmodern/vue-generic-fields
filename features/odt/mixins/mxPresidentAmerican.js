import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'

export const fieldsPresidentAmericanOdt = {
  president: {
    name: 'president',
    label: 'President',
    type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
    width: 250,
  },
  born: {
    name: 'born',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  race: {
    name: 'race',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  religion: {
    name: 'religion',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  political_affiliation: {
    name: 'political_affiliation',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  president_period: {
    name: 'president_period',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  president_length: {
    name: 'president_length',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_appointments: {
    name: 'total_appointments',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  average_appointment_days: {
    name: 'average_appointment_days',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  total_opinions: {
    name: 'total_opinions',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_dockets: {
    name: 'total_dockets',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },

  trend_line: {
    name: 'trend_line',
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
const subTypes = [
  {
    label: 'determination',
    value: 'determination',
  },
  {
    label: 'executive_order',
    value: 'executive_order',
  },
  {
    label: 'memorandum',
    value: 'memorandum',
  },
  {
    label: 'notice',
    value: 'notice',
  },
  {
    label: 'proclamation',
    value: 'proclamation',
  },
  {
    label: 'presidential_order',
    value: 'presidential_order',
  },
]
export const fieldsPresidentialDocuments = {
  title: {
    name: 'title',
    type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
    width: 250,
  },
  type: {
    // Presidential Document
    name: 'type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    list: [
      {
        label: 'Presidential Document',
        value: 'PTD',
      },
    ],
  },
  sub_type: {
    name: 'sub_type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    list: [...subTypes],
  },
  abstract: {
    name: 'abstract',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  agencies: {
    name: 'agencies',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    multiple: true,
    chips: true,
    width: 350,
  },
  document_number: {
    name: 'document_number',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  citation: {
    name: 'citation',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  publication_date: {
    name: 'publication_date',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  toc_doc: {
    name: 'toc_doc',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  toc_subject: {
    name: 'toc_subject',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  topics: {
    name: 'topics',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
  },
  disposition_notes: {
    name: 'disposition_notes',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  signing_date: {
    name: 'signing_date',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  document: {
    name: 'document',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
    width: 250,
  },
  page_length: {
    name: 'page_length',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  reading_times: {
    name: 'reading_times',
    type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
  },
}
