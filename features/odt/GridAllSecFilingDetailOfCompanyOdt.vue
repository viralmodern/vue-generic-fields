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
  name: 'GridAllSecFilingDetailOfCompanyOdt',
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
          ...fieldsPublicCompanySecFilings.seq,
          width: 200,
        },
        {
          ...fieldsPublicCompanySecFilings.document,
          type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
          pathLink: function () {
            let pk = `${this.pk}`
            let newParams = {
              entry: pk,
            }
            let rootEntry = `odt-united-states-of-america-state-public-companies-company-sec-filings-filing-entry`
            return {
              name: rootEntry,
              params: {
                ...params,
                ...newParams,
              },
            }
          },
        },
        {
          ...fieldsPublicCompanySecFilings.description,
        },
        {
          ...fieldsPublicCompanySecFilings.type,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
