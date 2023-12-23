<template>
  <v-list class="thumbnail-public-tracker" v-if="isLoggedIn">
    <v-subheader>
      Docket Trackers
      <v-btn icon :loading="loading" :disabled="loading" @click="fetchList">
        <v-icon small>mdi-sync</v-icon>
      </v-btn>
    </v-subheader>
    <v-list-item
      v-for="tracker in list"
      :key="tracker.pk"
      active-class="primary--text"
      :to="`/odt/t/${tracker.pk}/dockets`"
    >
      <v-list-item-icon class="mr-2">
        <v-icon small v-text="'#'"></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title
          class="text-capitalize"
          v-text="tracker.name"
        ></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-spacer />
      <v-list-item-action>
        <PaginationGrid
          :loading="loading"
          :options="$store.getters['publicTrackersOdt/options']"
          @change="loadMore"
        />
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import PaginationGrid from '@/sat-vue-toolkit/components/slick-grid/attributes/PaginationGrid.vue'
export default {
  name: 'PublicTrackersThumbnail',
  components: { PaginationGrid },
  data() {
    return {}
  },
  mounted() {
    this.fetchList()
  },
  computed: {
    loading() {
      try {
        return this.$store.getters['publicTrackersOdt/loading']
      } catch (e) {
        return false
      }
    },
    list() {
      try {
        return this.$store.getters['publicTrackersOdt/listBookmarked']
      } catch (e) {
        return []
      }
    },

    query() {
      try {
        return this.$route.query
      } catch (e) {
        return {}
      }
    },
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn']
    },
  },
  methods: {
    async fetchList(options = {}) {
      if (this.isLoggedIn) {
        await this.$store.dispatch(
          'publicTrackersOdt/resetPublicTrackers',
          options
        )
      }
    },
    async loadMore({ queryParams }) {
      await this.fetchList({ queryParams })
    },
  },
}
</script>

<style scoped lang="scss">
.thumbnail-public-tracker {
}
</style>
