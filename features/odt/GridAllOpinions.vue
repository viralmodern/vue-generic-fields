<template>
  <div>
    <SlickGrid
      count-label-singular="Opinion"
      count-label-many="Opinions"
      :has-vote-row="false"
      :has-report-row="false"
      :end-point="endPoint"
      :owner-pk="ownerPk"
      :height="height"
      :items="dataGroup"
      disabled-add-new-column
      unique-id="pk"
      main-cell-id="matter_name"
      :show-quick-add-row="false"
      :show-button-quick-add-modal="false"
      :ui-show-add-row-modal="false"
      bus-event-name="bus-opinion-entries"
      :attributes="attributesOpinions"
      :path-link-row-detail="`/odt/opinions`"
      disabled-sort
      no-link-detail
      :items-per-page="2000000"
    >
      <template v-slot:item.citations="{ item }">
        {{ item.citations | $$arrToString }}
      </template>
    </SlickGrid>
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid'
import { opinionsList } from '~/mock/AllCourts'
import { $$arrToString } from '@/sat-vue-toolkit/functions'
import { mxOpinions } from '~/features/odt/mixins/attributesOpinions'
export default {
  name: 'GridAllOpinions',
  components: { SlickGrid },
  filters: {
    $$arrToString,
  },
  data() {
    return {
      // endPoint: 'https://www.courtlistener.com/api/rest/v3/search',
      endPoint: '/api/opinions/',
    }
  },
  mixins: [mxOpinions],
  async created() {},
  props: {
    dataGroup: {
      default: () => ({ '': opinionsList }),
    },
    height: {
      default: () => `${80}vh`,
    },
  },
  computed: {
    ownerPk() {
      try {
        return this.$store.getters['auth/user']['pk']
      } catch (e) {
        return ''
      }
    },
    matterId() {
      return this.$route.params.matter
    },
  },
  methods: {},
}
</script>

<style scoped></style>
<!-- await this.$api.CancelToken(() => {})-->
