import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
export const fieldsFDICInsuredBanksOfCounty = {
  name: {
    name: 'name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
    width: 200,
  },
  fdic_id: {
    name: 'fdic_id',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  address: {
    name: 'address',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
  },
  address_institution: {
    name: 'address_institution',
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
  fips: {
    name: 'fips',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.STATE,
  },

  zip: {
    name: 'zip',
    label: 'zip_code',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.ZIP_CODE,
  },

  branch_service: {
    name: 'branch_service',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  branch_office_number: {
    name: 'branch_office_number',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  core_based_statistical_area_name: {
    name: 'core_based_statistical_area_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  total_assets: {
    name: 'total_assets',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  institution_class: {
    name: 'institution_class',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    groupBy: true,
  },
  institution_hq_city: {
    name: 'institution_hq_city',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  Country_Name: {
    name: 'Country_Name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  New_Brick_And_Mortar_Flag: {
    name: 'New_Brick_And_Mortar_Flag',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  Total_Domestic_Deposits: {
    name: 'Total_Domestic_Deposits',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  Institution_name: {
    name: 'Institution_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  Name_of_Regulatory_High_Hold: {
    name: 'Name_of_Regulatory_High_Hold',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  Primary_Federal_Regulator: {
    name: 'Primary_Federal_Regulator',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  Federal_Reserve_Bank_ID_Number: {
    name: 'Federal_Reserve_Bank_ID_Number',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  FIPS_State_Code: {
    name: 'FIPS_State_Code',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  FIPS_County_Number: {
    name: 'FIPS_County_Number',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  Standardized_Address_Institution: {
    name: 'Standardized_Address_Institution',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  Standardized_Address_Branch: {
    name: 'Standardized_Address_Branch',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
}
