<template>
  <v-app :dark="$vuetify.theme.dark">
    <v-app-bar
      app
      :color="$vuetify.theme.dark ? `` : `white`"
      fade-img-on-scroll
      hide-on-scroll
      flat
      height="48px"
    >
      <router-link to="/" class="text-decoration-none d-flex align-center">
        <v-avatar size="25">
          <img src="~/assets/img/logo_thumb.png" alt="" />
        </v-avatar>
        <div class="mx-1"></div>
        <v-toolbar-title class="subtitle-1">SatLegal</v-toolbar-title>
      </router-link>
      <v-spacer />
      <ThemeToggle />
      <template v-for="(link, index) in links">
        <btn-link
          :key="index"
          class="ml-2"
          :btn-options="link.options"
          :label="link.label"
        />
      </template>
      <div class="ml-2"></div>
      <btn-link
        @click="loginPage"
        label="Sign In"
        :input-value="true"
        :btn-options="{ color: 'primary' }"
        icon="mdi-login"
      />
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <PortalAttributeActions />
  </v-app>
</template>

<script>
import ThemeToggle from '@/components/utils/ThemeToggle.vue'
import PortalAttributeActions from '~/sat-vue-toolkit/components/slick-grid/PortalAttributeActions.vue'
import BtnLink from '~/sat-vue-toolkit/components/BtnLink.vue'

export default {
  components: {
    BtnLink,
    PortalAttributeActions,
    ThemeToggle,
  },

  methods: {
    loginPage() {
      this.$router.push('/auth/login')
    },
  },
  async mounted() {
    this.$store.dispatch('appConfigs/loadAppConfigs')
    this.$store.dispatch('appConfigs/loadCourts')
    if (this.$store.getters['auth/isLoggedIn']) {
      this.$store.dispatch('auth/getUser')
      await this.$store.dispatch('userSettings/resetSettingsOptionsUser')
    }
  },
  data() {
    return {
      links: [
        {
          label: 'Opinions',
          options: { to: '/odt/opinions' },
        },
        {
          label: 'Dockets',
          options: { to: '/odt/dockets' },
        },
        /*{
          label: 'Regulation',
          options: { to: '/odt/regulation' },
        },
        {
          label: 'United States Code',
          options: { to: '/odt/united-states-code' },
        },*/
      ],
    }
  },
}
</script>
<style lang="scss" scoped></style>
