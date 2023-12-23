import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'

export const fieldsPublicCompanySecFilings = {
  filings: {
    name: 'filings',
    type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
  },
  document: {
    name: 'document',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  description: {
    name: 'description',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  filing_date: {
    name: 'filing_date',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  file_number: {
    name: 'file_number',
    label: 'File/Film Number',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  type: {
    name: 'type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  period_of_report: {
    name: 'period_of_report',
    type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
  },
  seq: {
    name: 'seq',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  size: {
    name: 'size',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  last_modified: {
    name: 'last_modified',
    type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
  },
  owner_name: {
    name: 'owner_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },
  transaction_date: {
    name: 'transaction_date',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  type_of_owner: {
    name: 'type_of_owner',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
}
