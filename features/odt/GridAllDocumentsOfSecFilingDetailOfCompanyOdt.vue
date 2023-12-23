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
  name: 'GridAllDocumentsOfSecFilingDetailOfCompanyOdt',
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
          ...fieldsPublicCompanySecFilings.document,
          type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
          width: 200,
        },
        {
          ...fieldsPublicCompanySecFilings.size,
        },
        {
          ...fieldsPublicCompanySecFilings.last_modified,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
