<template>
  <v-app :dark="$vuetify.theme.dark">
    <ResizableSidebar>
      <template v-slot:mini>
        <v-list dense nav>
          <v-list-item to="/dashboard">
            <v-list-item-action icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <MenuAccountUser />
        <v-list dense nav>
          <v-list-item to="/matters" title="All Matters">
            <v-list-item-action icon>
              <v-icon>mdi-apps</v-icon>
            </v-list-item-action>
            <v-list-item-content></v-list-item-content>
          </v-list-item>
          <v-list-item to="/bookmarks">
            <ThemeBookmarks />
          </v-list-item>
          <v-list-item class="cursor--pointer">
            <v-list-item-action icon>
              <ThemeToggle />
            </v-list-item-action>
            <v-list-item-content></v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
      <template v-slot:side-bar>
        <SideBarBase></SideBarBase>
      </template>
    </ResizableSidebar>
    <nuxt />

    <MenuDatePicker />
    <MenuTimePicker />
    <PortalAttributeActions v-once />
  </v-app>
</template>

<script>
import SideBarBase from '../components/side_bar/SideBarBase'
import MenuDatePicker from '../components/utils/MenuDatePicker'
import MenuTimePicker from '../components/utils/MenuTimePicker'
import MenuAccountUser from '../components/utils/MenuAccountUser'
import ResizableSidebar from '../components/utils/ResizableSidebar'
import PortalAttributeActions from '../sat-vue-toolkit/components/slick-grid/PortalAttributeActions'
import ThemeToggle from '~/components/utils/ThemeToggle'
import ThemeBookmarks from '~/components/utils/ThemeBookmarks'

export default {
  components: {
    ThemeBookmarks,
    ThemeToggle,
    PortalAttributeActions,
    ResizableSidebar,
    MenuAccountUser,
    MenuTimePicker,
    MenuDatePicker,
    SideBarBase,
  },
  middleware({ store, redirect, route }) {
    if (!store.getters['auth/isLoggedIn']) {
      let query = { redirect: route.fullPath }
      // redirect({ path: '/auth/login', query })
    }
  },
  data() {
    return {
      clipped: false,
      title: '',
    }
  },
  async mounted() {
    this.$store.dispatch('appConfigs/loadAppConfigs')
    this.$store.dispatch('auth/getUser')
    this.$store.dispatch('workspace/loadLabels')
    this.$store.dispatch('workspace/loadMembers')
  },
}
</script>

<style lang="scss">
.link_head {
  text-decoration: none;
}

button,
.v-btn {
  &:active,
  &:focus {
    outline: none !important;
  }
}
</style>
<style>
.v-small-dialog__content {
  max-height: 55vh;
  padding: 0px;
}
</style>
