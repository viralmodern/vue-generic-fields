<template>
  <div>
    <v-list>
      <template v-for="(pin, index) in pinned">
        <v-list-item
          :key="`${index}-${pin.fullPath}`"
          active-class="primary--text"
          exact
          :to="pin.fullPath"
        >
          <v-list-item-content
            class="caption"
            v-html="pin.title"
          ></v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'PinMenuListPinned',
  computed: {
    pinned() {
      try {
        return this.$store.getters['userSettings/pinnedServe']
      } catch (e) {
        console.log('pinnedRoute', e.message)
        return []
      }
    },
  },
}
</script>

<style scoped></style>
