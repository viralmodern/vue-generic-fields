<template>
  <div>
    <SlickGrid
      no-group
      no-link-detail
      disabled-bookmark-row
      disabled-add-new-column
      disabled-owner-row
      :attributes="attributes"
      no-query-params
      count-label-singular="Field"
      count-label-many="Fields"
      :height="height"
    />
  </div>
</template>

<script>
import { fieldsGeneric } from './fieldsGeneric'
import SlickGrid from '~/sat-vue-toolkit/components/slick-grid/SlickGrid'

export default {
  name: 'GridFieldsGeneric',
  components: { SlickGrid },
  props: {
    subId: {},
    height: {
      type: String,
      default: () => `${80}vh`,
    },
  },
  computed: {
    attributes() {
      return [
        {
          ...fieldsGeneric.field_name,
        },
        {
          ...fieldsGeneric.field_format,
        },
        {
          ...fieldsGeneric.field_definition,
        },
        {
          ...fieldsGeneric.tooltip_display,
        },
        {
          ...fieldsGeneric.created_by,
        },
        {
          ...fieldsGeneric.field_show_hide,
        },
        {
          ...fieldsGeneric.set_pinned,
        },
        {
          ...fieldsGeneric.highlight_color,
        },
        {
          ...fieldsGeneric.field_action,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
