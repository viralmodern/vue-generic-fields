<template>
  <div>
    <SlickGrid
      no-query-params
      disabled-add-new-row
      disabled-add-new-column
      :attributes="attributes"
      :height="height"
    />
  </div>
</template>

<script>
import { fieldsStateBillsOdt } from '~/features/odt/mixins/mxBillEntryOfStateOdt'
import SlickGrid from '~/sat-vue-toolkit/components/slick-grid/SlickGrid'

export default {
  name: 'GridAllSponsorsOfBillStateOfUnitedAmerica',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${72}vh`,
    },
  },
  computed: {
    attributes() {
      return [
        {
          ...fieldsStateBillsOdt.sponsor_name,
          width: 200,
        },
        {
          ...fieldsStateBillsOdt.sponsor_type,
        },
        {
          ...fieldsStateBillsOdt.primary,
        },
        {
          ...fieldsStateBillsOdt.classification,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
