import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'

export const fieldsStateBillsOdt = {
  identifer: {
    name: 'identifer',
    label: 'Bill ID',
    type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
  },
  title: {
    name: 'title',
    label: 'Bill Title',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  session_identifier: {
    name: 'session_identifier',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  jurisdiction: {
    name: 'jurisdiction',
    label: 'state',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
  },
  organization_classification: {
    name: 'organization_classification',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  abstract: {
    name: 'abstract',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  introduced_date: {
    name: 'introduced_date',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  total_sponsors: {
    name: 'total_sponsors',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_actions: {
    name: 'total_actions',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_votes: {
    name: 'total_votes',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  bill_source: {
    name: 'bill_source',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },

  entry_number: {
    name: 'entry_number',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },

  entry_date: {
    name: 'entry_date',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  entry_description: {
    name: 'entry_description',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  classification: {
    name: 'classification',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
  },
  sponsor_name: {
    name: 'sponsor_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  sponsor_type: {
    name: 'sponsor_type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  primary: {
    name: 'f_primary',
    label: 'primary',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  voter_name: {
    name: 'voter_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  option: {
    name: 'option',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  vote_source: {
    name: 'vote_source',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
}
