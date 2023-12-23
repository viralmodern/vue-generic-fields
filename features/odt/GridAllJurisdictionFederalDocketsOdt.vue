<template>
  <div>
    <SlickGrid
      :include-params="includeParams"
      no-group
      :end-point="endPoint"
      disabled-add-new-column
      disabled-add-new-row
      no-link-detail
      :height="height"
      :owner-pk="ownerPk"
      count-label-singular="Jurisdiction"
      count-label-many="Jurisdictions"
      :attributes="attributesJurisdictions"
    />
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import { jurisdictionFederalDocketsMixin } from '@/features/odt/mixins/mxJurisdictionOdt'
export default {
  name: 'GridAllJurisdictionFederalDocketsOdt',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${90.2}vh`,
    },
    includeParams: {
      type: Object,
      default: () => ({}),
    },
  },
  mixins: [jurisdictionFederalDocketsMixin],
  computed: {
    ownerPk() {
      try {
        return this.$store.getters['auth/user']['pk']
      } catch (e) {
        return ''
      }
    },
    endPoint() {
      return `/api/jurisdictions/`
    },
  },
}
</script>

<style scoped></style>
