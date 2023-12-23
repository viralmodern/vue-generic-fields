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
import { fieldsStateUsCounty } from '~/features/odt/mixins/mxStateUsCounty'
let {
  Population,
  Others,
  Occupations,
  Health,
  ElectionResults,
  Demographics,
  CovidPolicies,
  CovidCases,
  CountyProfile,
  CountyIRSAuditRate,
  Education,
} = ROUTES.StateUsCounty
export default {
  name: 'GridAllCountyOfAmericaOdt',
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
        case CountyProfile.path:
          return [...attributesFrozen, ...this.attributesCountyProfile]
        case Education.path:
          return [...attributesFrozen, ...this.attributesCountyEducation]
        case Population.path:
          return [...attributesFrozen, ...this.attributesCountyPopulation]
        case Demographics.path:
          return [...attributesFrozen, ...this.attributesCountyDemographics]
        case Occupations.path:
          return [...attributesFrozen, ...this.attributesCountyOccupations]
        case Health.path:
          return [...attributesFrozen, ...this.attributesCountyHealth]
        case Others.path:
          return [...attributesFrozen, ...this.attributesCountyOthers]
        case ElectionResults.path:
          return [...attributesFrozen, ...this.attributesCountyElectionResults]
        case CountyIRSAuditRate.path:
          return [...attributesFrozen, ...this.attributesCountyIrsAuditRate]
        case CovidCases.path:
          return [...attributesFrozen, ...this.attributesCountyCovidCases]
        case CovidPolicies.path:
          return [...attributesFrozen, ...this.attributesCountyCovidPolicies]
        default:
          if (defaultSub) {
            if (defaultSub.path === CountyProfile.path) {
              return [...attributesFrozen, ...this.attributesCountyProfile]
            } else if (defaultSub.path === CovidPolicies.path) {
              return [
                ...attributesFrozen,
                ...this.attributesCountyCovidPolicies,
              ]
            }
          }
          return [...attributesFrozen, ...this.attributesCountyProfile]
      }
    },
    attributesFrozen() {
      let { params } = this.$route
      return [
        {
          ...fieldsStateUsCounty.county_name,
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

    attributesCountyProfile() {
      return [
        { ...fieldsStateUsCounty.fips },
        { ...fieldsStateUsCounty.state },
        { ...fieldsStateUsCounty.total_population },
        { ...fieldsStateUsCounty.median_earnings_2010 },
        { ...fieldsStateUsCounty.median_age },
        { ...fieldsStateUsCounty.total_county_judges },
        { ...fieldsStateUsCounty.total_hospital },
        { ...fieldsStateUsCounty.Total_Law_Enforcement },
        { ...fieldsStateUsCounty.Total_Cities },
        { ...fieldsStateUsCounty.Total_Prisons },
        { ...fieldsStateUsCounty.Total_Public_Schools },
        { ...fieldsStateUsCounty.Total_Private_Schools },
        { ...fieldsStateUsCounty.Total_Lawyers },
        { ...fieldsStateUsCounty.Total_Collegesand_Universities },
      ]
    },
    attributesCountyEducation() {
      return [
        { ...fieldsStateUsCounty.Less_Than_High_School_Diploma },
        { ...fieldsStateUsCounty.At_Least_High_School_Diploma },
        { ...fieldsStateUsCounty.At_Least_Bachelors_Degree },
        { ...fieldsStateUsCounty.Graduate_Degree },
        { ...fieldsStateUsCounty.School_Enrollment },
      ]
    },
    attributesCountyPopulation() {
      return [
        { ...fieldsStateUsCounty.White_Not_Latino },
        { ...fieldsStateUsCounty.African_American },
        { ...fieldsStateUsCounty.Native_American },
        { ...fieldsStateUsCounty.Asian_American },
        { ...fieldsStateUsCounty.Latino_American },
        { ...fieldsStateUsCounty.Other_Race_Or_Races },
      ]
    },
    attributesCountyDemographics() {
      return [
        { ...fieldsStateUsCounty.Children_Under_6_Living_In_Poverty },
        { ...fieldsStateUsCounty.Adults_65_And_Older_Living_In_Poverty },
        { ...fieldsStateUsCounty.Preschool_Enrollment_Ratio_At_Age_3_And_4 },
        { ...fieldsStateUsCounty.Poverty_Rate },
        {
          ...fieldsStateUsCounty.Child_Poverty_Living_In_Families_Below_The_Poverty_Line,
        },
      ]
    },
    attributesCountyOccupations() {
      return [
        { ...fieldsStateUsCounty.Management_Professional_AndRelated },
        { ...fieldsStateUsCounty.Service },
        { ...fieldsStateUsCounty.Sales_And_Office },
        { ...fieldsStateUsCounty.Farming_Fishing_And_Forest },
        { ...fieldsStateUsCounty.Construction_Extraction_And_Maintenance },
        { ...fieldsStateUsCounty.Production_Transportation_And_Materials },
      ]
    },
    attributesCountyHealth() {
      return [
        { ...fieldsStateUsCounty.Poor_Physical_Health_Days },
        { ...fieldsStateUsCounty.Poor_Mental_Heath_Dats },
        { ...fieldsStateUsCounty.Low_Birthweight },
        { ...fieldsStateUsCounty.Teen_Births },
        { ...fieldsStateUsCounty.Children_In_Single_Parent_Households },
        { ...fieldsStateUsCounty.Adult_Smoking },
        { ...fieldsStateUsCounty.Adult_Obesity },
        { ...fieldsStateUsCounty.Diabetes },
        { ...fieldsStateUsCounty.Sexually_Transmitted_Infections },
        { ...fieldsStateUsCounty.HIV_Prevalence_Rate },
      ]
    },
    attributesCountyOthers() {
      return [
        { ...fieldsStateUsCounty.Uninsured },
        { ...fieldsStateUsCounty.Unemployment },
        { ...fieldsStateUsCounty.Violent_Crime },
        { ...fieldsStateUsCounty.Homicide_Rate },
        { ...fieldsStateUsCounty.Injury_Deaths },
        { ...fieldsStateUsCounty.Infant_Mortality },
      ]
    },
    attributesCountyElectionResults() {
      return [
        { ...fieldsStateUsCounty.Republicans_2016 },
        { ...fieldsStateUsCounty.Democrats_2016 },
        { ...fieldsStateUsCounty.Republicans_2012 },
        { ...fieldsStateUsCounty.Democrats_2012 },
        { ...fieldsStateUsCounty.Republicans_2008 },
        { ...fieldsStateUsCounty.Democrats_2008 },
      ]
    },
    attributesCountyIrsAuditRate() {
      return [
        { ...fieldsStateUsCounty.Number_Of_Returns },
        { ...fieldsStateUsCounty.Estimated_Exams },
        { ...fieldsStateUsCounty.Audit_Rate },
      ]
    },
    attributesCountyCovidCases() {
      return [
        { ...fieldsStateUsCounty.Cases },
        { ...fieldsStateUsCounty.Deaths },
        { ...fieldsStateUsCounty.Fatality_Rate },
        { ...fieldsStateUsCounty.Confirmed_Cases },
        { ...fieldsStateUsCounty.Confirmed_Deaths },
        { ...fieldsStateUsCounty.Probable_Cases },
        { ...fieldsStateUsCounty.Probable_Deaths },
      ]
    },
    attributesCountyCovidPolicies() {
      return [
        { ...fieldsStateUsCounty.Event_Cancellations },
        { ...fieldsStateUsCounty.School_Closures },
        { ...fieldsStateUsCounty.Shelter_Enforcement },
        { ...fieldsStateUsCounty.Testing_Facilities },
        { ...fieldsStateUsCounty.Public_Transportation },
        { ...fieldsStateUsCounty.Workplace_Closures },
      ]
    },
  },
}
</script>

<style scoped></style>
