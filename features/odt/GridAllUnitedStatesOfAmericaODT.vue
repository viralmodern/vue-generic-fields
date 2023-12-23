<template>
  <div>
    <SlickGrid
      no-query-params
      :attributes="reduceAttributes"
      disabled-add-new-column
      disabled-add-new-row
      :height="height"
    />
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import { fieldsUnitedStatesOfAmericaOdt } from '~/features/odt/mixins/mxUnitedStatesOfAmerica'
import { ROUTES } from '~/features/odt/helpers/odt.json'
let { LitigationResearch } = ROUTES
export default {
  name: 'GridAllUnitedStatesOfAmericaODT',
  components: { SlickGrid },
  props: {
    height: {
      default: () => `${80}vh`,
    },
    includeParams: {
      type: Object,
      default: () => ({}),
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    reduceAttributes() {
      let {} = this
      return [
        {
          ...fieldsUnitedStatesOfAmericaOdt.state,
          width: 250,
          pathLink: function () {
            return `${LitigationResearch.UnitedStatesOfAmerica.path}/${this.pk}`
          },
        },
        fieldsUnitedStatesOfAmericaOdt.ap_abbr,
        fieldsUnitedStatesOfAmericaOdt.capital,
        fieldsUnitedStatesOfAmericaOdt.total_county,
        fieldsUnitedStatesOfAmericaOdt.total_public_companies,
        fieldsUnitedStatesOfAmericaOdt.total_legislators,
        fieldsUnitedStatesOfAmericaOdt.total_county_judges,
        fieldsUnitedStatesOfAmericaOdt.total_hospital,
        fieldsUnitedStatesOfAmericaOdt.total_law_enforcement,
        fieldsUnitedStatesOfAmericaOdt.total_cities,
        fieldsUnitedStatesOfAmericaOdt.total_prisons,
        fieldsUnitedStatesOfAmericaOdt.total_law_firms,
        fieldsUnitedStatesOfAmericaOdt.total_public_schools,
        fieldsUnitedStatesOfAmericaOdt.total_private_schools,
        fieldsUnitedStatesOfAmericaOdt.total_lawyers,
        fieldsUnitedStatesOfAmericaOdt.total_colleges_and_universities,
        fieldsUnitedStatesOfAmericaOdt.total_state_organizations,
      ]
    },
  },
}
</script>

<style scoped></style>
