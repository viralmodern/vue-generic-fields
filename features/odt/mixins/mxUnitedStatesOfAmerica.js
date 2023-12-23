import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
export const fieldsUnitedStatesOfAmericaOdt = {
  state: {
    name: 'state',
    type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.STATE,
  },
  ap_abbr: {
    name: 'ap_abbr',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  capital: {
    name: 'capital',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
    sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.CITY,
  },
  total_county: {
    name: 'total_county',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  total_public_companies: {
    name: 'total_public_companies',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  total_legislators: {
    name: 'total_legislators',
    type: ATTRIBUTE_FIELDS.INTEGER.TYPE,
  },
  total_county_judges: {
    name: 'total_county_judges',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_hospital: {
    name: 'total_hospital',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_law_enforcement: {
    name: 'total_law_enforcement',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_cities: {
    name: 'total_cities',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_prisons: {
    name: 'total_prisons',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_law_firms: {
    name: 'total_law_firms',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_public_schools: {
    name: 'total_public_schools',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_private_schools: {
    name: 'total_private_schools',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_lawyers: {
    name: 'total_lawyers',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_colleges_and_universities: {
    name: 'total_colleges_and_universities',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
  total_state_organizations: {
    name: 'total_state_organizations',
    type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
  },
}
