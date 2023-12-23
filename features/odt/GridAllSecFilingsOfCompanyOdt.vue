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
import { fieldsPublicCompanySecFilings } from '~/features/odt/mixins/mxPublicCompanySecFilings'
import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
export default {
  name: 'GridAllSecFilingsOfCompanyOdt',
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
      let { attributesFrozen } = this
      return [...attributesFrozen]
    },
    attributesFrozen() {
      let { params } = this.$route
      return [
        {
          ...fieldsPublicCompanySecFilings.filings,
          width: 200,
          pathLink: function () {
            let pk = `${this.pk}`
            return {
              name: `odt-united-states-of-america-state-public-companies-company-sec-filings-filing`,
              params: {
                ...params,
                filing: pk,
              },
            }
          },
        },
        {
          ...fieldsPublicCompanySecFilings.document,
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
        },
        {
          ...fieldsPublicCompanySecFilings.description,
        },
        {
          ...fieldsPublicCompanySecFilings.filing_date,
        },
        {
          ...fieldsPublicCompanySecFilings.file_number,
        },
        {
          ...fieldsPublicCompanySecFilings.type,
        },
        {
          ...fieldsPublicCompanySecFilings.period_of_report,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
