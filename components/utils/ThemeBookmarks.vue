<template>
  <div title="Bookmarks">
    <v-badge overlap :value="value" color="green" dot>
      <v-icon> mdi-bookmark </v-icon>
    </v-badge>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
let intv = null
export default {
  name: 'ThemeBookmarks',
  data() {
    return {
      value: null,
    }
  },
  events: {
    $bookmarkEntity(evt, { response, url, unBookmark = false }) {
      let isPublicTracker = url.includes('public-trackers')
      if (isPublicTracker) {
        this.$store.dispatch('publicTrackersOdt/resetPublicTrackers', {
          unBookmark,
          url,
          row: response,
        })
      }
      this.doBookmark()
    },
  },
  methods: {
    doBookmark: debounce(function (v) {
      clearTimeout(intv)
      let _self = this
      this.value = true
      this.$nextTick(() => {
        intv = setTimeout(function () {
          _self.value = false
        }, 4000)
      })
    }, 800),
  },
}
</script>

<style scoped></style>
