<template>
  <div>
    <SlickGrid
      count-label-singular="tracker"
      count-label-many="trackers"
      :has-vote-row="false"
      :has-report-row="false"
      disabled-bookmark-row
      :end-point="`/api/trackers/`"
      :owner-pk="ownerPk"
      :height="height"
      :show-quick-add-row="false"
      :attributes="attributes"
      main-cell-id="name"
      :path-link-row-detail="rootPathTrackers"
      disabled-add-new-column
      enabled-order-row
    >
      <template v-slot:right-header> </template>
    </SlickGrid>
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'

import { TYPE_ODT_SEARCH } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import { $$getCourtByUrlId } from '@/mock/AllCourts'
import { $$arrToString } from '@/sat-vue-toolkit/functions'
import BtnLink from '@/sat-vue-toolkit/components/BtnLink.vue'
import { mxAttributesTrackers } from '~/features/odt/mixins/mxAttributesTrackersOdt'
import { Administrator } from '~/features/odt/helpers/odt.json'
export default {
  name: 'GridAllTrackersOdt',
  components: { BtnLink, SlickGrid },
  filters: {
    $$arrToString,
    $$getCourtByUrlId,
  },
  props: {
    rootPathTrackers: {
      type: String,
      default: () => Administrator.trackers.path,
    },
    type: {
      default: () => TYPE_ODT_SEARCH.RECAP,
    },

    height: {
      default: () => `${80}vh`,
    },
  },
  mixins: [mxAttributesTrackers],
  computed: {
    ownerPk() {
      try {
        return this.$store.getters['auth/user']['pk']
      } catch (e) {
        return ''
      }
    },
  },
  methods: {},
}
</script>

<style scoped></style>
