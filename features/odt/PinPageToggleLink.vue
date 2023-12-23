<template>
  <v-btn
    :loading="$store.getters['userSettings/loading']"
    @click="pinPage"
    :title="titlePin"
    fab
    style="z-index: 5; transform: translateX(15px) scale(0.7)"
    x-small
    fixed
    right
    top
    class="pinned-layout-link"
  >
    <v-icon small :color="colorPin">{{ iconPin }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'PinPageToggleLink',
  computed: {
    isPinned() {
      try {
        return this.$store.getters['userSettings/isPinned'](
          this.$route.fullPath
        )
      } catch (e) {
        return false
      }
    },
    titlePin() {
      if (this.isPinned) return `Page Pinned`
      return 'Pin this page'
    },
    iconPin() {
      if (this.isPinned) return `mdi-pin`
      return 'mdi-pin-off'
    },
    colorPin() {
      if (this.isPinned) return `warning`
      return ''
    },
  },
  methods: {
    pinPage() {
      try {
        let title = document.title.split('|')[0]
        let path = this.$route.path
        let fullPath = this.$route.fullPath
        let name = this.$route.name
        let page = { title, path, fullPath, name },
          deleted = this.isPinned,
          reset = false
        this.$store.dispatch('userSettings/updatePinned', { page, deleted })
      } catch (e) {
      } finally {
      }
    },
  },
}
</script>

<style scoped></style>
