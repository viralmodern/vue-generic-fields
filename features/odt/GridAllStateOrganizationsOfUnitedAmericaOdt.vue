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
  name: 'GridAllStateOrganizationsOfUnitedAmericaOdt',
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
          name: 'state',
          type: ATTRIBUTE_FIELDS.ADDRESS.TYPE,
          sub_type: ATTRIBUTE_FIELDS.ADDRESS.SUBS_TYPE.STATE,
          width: 250,
        },
        {
          name: 'agency_name',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.TITLE,
        },
        {
          name: 'agency_description',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'websites',
          type: ATTRIBUTE_FIELDS.WEBSITE.TYPE,
        },
        {
          name: 'telephone',
          type: ATTRIBUTE_FIELDS.PHONE_NUMBER.TYPE,
        },
        {
          name: 'general_contact',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
