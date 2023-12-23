<template>
  <div class="d-flex align-center">
    <router-link :to="rootPathTrackers" replace class="text-decoration-none">
      All Trackers
    </router-link>
    <template v-if="labelLink">
      <v-icon small class="mx-2">mdi-chevron-double-right</v-icon>
      <router-link
        replace
        :title="labelLink"
        class="text-decoration-none text-no-wrap label_link text-decoration-unset"
        :to="pathLink"
        v-html="labelLink"
      />
    </template>
    <div class="mx-2"></div>
    <BtnLinkInFormation
      v-if="docketNumber"
      :row="docket"
      disabled-bookmark-row
      icon
      end-point="/api/trackers/"
      :attributes="attributes"
      main-cell-id="name"
    />
    <Bookmark
      v-if="docketNumber"
      :end-point="`/api/dockets/${$route.params.tracker}/`"
      :bookmarked="bookmarkedRow"
      @bookmarked="onBookmarked"
    />
  </div>
</template>

<script>
import BtnLinkInFormation from '@/features/odt/BtnLinkInFormation.vue'
import Bookmark from '@/sat-vue-toolkit/components/Bookmark/Bookmark.vue'
import TheTopBarOdt from '~/features/odt/TheTopBarOdt.vue'
import {
  mutations,
  observableData,
} from '~/features/odt/store/trackerOdtDetail'
import { mxAttributesTrackers } from '~/features/odt/mixins/mxAttributesTrackersOdt'
import { Administrator } from '~/features/odt/helpers/odt.json'
export default {
  name: 'TopBarTrackerOdt',
  components: {
    TheTopBarOdt,
    Bookmark,
    BtnLinkInFormation,
  },
  props: {
    rootPathTrackers: {
      type: String,
      default: () => `${Administrator.trackers.path}`,
    },
  },
  mixins: [mxAttributesTrackers],
  data() {
    return {
      q: '',
    }
  },
  computed: {
    docket() {
      try {
        return observableData.data
      } catch (e) {
        return {}
      }
    },
    docketNumber() {
      try {
        return this.docket.name
      } catch (e) {
        return false
      }
    },
    labelLink() {
      try {
        let { name } = this.docket
        return `${name}`
      } catch (e) {
        return false
      }
    },
    pathLink() {
      let { rootPathTrackers } = this
      try {
        return `${rootPathTrackers}/${this.docket.pk}`
      } catch (e) {
        return rootPathTrackers
      }
    },
    bookmarkedRow() {
      try {
        return this.docket['bookmarked_pk']
      } catch (e) {
        return false
      }
    },
  },
  watch: {
    '$route.query.q': {
      immediate: true,
      handler(v) {
        this.q = v
      },
    },
  },
  methods: {
    onBookmarked({ bookmarked }) {
      mutations.updateDetail({
        ...this.docket,
        bookmarked_pk: bookmarked,
      })
    },
  },
}
</script>

<style scoped>
.label_link {
  max-width: 45%;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
</style>
