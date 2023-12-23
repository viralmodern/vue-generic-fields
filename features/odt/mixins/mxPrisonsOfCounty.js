import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
export const fieldsPrisonsOfCounty = {
  name: {
    name: 'name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },
  facility_id: {
    name: 'facility_id',
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
  state: {
    name: 'state',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.STATE,
  },
  zip: {
    name: 'zip',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.ZIP_CODE,
  },
  telephone: {
    name: 'telephone',
    type: ATTRIBUTE_FIELDS.PHONE_NUMBER.TYPE,
  },
  type: {
    name: 'type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    groupBy: true,
  },
  status: {
    name: 'status',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    groupBy: true,
  },
  website: {
    name: 'website',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
  population: {
    name: 'population',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  county: {
    name: 'county',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  county_fips: {
    name: 'county_fips',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  secure_level: {
    name: 'secure_level',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  capacity: {
    name: 'capacity',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  naics_code: {
    name: 'naics_code',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  naics_desc: {
    name: 'naics_desc',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
}
