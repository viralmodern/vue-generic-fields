<template>
  <div>
    <SlickGrid
      :attributes="reduceAttributes"
      disabled-add-new-row
      disabled-add-new-column
      :height="height"
      no-query-params
    />
  </div>
</template>

<script>
import { fieldsLawyers, lawyersMixin } from '~/features/odt/mixins/lawyersOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import SlickGrid from '~/sat-vue-toolkit/components/slick-grid/SlickGrid'
let {
  PracticeAreas,
  LawyerProfile,
  Education,
  CompanyProfile,
  DocketParty,
} = ROUTES.Lawyers
export default {
  name: 'GridAllLawyersOdt',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${77}vh`,
    },
    includesSubs: {
      type: Array,
      default: () => [],
    },
  },
  mixins: [lawyersMixin],
  computed: {
    currentLawyers() {
      let { query } = this.$route
      let _by = query['by']
      return _by
    },
    reduceAttributes() {
      let { currentLawyers, attributes, includesSubs } = this
      let isIncludesSubs = includesSubs.length > 0
      let fieldsCompare = []
      let fieldsLawyersPracticeAreas = [fieldsLawyers.practice_area]
      let fieldsLawyersEducation = [
        fieldsLawyers.admitted,
        fieldsLawyers.law_school,
        fieldsLawyers.graduation_year,
        fieldsLawyers.college,
      ]
      let fieldsLawyersProfile = [
        fieldsLawyers.member_ship,
        fieldsLawyers.biographical,
        fieldsLawyers.military,
        fieldsLawyers.born,
        fieldsLawyers.birth_year,
      ]
      let fieldsLawyersDocketParty = [
        fieldsLawyers.party_name,
        fieldsLawyers.party_type,
        fieldsLawyers.law_firm,
        fieldsLawyers.counsel_information,
        fieldsLawyers.counsel_type,
        fieldsLawyers.docket_number,
      ]
      let fieldsLawyersCompanyProfile = [
        fieldsLawyers.company,
        fieldsLawyers.title,
        fieldsLawyers.address,
        fieldsLawyers.city,
        fieldsLawyers.state,
        fieldsLawyers.zip_code,
        fieldsLawyers.county,
        fieldsLawyers.phone,
        fieldsLawyers.fax,
        fieldsLawyers.email,
      ]
      if (currentLawyers === PracticeAreas.path) {
        fieldsCompare = [...fieldsLawyersPracticeAreas]
      } else if (currentLawyers === Education.path) {
        fieldsCompare = [...fieldsLawyersEducation]
      } else if (currentLawyers === LawyerProfile.path) {
        fieldsCompare = [...fieldsLawyersProfile]
      } else if (currentLawyers === DocketParty.path) {
        fieldsCompare = [...fieldsLawyersDocketParty]
      } else if (currentLawyers === CompanyProfile.path) {
        fieldsCompare = [...fieldsLawyersCompanyProfile]
      } else {
        if (isIncludesSubs) {
          let firstSub = includesSubs[0]
          if (firstSub.path === DocketParty.path) {
            fieldsCompare = [...fieldsLawyersDocketParty]
          } else {
            fieldsCompare = [...fieldsLawyersCompanyProfile]
          }
        } else {
          fieldsCompare = [...fieldsLawyersCompanyProfile]
        }
      }
      if (fieldsCompare.length) {
        let fs = [fieldsLawyers.name, ...fieldsCompare]
        let namesFieldsCompare = fs.map((f) => f.name)
        return attributes.filter((attribute) => {
          return namesFieldsCompare.includes(attribute.name)
        })
      }
      return attributes
    },
  },
}
</script>

<style scoped></style>
