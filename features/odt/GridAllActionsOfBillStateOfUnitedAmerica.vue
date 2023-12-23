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
  name: 'GridAllActionsOfBillStateOfUnitedAmerica',
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
          ...fieldsStateBillsOdt.entry_number,
          width: 200,
        },
        {
          ...fieldsStateBillsOdt.entry_date,
        },
        {
          ...fieldsStateBillsOdt.entry_description,
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
