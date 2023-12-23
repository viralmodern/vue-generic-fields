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
  fieldsLawFirms,
  lawFirmsMixin,
} from '~/features/odt/mixins/lawFirmsOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import SlickGrid from '~/sat-vue-toolkit/components/slick-grid/SlickGrid'
let { CompanyRevenue, CompanyProfile } = ROUTES.LawFirms
export default {
  name: 'GridAllLawFirmsOdt',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${77}vh`,
    },
  },
  mixins: [lawFirmsMixin],
  computed: {
    currentLawyers() {
      let { query } = this.$route
      let _by = query['by']
      return _by
    },
    reduceAttributes() {
      let { currentLawyers, attributes } = this
      let fieldsCompare = []
      if (currentLawyers === CompanyRevenue.path) {
        fieldsCompare = [
          fieldsLawFirms.employees,
          fieldsLawFirms.revenue,
          fieldsLawFirms.revenue_per_employee,
        ]
      } else {
        fieldsCompare = [
          fieldsLawFirms.website,
          fieldsLawFirms.address_line_1,
          fieldsLawFirms.address_line_2,
          fieldsLawFirms.city,
          fieldsLawFirms.state,
          fieldsLawFirms.phone,
          fieldsLawFirms.fax,
        ]
      }
      if (fieldsCompare.length) {
        let fs = [fieldsLawFirms.company_name, ...fieldsCompare]
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
