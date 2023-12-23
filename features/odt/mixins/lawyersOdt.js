import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'

export const fieldsLawyers = {
  name: {
    name: 'name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
    width: 200,
  },
  company: {
    name: 'company',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.COMPANY_NAME,
    width: 200,
  },
  title: {
    name: 'title',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.TITLE,
    width: 200,
  },
  address: {
    name: 'address',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    width: 200,
  },
  city: {
    name: 'city',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.CITY,
    width: 200,
  },
  state: {
    name: 'state',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.STATE,
    width: 200,
  },
  zip_code: {
    name: 'zip_code',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.ZIP_CODE,
    width: 200,
  },
  county: {
    name: 'county',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.COUNTY,
    width: 200,
  },
  phone: {
    name: 'phone',
    type: ATTRIBUTE_FIELDS.PHONE_NUMBER.TYPE,
    width: 200,
  },
  fax: {
    name: 'fax',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 200,
  },
  email: {
    name: 'email',
    type: ATTRIBUTE_FIELDS.EMAIL.TYPE,
    width: 200,
  },
  practice_area: {
    name: 'practice_area',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 200,
  },
  admitted: {
    name: 'admitted',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 200,
  },
  law_school: {
    name: 'law_school',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 200,
  },
  graduation_year: {
    name: 'graduation_year',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 200,
  },
  college: {
    name: 'college',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 200,
  },
  member_ship: {
    name: 'member_ship',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 200,
  },
  biographical: {
    name: 'biographical',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 200,
  },
  military: {
    name: 'military',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 200,
  },
  born: {
    name: 'born',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 200,
  },
  birth_year: {
    name: 'birth_year',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
    width: 200,
  },
  party_name: {
    name: 'party_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 200,
  },
  party_type: {
    name: 'party_type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  law_firm: {
    name: 'law_firm',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  counsel_information: {
    name: 'counsel_information',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  counsel_type: {
    name: 'counsel_type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  docket_number: {
    name: 'docket_number',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
}
export const lawyersMixin = {
  computed: {
    attributes() {
      return [
        {
          ...fieldsLawyers.name,
        },
        {
          ...fieldsLawyers.company,
        },

        {
          ...fieldsLawyers.title,
        },
        {
          ...fieldsLawyers.address,
        },
        {
          ...fieldsLawyers.city,
        },
        {
          ...fieldsLawyers.state,
        },
        {
          ...fieldsLawyers.zip_code,
        },
        {
          ...fieldsLawyers.county,
        },
        {
          ...fieldsLawyers.phone,
        },
        {
          ...fieldsLawyers.fax,
        },
        {
          ...fieldsLawyers.email,
        },
        {
          ...fieldsLawyers.practice_area,
        },
        {
          ...fieldsLawyers.admitted,
        },
        {
          ...fieldsLawyers.law_school,
        },
        {
          ...fieldsLawyers.graduation_year,
        },
        {
          ...fieldsLawyers.college,
        },
        {
          ...fieldsLawyers.member_ship,
        },
        {
          ...fieldsLawyers.biographical,
        },
        {
          ...fieldsLawyers.military,
        },
        {
          ...fieldsLawyers.born,
        },
        {
          ...fieldsLawyers.birth_year,
        },
        {
          ...fieldsLawyers.party_name,
        },
        {
          ...fieldsLawyers.party_type,
        },
        {
          ...fieldsLawyers.law_firm,
        },
        {
          ...fieldsLawyers.counsel_information,
        },
        {
          ...fieldsLawyers.counsel_type,
        },
        {
          ...fieldsLawyers.docket_number,
        },
      ]
    },
  },
}
