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
import {
  fieldsStateLegislatorsOdt,
  stateLegislatorsMixin,
} from '~/features/odt/mixins/mxStateLegislatorsOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import SlickGrid from '~/sat-vue-toolkit/components/slick-grid/SlickGrid'
let { LegislatorProfile, ContactInformation } = ROUTES.StateLegislators

export default {
  name: 'GridAllStateLegislatorsOdt',
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
  mixins: [stateLegislatorsMixin],
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
      let fieldsSubFirst = [
        fieldsStateLegislatorsOdt.current_party,
        fieldsStateLegislatorsOdt.current_district,
        fieldsStateLegislatorsOdt.current_chamber,
        fieldsStateLegislatorsOdt.given_name,
        fieldsStateLegislatorsOdt.family_name,
        fieldsStateLegislatorsOdt.gender,
        fieldsStateLegislatorsOdt.email,
        fieldsStateLegislatorsOdt.biography,
        fieldsStateLegislatorsOdt.birth_date,
        fieldsStateLegislatorsOdt.death_date,
      ]
      let fieldsSubSecond = [
        fieldsStateLegislatorsOdt.image,
        fieldsStateLegislatorsOdt.links,
        fieldsStateLegislatorsOdt.sources,
        fieldsStateLegislatorsOdt.capitol_address,
        fieldsStateLegislatorsOdt.capitol_voice,
        fieldsStateLegislatorsOdt.capitol_fax,
        fieldsStateLegislatorsOdt.district_address,
        fieldsStateLegislatorsOdt.district_voice,
        fieldsStateLegislatorsOdt.district_fax,
        fieldsStateLegislatorsOdt.twitter,
        fieldsStateLegislatorsOdt.youtube,
        fieldsStateLegislatorsOdt.instagram,
        fieldsStateLegislatorsOdt.facebook,
      ]
      let fieldsSubFrozen = [fieldsStateLegislatorsOdt.name]
      if (currentLawyers === LegislatorProfile.path) {
        fieldsCompare = [...fieldsSubFirst]
      } else if (currentLawyers === ContactInformation.path) {
        fieldsCompare = [...fieldsSubSecond]
      } else {
        if (isIncludesSubs) {
          fieldsCompare = [...fieldsSubFirst]
        } else {
          fieldsCompare = [...fieldsSubFirst]
        }
      }
      if (fieldsCompare.length) {
        let fs = [...fieldsSubFrozen, ...fieldsCompare]
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
