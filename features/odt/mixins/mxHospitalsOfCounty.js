import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
export const fieldsHospitalsOfCounty = {
  name: {
    name: 'name',
    label: 'Hospital Name',
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
  county: {
    name: 'county',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.COUNTY,
  },
  population: {
    name: 'population',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  county_fips: {
    name: 'county_fips',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  country: {
    name: 'country',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  website: {
    name: 'website',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
  bed: {
    name: 'bed',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  owner: {
    name: 'owner',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    groupBy: true,
  },
  trauma: {
    name: 'trauma',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  helicopter_pad: {
    name: 'helicopter_pad',
    type: ATTRIBUTE_FIELDS.CHECKBOX.TYPE,
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
  source_datetime: {
    name: 'source_datetime',
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
}
