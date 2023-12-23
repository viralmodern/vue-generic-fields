<template>
  <TheTopBarOdt>
    <v-btn
      to="/odt/opinions"
      depressed
      class="caption text-transform-unset"
      small
      rounded
      text
    >
      <v-icon small left>mdi-home</v-icon>
      All Opinions
    </v-btn>
    <template v-if="labelLink">
      <v-icon small class="mx-2">mdi-chevron-double-right</v-icon>
      <router-link
        :title="labelLink"
        class="white--text caption text-no-wrap label_link text-decoration-none text-decoration-unset"
        :to="pathLink"
        v-html="labelLink"
      />
    </template>
    <div class="mx-2"></div>
    <v-spacer />
    <div
      style="width: 450px; transform: scale(0.6) translateX(20%);"
      id="search-recent-visit-opinions"
    >
      <SearchRecentHistory
        :search="q"
        activator-id-container="#search-recent-visit-opinions"
        :placeholder="`Search Opinions`"
        :recent-visit="recentVisit"
        @update-visit="updateVisit"
        @search-visit="search"
      />
    </div>
  </TheTopBarOdt>
</template>

<script>
import TopBarAuthODT from '~/features/odt/TopBarAuthODT'
import SearchRecentHistory from '~/features/odt/SearchRecentHistory'
import TheTopBarOdt from '~/features/odt/TheTopBarOdt'
export default {
  name: 'TopBarOpinionsODT',
  components: { TheTopBarOdt, SearchRecentHistory, TopBarAuthODT },
  props: {
    opinion: {},
  },
  data() {
    return {
      q: '',
    }
  },
  computed: {
    recentVisit() {
      return this.$store.getters['userSettings/configsRecentHistoryOpinions']
    },
    pathLink() {
      try {
        return `/odt/opinions/${this.opinion.pk}`
      } catch (e) {
        return '/odt/opinions/'
      }
    },
    labelLink() {
      try {
        let { matter_name } = this.opinion
        return `${matter_name}`
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
    updateVisit({ visitItems, deleted }) {
      // todo update store recent visit
      let items = [...visitItems]
      if (items.length > 10) {
        items.length = 10
      }
      let options = { RECENT_HISTORY_OPINIONS: [...items] }
      this.$store.dispatch('userSettings/updateSettingsOptionsUser', options)
    },
    search(e, { query }) {
      // if (!this.q) return
      const {
        params: { docket },
      } = this.$route
      this.$router.push({ path: `/odt/opinions/search`, query })
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
