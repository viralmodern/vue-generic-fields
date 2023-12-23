import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'

export const fieldsPublicTradedCompaniesOfState = {
  company_name: {
    name: 'company_name',
    type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.COMPANY_NAME,
  },
  ticker: {
    name: 'ticker',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  cik_number: {
    name: 'cik_number',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  state_location: {
    name: 'state_location',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
  },
  fiscal_year_end: {
    name: 'fiscal_year_end',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  sic: {
    name: 'sic',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  location: {
    name: 'location',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
  },
  phone_number: {
    name: 'phone_number',
    type: ATTRIBUTE_FIELDS.PHONE_NUMBER.TYPE,
  },
  website: {
    name: 'website',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
  exchange: {
    name: 'exchange',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  market_cap: {
    name: 'market_cap',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  stock_style: {
    name: 'stock_style',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  employees: {
    name: 'employees',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  irs_number: {
    name: 'irs_number',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  total_dockets: {
    name: 'total_dockets',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_sec_filings: {
    name: 'total_sec_filings',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
}
