<template>
  <div class="d-flex align-center justify-end">
    <template v-if="authenticated">
      <v-menu :close-on-content-click="false" :nudge-width="150" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-list-item-avatar
            color="primary"
            class="white--text"
            v-on="on"
            v-bind="attrs"
          >
            <img :src="user.avatar" v-if="user.avatar" alt="John" />
            <span v-else>{{ user | $$fullName | $$strName }}</span>
          </v-list-item-avatar>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar color="primary" class="white--text">
                <img :src="user.avatar" v-if="user.avatar" alt="John" />
                <span v-else>{{ user | $$fullName | $$strName }}</span>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ user | $$fullName }}</v-list-item-title>
                <v-list-item-subtitle
                  >{{ `${user.email}` }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-item @click="handleFormAuth({ isAccountDetail: true })">
              <v-list-item-action>
                <v-icon>mdi-account</v-icon>
              </v-list-item-action>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click.stop="$store.dispatch('authODT/signOut')">
              <v-list-item-action>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-action>
              <v-list-item-title>Log Out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </template>
    <!--<template v-else>
      <btn-link label="Sign In"
                icon="mdi-login"
                @click="handleFormAuth({ isSignIn: true })"/>
    </template>-->
    <template v-else>
      <btn-link label="Sign In" :btn-options="{ to: redirectLogin }" />
      <ModalAuthIframe />
    </template>
  </div>
</template>

<script>
import { $$strName } from '~/sat-vue-toolkit/functions'
import BtnLink from '~/sat-vue-toolkit/components/BtnLink'
import ModalAuthIframe from '~/features/odt/ModalAuthIframe'

export default {
  name: 'TopBarAuthODT',
  components: { ModalAuthIframe, BtnLink },
  filters: {
    $$strName,
    $$fullName(user) {
      let fullName = `${user.first_name} ${user.last_name}`
      let email = `${user.email}`
      return fullName || email
    },
  },
  methods: {
    handleFormAuth({ isSignUp, isSignIn, isAccountDetail }) {
      this.$eventHub.$emit('handleFormAuth', {
        isSignUp,
        isSignIn,
        isAccountDetail,
      })
    },
  },
  computed: {
    user() {
      try {
        return this.$store.getters['authODT/user']
      } catch (e) {
        return {}
      }
    },
    authenticated() {
      try {
        return this.$store.getters['authODT/authenticated']
      } catch (e) {
        return false
      }
    },
    redirectLogin() {
      return {
        path: '/auth/login',
        query: { redirect: this.$route.fullPath },
      }
    },
  },
}
</script>

<style scoped></style>
