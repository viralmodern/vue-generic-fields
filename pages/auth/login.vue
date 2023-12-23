<template>
  <div class="d-flex w-full fill-height justify-center align-center">
    <v-card width="635px">
      <v-card-text class="px-12">
        <TwoFA :token="token" @authSuccess="authSuccess" v-if="token" />
        <template v-else>
          <v-alert
            v-if="checked && !isWorkspaceExist"
            type="error"
            outlined
            border="left"
            dense
            class="mb-0"
          >
            Workspace not found!
          </v-alert>
          <template v-else>
            <CheckWorkspace v-if="!workspaceName" />
            <template v-else>
              <div v-show="!checked">
                <v-row align="center" justify="center">
                  <v-spacer />
                  <v-col>
                    <v-progress-circular indeterminate color="primary" />
                  </v-col>
                  <v-spacer />
                </v-row>
              </div>
              <div v-show="checked">
                <div>
                  <div>
                    <div class="text-h6 black--text mb-4">
                      Sign in to
                      <span class="black--text">{{ workspaceName }}</span>
                    </div>
                    <v-alert
                      v-show="loginError"
                      type="error"
                      outlined
                      border="left"
                      dense
                      v-html="loginError"
                    />
                    <v-form
                      ref="form"
                      @submit.prevent="login"
                      :disabled="submitting"
                    >
                      <v-text-field
                        v-model="email"
                        label="Email"
                        required
                        outlined
                        dense
                        :rules="emailRules"
                        autofocus
                        type="text"
                      />
                      <v-text-field
                        v-model="password"
                        label="Password"
                        required
                        dense
                        outlined
                        :rules="passwordRules"
                        type="password"
                      />
                      <div class="mb-4">
                        <v-btn
                          :loading="submitting"
                          block
                          :disabled="!canLogin || submitting"
                          color="primary"
                          type="submit"
                        >
                          Login
                        </v-btn>
                        <v-spacer />
                      </div>
                      <v-card-actions class="px-0">
                        <nuxt-link
                          class="subheading link_bt"
                          :to="linkForgotPassword"
                        >
                          Forgot password?
                        </nuxt-link>
                        <v-spacer />
                        <a
                          class="subheading link_bt"
                          :href="createWorkspaceLink"
                          >Create new workspace?</a
                        >
                      </v-card-actions>
                    </v-form>
                  </div>
                </div>
              </div>
            </template>
          </template>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { getMainURL, getSubdomain } from '@/sat-vue-toolkit/satlegal/utils'
import CheckWorkspace from '../../components/auth/CheckWorkspace'
import TwoFA from '../../components/auth/TwoFA'
import urlMixin from '@/mixins/mx_url'
import emailRulesMixin from '@/mixins/mx_emailRules'

export default {
  components: { TwoFA, CheckWorkspace },
  mixins: [urlMixin, emailRulesMixin],
  layout: 'auth',
  head() {
    return {
      title: 'Login',
    }
  },
  data() {
    return {
      appDomain: '',
      valid: false,
      isWorkspaceExist: false,
      email: '',
      password: '',
      loginError: '',
      checked: false,
      token: '',
      submitting: false,
      passwordRules: [(v) => !!v || 'Password is required'],
    }
  },
  computed: {
    workspaceName() {
      return getSubdomain(location.hostname)
    },
    canLogin() {
      if (this.isWorkspaceExist) {
        return (
          this.email !== '' &&
          this.password !== '' &&
          this.$refs.form.validate()
        )
      }
      return false
    },
    linkForgotPassword() {
      const { query } = this.$route
      return { name: 'auth-forgot-password', query }
    },
    createWorkspaceLink() {
      console.log(this.$route)
      let searchLocation = window.location.search
      return `${getMainURL()}/auth/create-workspace${searchLocation}`
    },
  },
  created() {
    if (this.workspaceName) {
      this.checkWorkspaceName(this.workspaceName)
    }
  },
  methods: {
    checkWorkspaceName(workspaceName) {
      this.$axios
        .get(`/api/workspaces/${workspaceName}/check/`)
        .then((response) => {
          this.isWorkspaceExist = true
          this.checked = true
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            this.isWorkspaceExist = false
            this.checked = true
          }
        })
    },
    login() {
      this.submitting = true
      this.loginError = ''
      this.$store
        .dispatch('auth/login', {
          email: this.email,
          password: this.password,
          workspace: this.workspaceName,
        })
        .then((response) => {
          if (this.$store.getters['auth/isLoggedIn']) {
            this.authSuccess()
          } else {
            this.token = response.data.token
          }
        })
        .catch((error) => {
          console.log(error)
          if (error.response.status === 403) {
            this.loginError =
              'Sorry, you entered an incorrect email or password.'
          } else if (error.response.status === 429) {
            this.loginError = 'Sorry! Rate limit exceeded. Try again later.'
          } else {
            this.loginError = 'Sorry, something went wrong. Please try again.'
          }
        })
        .finally(() => {
          this.submitting = false
        })
    },
    authSuccess() {
      console.error('authSuccess', this.$route)
      let path = this.$route.query['redirect'] || this.defaultPage
      this.$router.replace({ path })
    },
  },
}
</script>

<style scoped>
.background {
  -webkit-box-shadow: -20px 7px 30px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -20px 7px 30px 0px rgba(0, 0, 0, 0.75);
  box-shadow: -20px 7px 30px -27px rgba(0, 0, 0, 0.75);
  background: #bbdff0;
}
</style>
