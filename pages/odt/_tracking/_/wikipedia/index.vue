<template>
  <v-card :loading="loadingTracker" flat>
    <template v-if="publicTrackerDetail">
      <iframe
        :src="publicTrackerDetail.wikipedia_url"
        class="iframe-wikipedia"
        frameborder="0"
      ></iframe>
    </template>
  </v-card>
</template>

<script>
export default {
  computed: {
    publicTrackerDetail() {
      try {
        return this.$store.getters['publicTrackersOdt/trackerDetail']
      } catch (e) {
        return false
      }
    },
    loadingTracker() {
      return this.$store.getters['publicTrackersOdt/loading']
    },
  },
}
</script>
<style scoped>
.iframe-wikipedia {
  display: block;
  width: 100%;
  height: 85vh;
}
</style>
