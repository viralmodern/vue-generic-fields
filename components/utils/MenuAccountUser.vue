<template>
  <v-menu v-model="menu" :close-on-content-click="false" offset-x>
    <template v-slot:activator="{ on }">
      <v-list-item>
        <v-list-item-action>
          <v-avatar
            v-on="on"
            color="primary"
            size="25"
            style="cursor: pointer;"
          >
            <v-btn icon v-if="!isLoggedIn" @click="redirectLogin">
              <v-icon small>mdi-login</v-icon>
            </v-btn>
            <template v-else>
              <img v-if="account.avatar" :src="account.avatar" alt="John" />
              <span style="font-size: 65%;" v-else>
                {{ account.name | $$strName }}
              </span>
            </template>
          </v-avatar>
        </v-list-item-action>
        <v-list-item-content></v-list-item-content>
      </v-list-item>
    </template>
    <v-card dense title>
      <v-list dense>
        <v-list-item two-line style="min-height: unset;" dense>
          <v-list-item-avatar>
            <v-avatar
              color="primary"
              class="white--text text-uppercase cusor--pointer"
            >
              <img v-if="account.avatar" :src="account.avatar" alt="John" />
              <span style="font-size: 65%;" v-else>{{
                account.name | $$strName
              }}</span>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ account.username }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ account.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item style="min-height: unset;" dense link>
          <v-list-item-icon>
            <v-icon small>
              mdi-account
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>Account</v-list-item-title>
        </v-list-item>
        <v-list-item style="min-height: unset;" dense @click.stop="signOut">
          <v-list-item-icon>
            <v-icon small>
              mdi-logout
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sign Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { $$strName } from '@/sat-vue-toolkit/functions'

export default {
  name: 'MenuAccountUser',
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      isLoggedIn: 'auth/isLoggedIn',
    }),
    account() {
      try {
        return this.user || {}
      } catch (e) {
        return {}
      }
    },
  },
  methods: {
    async signOut() {
      await this.$store.dispatch('auth/logout')
      this.redirectLogin()
    },
    redirectLogin() {
      let query = { redirect: this.$route.fullPath }
      this.$router.replace({ path: '/auth/login', query })
    },
  },
  filters: {
    $$strName,
  },
}
</script>

<style scoped></style>
