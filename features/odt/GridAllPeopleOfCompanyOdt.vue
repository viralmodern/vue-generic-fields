<template>
  <div>
    <SlickGrid
      :height="height"
      disabled-add-new-column
      disabled-add-new-row
      :attributes="attributes"
      no-query-params
    />
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { fieldsPublicCompanyPeople } from '~/features/odt/mixins/mxPublicCompanyPeople'
let { Others, BasicInfo, Qualifications } = ROUTES.PublicCompanyPeople
export default {
  name: 'GridAllPeopleOfCompanyOdt',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${82}vh`,
    },
    subs: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    defaultSub() {
      let { subs } = this
      if (Array.isArray(subs)) {
        let firstSub = subs[0]
        if (firstSub) return firstSub
        return false
      } else {
        return false
      }
    },
    attributes() {
      let { defaultSub } = this
      let {
        $route: {
          query: { by },
        },
        attributesFrozen,
      } = this
      switch (by) {
        case BasicInfo.path:
          return [...attributesFrozen, ...this.attributesInformation]
        case Qualifications.path:
          return [...attributesFrozen, ...this.attributesProfile]
        case Others.path:
          return [...attributesFrozen, ...this.attributesOthers]
        default:
          if (defaultSub) {
            if (defaultSub.path === BasicInfo.path) {
              return [...attributesFrozen, ...this.attributesInformation]
            } else if (defaultSub.path === Qualifications.path) {
              return [...attributesFrozen, ...this.attributesProfile]
            }
          }
          return [...attributesFrozen, ...this.attributesInformation]
      }
    },
    attributesFrozen() {
      let { params } = this.$route
      return [
        {
          ...fieldsPublicCompanyPeople.name,
          width: 200,
          pathLink: function () {
            let pk = `${this.pk}`
            return {
              name: `odt-united-states-of-america-state-county-county`,
              params: {
                ...params,
                county: pk,
              },
            }
          },
        },
      ]
    },

    attributesInformation() {
      return [
        { ...fieldsPublicCompanyPeople.first_name },
        { ...fieldsPublicCompanyPeople.last_name },
        { ...fieldsPublicCompanyPeople.location },
        { ...fieldsPublicCompanyPeople.headline },
        { ...fieldsPublicCompanyPeople.summary },
      ]
    },
    attributesProfile() {
      return [
        { ...fieldsPublicCompanyPeople.work_experience },
        { ...fieldsPublicCompanyPeople.education },
        { ...fieldsPublicCompanyPeople.skills_and_endorsements },
        { ...fieldsPublicCompanyPeople.certifications },
        { ...fieldsPublicCompanyPeople.languages },
        { ...fieldsPublicCompanyPeople.courses_taken },
        { ...fieldsPublicCompanyPeople.industry },
      ]
    },
    attributesOthers() {
      return [
        { ...fieldsPublicCompanyPeople.memberships },
        { ...fieldsPublicCompanyPeople.publications },
        { ...fieldsPublicCompanyPeople.patents },
        { ...fieldsPublicCompanyPeople.projects },
        { ...fieldsPublicCompanyPeople.awards },
        { ...fieldsPublicCompanyPeople.volunteering_experiences },
      ]
    },
  },
}
</script>

<style scoped></style>
