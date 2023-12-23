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
  name: 'GridAllVotesOfBillStateOfUnitedAmerica',
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
          ...fieldsStateBillsOdt.voter_name,
          width: 200,
        },
        {
          ...fieldsStateBillsOdt.option,
          groupBy: true,
          width: 130,
          list: [
            {
              value: 'Y',
              label: 'Yes',
            },
            {
              value: 'N',
              label: 'No',
            },
            {
              value: 'OT',
              label: 'Other',
            },
          ],
        },
        {
          ...fieldsStateBillsOdt.vote_source,
          width: 250,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
