import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
export const fieldsJudgesOfCounty = {
  name: {
    name: 'name',
    label: 'Judge Name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },
  state: {
    name: 'state',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.STATE,
  },
  county: {
    name: 'county',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.COUNTY,
  },
  from: {
    name: 'from',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  to: {
    name: 'to',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  appointed_by: {
    name: 'appointed_by',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  jurisdiction: {
    name: 'jurisdiction',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
  },
  jurisdiction_type: {
    name: 'jurisdiction_type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  appeal_court: {
    name: 'appeal_court',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
  },
  federal_district: {
    name: 'federal_district',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
  },
  federal_appellate: {
    name: 'federal_appellate',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
  },
  picture: {
    name: 'picture',
    type: ATTRIBUTE_FIELDS.PICTURE.TYPE,
  },
  biography: {
    name: 'biography',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  contact_information: {
    name: 'contact_information',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  admitted_since: {
    name: 'admitted_since',
    type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
  },
  degree: {
    name: 'degree',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  university: {
    name: 'university',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  year: {
    name: 'year',
    type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
  },
  title: {
    name: 'title',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  company: {
    name: 'company',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  career_type: {
    name: 'career_type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    list: [
      {
        value: 'N/A',
        label: 'N/A',
      },
      {
        value: 'N/A',
        label: 'N/A',
      },
      {
        value: 'Judicial',
        label: 'Judicial',
      },
      {
        value: 'Non-Judicial',
        label: 'Non-Judicial',
      },
    ],
  },
}
