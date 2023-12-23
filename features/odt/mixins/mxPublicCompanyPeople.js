import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'

export const fieldsPublicCompanyPeople = {
  name: {
    name: 'name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },
  first_name: {
    name: 'first_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },
  last_name: {
    name: 'last_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.NAME,
  },
  location: {
    name: 'location',
    type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
  },
  headline: {
    name: 'headline',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  summary: {
    name: 'summary',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  work_experience: {
    name: 'work_experience',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  education: {
    name: 'education',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  skills_and_endorsements: {
    name: 'skills_and_endorsements',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
  },
  certifications: {
    name: 'certifications',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
  },
  languages: {
    name: 'languages',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
  },
  courses_taken: {
    name: 'courses_taken',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
  },
  industry: {
    name: 'industry',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  memberships: {
    name: 'memberships',
    type: ATTRIBUTE_FIELDS.LIST.TYPE,
    chips: true,
  },
  publications: {
    name: 'publications',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  patents: {
    name: 'patents',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  projects: {
    name: 'projects',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  awards: {
    name: 'awards',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  volunteering_experiences: {
    name: 'volunteering_experiences',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
}
