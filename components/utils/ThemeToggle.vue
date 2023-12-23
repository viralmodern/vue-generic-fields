<template>
  <v-icon :title="'Switch to ' + title" @click="toggleMode">{{ icon }}</v-icon>
</template>

<script>
import { getSESSION, SESSION, setSESSION } from '~/utils'

export default {
  name: 'ThemeToggle',
  computed: {
    title() {
      return this.$vuetify.theme.dark ? 'light mode' : 'dark mode'
    },
    icon() {
      return this.$vuetify.theme.dark ? 'mdi-brightness-4' : 'mdi-brightness-7'
    },
  },
  methods: {
    toggleMode() {
      let isDark = this.$vuetify.theme.dark
      this.$vuetify.theme.dark = !isDark
      setSESSION(SESSION.DARK_THEME, !isDark)
      document.body.setAttribute('data-theme-dark', !isDark)
    },
  },
  created() {
    let isDark = getSESSION(SESSION.DARK_THEME) === true
    this.$vuetify.theme.dark = isDark
    document.body.setAttribute('data-theme-dark', isDark)
  },
}
</script>
