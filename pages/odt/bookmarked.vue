<template>
  <v-container fluid py-0>
    <nuxt-child>
      <template v-slot:breadcrumbs="{ link }">
        <v-breadcrumbs class="px-0" :items="getBreadcrumbs(link)" />
      </template>
    </nuxt-child>
  </v-container>
</template>

<script>
import BaseTabLinksPageEntries from '@/features/odt/BaseTabLinksPageEntries.vue'
export default {
  components: { BaseTabLinksPageEntries },
  head() {
    return {
      title: 'ODT Bookmarks',
    }
  },
  middleware({ store, redirect, route }) {
    if (!store.getters['auth/isLoggedIn']) {
      let query = { redirect: route.fullPath }
      // redirect({ path: '/auth/login', query })
    }
  },
  computed: {
    linksBreadcrumbs() {
      let rootPath = `/odt/bookmarked`
      return [
        {
          text: 'Bookmarks',
          to: `${rootPath}`,
          exact: true,
          disabled: false,
          // exact: true,
        },
      ]
    },
  },
  methods: {
    getBreadcrumbs(link) {
      try {
        return [
          ...this.linksBreadcrumbs,
          { text: link.text, disabled: true, to: `/odt/bookmarked/${link.to}` },
        ]
      } catch (e) {
        return this.linksBreadcrumbs
      }
    },
  },
}
</script>

<style scoped></style>
