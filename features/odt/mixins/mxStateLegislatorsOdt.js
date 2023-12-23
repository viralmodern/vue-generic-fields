import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'

export const fieldsStateLegislatorsOdt = {
  name: {
    name: 'name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },
  current_party: {
    name: 'current_party',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },

  current_district: {
    name: 'current_district',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
  },
  current_chamber: {
    name: 'current_chamber',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.TITLE,
  },
  given_name: {
    name: 'given_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },
  family_name: {
    name: 'family_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },
  gender: {
    name: 'gender',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
  },
  email: {
    name: 'email',
    type: ATTRIBUTE_FIELDS.EMAIL.TYPE,
  },
  biography: {
    name: 'biography',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  birth_date: {
    name: 'birth_date',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  death_date: {
    name: 'death_date',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  image: {
    name: 'image',
    type: ATTRIBUTE_FIELDS.PICTURE.TYPE,
  },
  links: {
    name: 'links',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
  sources: {
    name: 'sources',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
  capitol_address: {
    name: 'capitol_address',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  capitol_voice: {
    name: 'capitol_voice',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  capitol_fax: {
    name: 'capitol_fax',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  district_address: {
    name: 'district_address',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  district_voice: {
    name: 'district_voice',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  district_fax: {
    name: 'district_fax',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  twitter: {
    name: 'twitter',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
  youtube: {
    name: 'youtube',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
  instagram: {
    name: 'instagram',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
  facebook: {
    name: 'facebook',
    type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
  },
}
export const stateLegislatorsMixin = {
  computed: {
    attributes() {
      return [
        {
          ...fieldsStateLegislatorsOdt.name,
        },
        {
          ...fieldsStateLegislatorsOdt.current_party,
        },
        {
          ...fieldsStateLegislatorsOdt.current_district,
        },
        {
          ...fieldsStateLegislatorsOdt.current_chamber,
        },
        {
          ...fieldsStateLegislatorsOdt.given_name,
        },
        {
          ...fieldsStateLegislatorsOdt.family_name,
        },
        {
          ...fieldsStateLegislatorsOdt.gender,
        },
        {
          ...fieldsStateLegislatorsOdt.email,
        },
        {
          ...fieldsStateLegislatorsOdt.biography,
        },
        {
          ...fieldsStateLegislatorsOdt.birth_date,
        },
        {
          ...fieldsStateLegislatorsOdt.death_date,
        },
        {
          ...fieldsStateLegislatorsOdt.image,
          width: 100,
        },
        {
          ...fieldsStateLegislatorsOdt.links,
        },
        {
          ...fieldsStateLegislatorsOdt.sources,
        },
        {
          ...fieldsStateLegislatorsOdt.capitol_address,
        },
        {
          ...fieldsStateLegislatorsOdt.capitol_voice,
        },
        {
          ...fieldsStateLegislatorsOdt.capitol_fax,
        },
        {
          ...fieldsStateLegislatorsOdt.district_address,
        },
        {
          ...fieldsStateLegislatorsOdt.district_voice,
        },
        {
          ...fieldsStateLegislatorsOdt.district_fax,
        },
        {
          ...fieldsStateLegislatorsOdt.twitter,
        },
        {
          ...fieldsStateLegislatorsOdt.youtube,
        },
        {
          ...fieldsStateLegislatorsOdt.instagram,
        },
        {
          ...fieldsStateLegislatorsOdt.facebook,
        },
      ]
    },
  },
}
