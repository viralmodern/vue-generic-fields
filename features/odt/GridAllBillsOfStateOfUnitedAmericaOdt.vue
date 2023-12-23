<template>
  <div>
    <SlickGrid
      no-query-params
      :height="height"
      :attributes="attributes"
      disabled-add-new-column
      disabled-add-new-row
    />
  </div>
</template>

<script>
import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
import SlickGrid from '~/sat-vue-toolkit/components/slick-grid/SlickGrid'
import { fieldsStateBillsOdt } from '~/features/odt/mixins/mxBillEntryOfStateOdt'

export default {
  name: 'GridAllBillsOfStateOfUnitedAmericaOdt',
  components: { SlickGrid },
  props: {
    height: {
      default: () => `${80}vh`,
    },
  },
  computed: {
    rootPath() {
      let {
        $route: { params },
      } = this
      return {
        name: 'odt-united-states-of-america-state-bills-bill',
        params,
      }
    },
    attributes() {
      let { rootPath } = this
      return [
        {
          ...fieldsStateBillsOdt.identifer,
          width: 200,
          pathLink: function () {
            let bill = this.pk
            let rt = {
              ...rootPath,
              params: {
                ...rootPath.params,
                bill,
              },
            }
            return rt
          },
        },
        {
          ...fieldsStateBillsOdt.title,
        },
        {
          ...fieldsStateBillsOdt.classification,
          groupBy: true,
        },
        {
          ...fieldsStateBillsOdt.session_identifier,
        },
        {
          ...fieldsStateBillsOdt.jurisdiction,
        },
        {
          ...fieldsStateBillsOdt.organization_classification,
        },
        {
          ...fieldsStateBillsOdt.abstract,
        },
        {
          ...fieldsStateBillsOdt.introduced_date,
        },
        {
          ...fieldsStateBillsOdt.total_sponsors,
        },
        {
          ...fieldsStateBillsOdt.total_actions,
        },
        {
          ...fieldsStateBillsOdt.total_votes,
        },
        {
          ...fieldsStateBillsOdt.bill_source,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
