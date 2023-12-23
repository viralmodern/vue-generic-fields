import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'

export const fieldsEnforcementOfCounty = {
  name: {
    name: 'name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },
  id: {
    name: 'id',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  address: {
    name: 'address',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
  },
  city: {
    name: 'city',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.CITY,
  },
  county_fips: {
    name: 'county_fips',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  county: {
    name: 'county',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.COUNTY,
  },
  type: {
    name: 'type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    groupBy: true,
  },
  population: {
    name: 'population',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  country: {
    name: 'country',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  csllea08_id: {
    name: 'csllea08_id',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  ftciv_number: {
    name: 'ftciv_number',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  ftsworn: {
    name: 'ftsworn',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  num_mobile: {
    name: 'num_mobile',
    type: ATTRIBUTE_FIELDS.PHONE_NUMBER.TYPE,
  },
  ptciv: {
    name: 'ptciv',
    label: 'PTCIV',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  tribal: {
    name: 'tribal',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },

  naics_code: {
    name: 'naics_code',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  naics_desc: {
    name: 'naics_desc',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  source: {
    name: 'source',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
  source_date: {
    name: 'source_date',
    type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
  },
  val_method: {
    name: 'val_method',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  val_date: {
    name: 'val_date',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  NUMFIXSUB: {
    name: 'val_date',
    label: 'NUMFIXSUB',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
}
