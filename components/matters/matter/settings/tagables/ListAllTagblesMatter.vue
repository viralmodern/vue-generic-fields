<template>
  <div>
    <SlickGrid
      disabled-sort
      no-print
      no-export
      no-customize-field
      :has-report-row="false"
      no-link-detail
      disabled-add-new-column
      :has-vote-row="false"
      :end-point="`/api/matters/${$$matterId}/tagables/`"
      :owner-pk="ownerPk"
      :height="`${65}vh`"
      bus-event-name="bus-tagables-matter"
      :attributes="attributes"
      main-cell-id="name"
    />
    <!--    :exclude-params="['ungroup']"-->
  </div>
</template>

<script>
import { ATTRIBUTE_FIELDS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import mx_matterId from '~/mixins/mx_matterId'
import { getChoicesConfigByName } from '~/mock/appConfigs'
export default {
  name: 'ListAllTagblesMatter',
  components: { SlickGrid },
  mixins: [mx_matterId],
  computed: {
    ownerPk() {
      try {
        return this.$store.getters['auth/user']['pk']
      } catch (e) {
        return ''
      }
    },
    tagAblesTypes() {
      return getChoicesConfigByName('MatterLabelAndTag.Type')
    },
    attributes() {
      return [
        {
          label: 'Name',
          name: 'name',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 150,
          list: [],
          groupBy: false,
          required: true,
        }, // N/A
        {
          label: 'Color',
          name: 'color',
          type: ATTRIBUTE_FIELDS.COLOR.TYPE,
          width: 150,
          list: [],
          groupBy: false,
          required: true,
          // hide: true
        }, // N/A
        {
          name: 'type',
          type: ATTRIBUTE_FIELDS.LIST.TYPE,
          width: 150,
          list: this.tagAblesTypes,
          groupBy: true,
          required: true,
          // hide: true
        }, // N/A
      ]
    },
  },
}
</script>

<style scoped></style>
