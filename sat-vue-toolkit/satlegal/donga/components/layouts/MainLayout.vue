<template>
  <v-app :dark="isDark" class="bg_app">
    <Determinate />
    <v-navigation-drawer fixed app :mini-variant="mini" v-model="drawer">
      <!--sidebar-->
      <v-app-bar class="transparent">
        <v-list class="pa-0">
          <v-list-item avatar>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-app-bar>
      <v-list dense>
        <v-divider></v-divider>
        <template v-for="item in items">
          <v-row
            no-gutters
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-xs-center">
              <a href="#!" class="text-body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <!--submenu-->
          <MenuSub
            :key="item.text"
            :list="item.children"
            v-else-if="item.children"
          />
          <!--tooltip-->
          <v-list-item v-else :key="item.text">
            <v-tooltip right>
              <v-btn icon @click.stop="toggleModal(item['type'])" v-on="on">
                <v-icon>{{ item.icon }}</v-icon>
              </v-btn>
              <span>{{ item.text }}</span>
            </v-tooltip>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark fixed>
      <v-toolbar-title class="ml-0 pl-0 mr-3 layout align-center">
        <v-avatar
          :size="30"
          @click.stop="drawer = !drawer"
          class="pointer_cusor"
        >
          <img src="../../../assets/logo_thumb.png" alt="avatar" />
        </v-avatar>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon :href="source" target="_blank" v-on="on">
            <v-icon>alternate_email</v-icon>
          </v-btn>
          <span>Mentions</span>
        </template>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon :href="source" target="_blank" v-on="on">
            <v-icon>flash_on</v-icon>
          </v-btn>
          <span>News feed</span>
        </template>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon :href="source" target="_blank" v-on="on">
            <v-icon>timer</v-icon>
          </v-btn>
          <span>timer</span>
        </template>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon :href="source" target="_blank" v-on="on">
            <v-icon>search</v-icon>
          </v-btn>
          <span>search</span>
        </template>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon :href="source" target="_blank" v-on="on">
            <v-switch v-model="isDark"></v-switch>
          </v-btn>
          <span>{{ isDark ? "Bright" : "Dark" }}</span>
        </template>
      </v-tooltip>
      <v-btn
        color="white"
        class="text--primary font-weight-bold"
        small
        @click.stop="openModalOnBoard"
      >
        <span>New</span>
      </v-btn>
      <v-badge overlap color="orange">
        <template v-slot:badge>
          <span>12..</span>
        </template>
        <v-icon medium color="white">
          notifications
        </v-icon>
      </v-badge>
      <MenuAvatarProfile @clickMenuAvatarProfile="clickMenuAvatarProfile" />
    </v-app-bar>
    <v-main>
      <v-container fluid fill-height>
        <v-row class="justify-start align-start" no-gutters>
          <slot />
        </v-row>
      </v-container>
    </v-main>
    <!--Component include-->
    <Profile :dialog="dialogProfile" @toggleModal="toggleModal" />
    <Settings :dialog="dialogSettings" @toggleModal="toggleModal" />
    <ProfileUserDrawer />
    <ModalOnBoard>
      <LetGetStarted />
    </ModalOnBoard>
    <Snack />
  </v-app>
</template>

<script>
import Profile from "./Profile";
import MenuSub from "./MenuSub";
import Settings from "./Settings";
import Determinate from "../utils/Determinate";
import MenuAvatarProfile from "../auth/MenuAvatarProfile";
import ProfileUserDrawer from "../user/ProfileUserDrawer";
import ModalOnBoard from "../dashboard/ModalOnBoard";
import LetGetStarted from "../dashboard/LetGetStarted";
import Snack from "../utils/Snack";

const DIALOG_TYPE = {
  PROFILE: "PROFILE",
  SETTINGS: "SETTINGS"
};
export default {
  name: "MainLayout",
  components: {
    Snack,
    LetGetStarted,
    ModalOnBoard,
    ProfileUserDrawer,
    MenuAvatarProfile,
    Determinate,
    Profile,
    MenuSub,
    Settings
  },
  data() {
    return {
      // theme
      isDark: false,

      // drawer navigation
      drawer: null,
      mini: true,

      // menu sidebar
      items: [
        { icon: "home", text: "Home" },
        {
          icon: "folder",
          "icon-alt": "folder",
          text: "Project",
          mode: true,
          submenu: true,
          children: [
            { icon: "", text: "Satproj" },
            { icon: "", text: "Sathrproj" }
          ]
        },
        { icon: "public", text: "Everything" },

        { icon: "settings", text: "Settings", type: DIALOG_TYPE.SETTINGS },
        { icon: "chat_bubble", text: "Feedback" },
        { icon: "help", text: "Help" }
      ],
      // menu
      fav: true,
      menu: false,
      message: true,
      hints: true,

      // source
      source: "",

      // profile
      dialogSettings: false,
      dialogProfile: false,
      dialogProfileUserDrawer: false
    };
  },
  created() {},
  computed: {
    toggleDialogProfileUserDrawer() {
      return this.dialogProfileUserDrawer;
    }
  },
  methods: {
    toggleModal(type) {
      switch (type) {
        case DIALOG_TYPE.PROFILE:
          this.dialogProfile = !this.dialogProfile;
          break;
        case DIALOG_TYPE.SETTINGS:
          this.dialogSettings = !this.dialogSettings;
          break;
        default:
          break;
      }
    },
    clickMenuAvatarProfile() {},
    openModalOnBoard() {
      this.$eventHub.$emit(this.$eventTypes.ModalOnBoard, true);
    }
  }
};
</script>

<style>
.bg_app {
  background: url("../../../assets/dashboard.jpg") no-repeat top center;
  background-size: cover;
  background-attachment: fixed;
  background: #f6f6f6;
}
.v-card {
}
.fixed_line {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
}
</style>
