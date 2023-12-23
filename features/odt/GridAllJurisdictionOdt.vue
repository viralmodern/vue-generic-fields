<template>
  <div>
    <SlickGrid
      :include-params="includeParams"
      :end-point="endPoint"
      disabled-add-new-column
      disabled-add-new-row
      no-link-detail
      no-group
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
import { jurisdictionMixin } from '@/features/odt/mixins/mxJurisdictionOdt'
export default {
  name: 'GridAllJurisdictionOdt',
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
  mixins: [jurisdictionMixin],
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
