<template>
  <!--MENU-->
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    open-on-hover
    bottom
    :offset-y="true"
  >
    <template v-slot:activator="{ on }">
      <v-avatar class="ml-3" :size="30" color="pink">
        <img :src="getAvatar" v-if="getAvatar" alt="John" v-on="on" />
        <span v-else v-on="on" class="white--text text-h5">{{getUsername | chartFirst}}</span>
      </v-avatar>
    </template>
    <v-card>
      <v-list>
        <v-list-item avatar>
          <v-list-item-avatar color="pink">
            <img v-if="getAvatar" :src="getAvatar" alt="John" />
            <span v-else class="white--text text-h5">{{getName | chartFirst}}</span>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{getName}}</v-list-item-title>
            <v-list-item-subtitle>{{getUsername}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item @click="openProfileDrawer">
          <v-list-item-action>
            <v-icon>mdi-account_circle</v-icon>
          </v-list-item-action>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-icon>vpn_key</v-icon>
          </v-list-item-action>
          <v-list-item-title>Change password</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-title>My preferences</v-list-item-title>
        </v-list-item>
        <v-list-item @click="signOut">
          <v-list-item-action>
            <v-icon>power_settings_new</v-icon>
          </v-list-item-action>
          <v-list-item-title>Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {$$STORE_PREFIX} from "../../../utils";
export default {
  name: "MenuAvatarProfile",
  data() {
    return {
      menu: false,
      message: false
    };
  },
  computed: {
    ...mapGetters("ht_store/user", [
      "getFirstName",
      "getLastName",
      "getUsername",
      "getName",
      "getAvatar"
    ])
  },
  methods: {
    ...mapActions("ht_store/auth", ["logout"]),
    signOut() {
      this.logout().then(() => {
        this.$router.replace({ path: "/signin" });
      });
    },
    openProfileDrawer() {
      this.$eventHub.$emit(this.$eventTypes.profileUserDrawer);
    }
  },
  filters: {
    chartFirst(title) {
      if (!title) return "S";
      return title.charAt(0).toUpperCase();
    }
  }
};
</script>

<style scoped>
</style>
