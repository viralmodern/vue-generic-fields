<template>
  <div>
    <SlickGrid
      no-query-params
      disabled-add-new-column
      disabled-add-new-row
      :attributes="attributes"
      :height="height"
    />
  </div>
</template>

<script>
import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
import SlickGrid from '~/sat-vue-toolkit/components/slick-grid/SlickGrid'

export default {
  name: 'GridAllGovernmentWebsiteOfUnitedAmericaOdt',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${80}vh`,
    },
  },
  computed: {
    attributes() {
      return [
        {
          name: 'domain_name',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
        },
        {
          name: 'domain_type',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          groupBy: true,
        },
        {
          name: 'agency',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          groupBy: true,
        },
        {
          name: 'organization',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'state',
          type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
          sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.STATE,
        },
        {
          name: 'security_contact_email',
          type: ATTRIBUTE_FIELDS.EMAIL.TYPE,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
