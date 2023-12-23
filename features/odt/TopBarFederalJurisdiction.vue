<template>
  <TheTopBarOdt app>
    <v-btn replace v-bind="linkOption" :to="jurisdictionOption.path">
      <v-icon left>
        {{ jurisdictionOption.icon }}
      </v-icon>
      {{ jurisdictionOption.title }}
    </v-btn>
    <template v-if="jurisdictionDetail">
      <v-icon small class="mx-2">mdi-chevron-double-right</v-icon>
      <router-link
        replace
        :title="jurisdictionDetailOption.full_name"
        class="white--text caption text-decoration-none text-no-wrap label_link text-decoration-unset"
        :to="`${jurisdictionOption.path}/${jurisdictionDetailOption.id}`"
        v-html="jurisdictionDetailOption.short_name"
      />
      <BtnLinkInFormation
        icon
        disabled-bookmark-row
        main-cell-id="full_name"
        :row="jurisdictionDetail"
        :attributes="attributesJurisdictions"
      />
      <Bookmark
        :end-point="jurisdictionDetailOption.endPoint_bookmark"
        :bookmarked="jurisdictionDetailOption.bookmarked_pk"
      />
    </template>
    <v-spacer />
  </TheTopBarOdt>
</template>

<script>
import TheTopBarOdt from '~/features/odt/TheTopBarOdt.vue'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import BtnLinkInFormation from '~/features/odt/BtnLinkInFormation.vue'
import Bookmark from '@/sat-vue-toolkit/components/Bookmark/Bookmark.vue'
import { jurisdictionMixin } from '~/features/odt/mixins/mxJurisdictionOdt'

export default {
  name: 'TopBarFederalJurisdiction',
  components: { BtnLinkInFormation, TheTopBarOdt, Bookmark },
  mixins: [jurisdictionMixin],
  computed: {
    linkOption() {
      return {
        small: true,
        rounded: false,
        depressed: true,
        class: 'caption text-capitalize',
      }
    },

    jurisdictionOption() {
      return ROUTES.LitigationResearch.FederalDockets
    },
    jurisdictionDetail() {
      return this.$store.getters['odtJurisdiction/detail']
    },
    jurisdictionDetailOption() {
      let { jurisdictionDetail } = this
      let short_name =
        (jurisdictionDetail && jurisdictionDetail.short_name) || false
      let full_name =
        (jurisdictionDetail && jurisdictionDetail.full_name) || false
      let id = (jurisdictionDetail && jurisdictionDetail.pk) || false
      let bookmarked_pk =
        jurisdictionDetail && Boolean(jurisdictionDetail.bookmarked_pk)
      let endPoint_bookmark =
        jurisdictionDetail && `/api/jurisdictions/${jurisdictionDetail['pk']}`
      return {
        short_name,
        full_name,
        id,
        bookmarked_pk,
        endPoint_bookmark,
      }
    },
  },
}
</script>

<style scoped></style>
