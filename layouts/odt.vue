<template>
  <v-app :dark="$vuetify.theme.dark">
    <ResizableSidebar>
      <template v-slot:mini>
        <v-list dense nav>
          <v-list-item to="/" replace>
            <v-list-item-action icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <MenuAccountUser />
          <v-list-item to="/matters" title="All Matters" replace>
            <v-list-item-action icon>
              <v-icon>mdi-apps</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Matters</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/bookmarks" replace>
            <ThemeBookmarks />
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <ThemeToggle />
            </v-list-item-action>
            <v-list-item-content></v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
      <template v-slot:side-bar>
        <TheSideBarBaseDefault />
      </template>
    </ResizableSidebar>
    <v-main :class="{ 'grey lighten-3': !$vuetify.theme.dark }">
      <Nuxt />
    </v-main>
    <PortalAttributeActions />
    <PinPageToggleLink />
    <TheModalHistogramFilter />
    <v-footer
      class="pb-0 pt-0 pr-0"
      fixed
      :style="{ paddingLeft: `${getMain}px` }"
    >
      <PinContainerOdt />
    </v-footer>
  </v-app>
</template>

<script>
// import ResizableSidebar from '../components/utils/ResizableSidebar'
// import ThemeToggle from '@/components/utils/ThemeToggle'
// import TheSideBarBaseDefault from '~/components/side_bar/TheSideBarBaseDefault'
// import TopBarAuthODT from '~/features/odt/TopBarAuthODT'
// import MenuAccountUser from '~/components/utils/MenuAccountUser'
// import PortalAttributeActions from '@/sat-vue-toolkit/components/slick-grid/PortalAttributeActions'
// import ThemeBookmarks from '~/components/utils/ThemeBookmarks'
// import PinContainerOdt from '~/features/odt/PinContainerOdt'
// import PinPageToggleLink from '~/features/odt/PinPageToggleLink'
// import TheModalHistogramFilter from '~/sat-vue-toolkit/components/TheModalHistogramFilter'

const ResizableSidebar = () =>
  import(
    /* webpackChunkName: "ResizableSidebar" */ '../components/utils/ResizableSidebar.vue'
  )
const ThemeToggle = () =>
  import(
    /* webpackChunkName: "ThemeToggle" */ '../components/utils/ThemeToggle.vue'
  )
const TheSideBarBaseDefault = () =>
  import(
    /* webpackChunkName: "TheSideBarBaseDefault" */ '~/components/side_bar/TheSideBarBaseDefault.vue'
  )
const TopBarAuthODT = () =>
  import(
    /* webpackChunkName: "TopBarAuthODT" */ '~/features/odt/TopBarAuthODT.vue'
  )
const MenuAccountUser = () =>
  import(
    /* webpackChunkName: "MenuAccountUser" */ '~/components/utils/MenuAccountUser.vue'
  )
const PortalAttributeActions = () =>
  import(
    /* webpackChunkName: "PortalAttributeActions" */ '@/sat-vue-toolkit/components/slick-grid/PortalAttributeActions.vue'
  )
const ThemeBookmarks = () =>
  import(
    /* webpackChunkName: "ThemeBookmarks" */ '~/components/utils/ThemeBookmarks.vue'
  )
const PinContainerOdt = () =>
  import(
    /* webpackChunkName: "PinContainerOdt" */ '~/features/odt/PinContainerOdt.vue'
  )
const PinPageToggleLink = () =>
  import(
    /* webpackChunkName: "PinPageToggleLink" */ '~/features/odt/PinPageToggleLink.vue'
  )
const TheModalHistogramFilter = () =>
  import(
    /* webpackChunkName: "TheModalHistogramFilter" */ '~/sat-vue-toolkit/components/TheModalHistogramFilter.vue'
  )

export default {
  components: {
    TheModalHistogramFilter,
    PinPageToggleLink,
    PinContainerOdt,
    ThemeBookmarks,
    PortalAttributeActions,
    MenuAccountUser,
    TopBarAuthODT,
    TheSideBarBaseDefault,
    ThemeToggle,
    ResizableSidebar,
  },

  data() {
    return {
      clipped: false,
      title: '',
    }
  },
  async mounted() {
    this.$store.dispatch('appConfigs/loadAppConfigs')
    if (this.$store.getters['auth/isLoggedIn']) {
      this.$store.dispatch('auth/getUser')
      await this.$store.dispatch('userSettings/resetSettingsOptionsUser')
    }
    this.$store.dispatch('appConfigs/loadCourts')
  },
  computed: {
    getMain() {
      return this.$vuetify.application.left
    },
  },
}
</script>

<style lang="scss" scoped></style>
