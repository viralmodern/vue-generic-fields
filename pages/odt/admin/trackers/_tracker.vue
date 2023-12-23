<template>
  <v-card :loading="loading" flat tile>
    <TopBarTrackerOdt />
    <div class="mb-3"></div>
    <GridAllLinksOfTrackerOdt
      :end-point="endPoint"
      :detail="detail"
      height="76vh"
    />
  </v-card>
</template>

<script>
import GridAllLinksOfTrackerOdt from '~/features/odt/GridAllLinksOfTrackerOdt'
import TopBarTrackerOdt from '~/features/odt/TopBarTrackerOdt'
import {
  mutations,
  actions,
  observableData,
} from '~/features/odt/store/trackerOdtDetail'
export default {
  components: { TopBarTrackerOdt, GridAllLinksOfTrackerOdt },
  head() {
    return {
      title: this.trackerTitle,
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  mounted() {
    this.fetchDetailTracker()
  },
  computed: {
    detail() {
      try {
        return observableData.data || {}
      } catch (e) {
        return {}
      }
    },
    trackerTitle() {
      try {
        return `Trackers - ${this.detail.name}`
      } catch (e) {
        return ''
      }
    },
    endPoint() {
      let {
        params: { tracker },
      } = this.$route
      return `/api/trackers/${tracker}/links/`
    },
  },
  methods: {
    async fetchDetailTracker() {
      try {
        let {
          params: { tracker },
        } = this.$route
        this.loading = true
        await actions.fetchObserverDetail(tracker, this.$api)
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
  destroyed() {
    mutations.updateDetail(null)
  },
}
</script>

<style scoped lang="scss"></style>
