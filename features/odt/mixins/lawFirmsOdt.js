import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'

export const fieldsLawFirms = {
  company_name: {
    name: 'company_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.COMPANY_NAME,
    width: 200,
  },
  state: {
    name: 'state',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.STATE,
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
  website: {
    name: 'website',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
    width: 200,
  },
  address_line_1: {
    name: 'address_line_1',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    width: 200,
  },
  address_line_2: {
    name: 'address_line_2',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    width: 200,
  },
  city: {
    name: 'city',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.CITY,
    width: 200,
  },
  employees: {
    name: 'employees',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
    width: 200,
  },
  revenue: {
    name: 'revenue',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
    width: 200,
  },
  revenue_per_employee: {
    name: 'Revenue_per_employee',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
    width: 200,
  },
}
export const lawFirmsMixin = {
  computed: {
    attributes() {
      return [
        {
          ...fieldsLawFirms.company_name,
        },
        {
          ...fieldsLawFirms.address_line_1,
        },
        {
          ...fieldsLawFirms.address_line_2,
        },
        {
          ...fieldsLawFirms.city,
        },
        {
          ...fieldsLawFirms.state,
        },
        {
          ...fieldsLawFirms.phone,
        },
        {
          ...fieldsLawFirms.fax,
        },
        {
          ...fieldsLawFirms.employees,
        },
        {
          ...fieldsLawFirms.revenue,
        },
        {
          ...fieldsLawFirms.revenue_per_employee,
        },
      ]
    },
  },
}
