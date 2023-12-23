<template>
  <div class="d-flex w-full fill-height justify-center align-center">
    <v-card width="635px">
      <v-card-text class="px-12">
        <v-form class="form_auth" @submit.prevent="submit">
          <div
            class="text-h6 black--text mb-3"
            :class="{
              'text-xs-left': status === statusTypes.VALID_LINK,
              'text-center': status !== statusTypes.VALID_LINK,
            }"
          >
            Password Reset
          </div>

          <template v-if="status === statusTypes.VALID_LINK">
            <div class="text-caption mb-2">
              Enter your new password
            </div>
            <v-text-field
              ref="password"
              v-model="new_password1"
              label="New Password"
              type="password"
              outlined
              dense
              required
            />
            <v-text-field
              v-model="new_password2"
              label="Confirm New Password"
              type="password"
              style="border-width: 1px;"
              outlined
              dense
              required
            />
            <v-btn
              color="primary"
              :loading="submitting"
              block
              :disabled="submitting"
              type="submit"
            >
              Change My Password
            </v-btn>
          </template>
          <template v-else-if="status === statusTypes.INVALID_LINK">
            <v-card-title class="layout pt-0 pl-0 justify-center">
              <div class="text-center text-subtitle-2">
                Password reset links expire after 24 hours if unused, you can
                <router-link class="link_bt" to="/auth/forgot-password">
                  request a new one
                </router-link>
              </div>
            </v-card-title>
          </template>
          <template v-else-if="status === statusTypes.SUCCESS">
            <v-card-title class="layout pt-0 pl-0 justify-center">
              <div class="text-center text-subtitle-2">
                Your password has been updated successfully.
                <a class="link_bt" :href="loginLink">Login now</a>
              </div>
            </v-card-title>
          </template>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// import { getRecentDomain } from "../../utils";
const StatusTypes = {
  LOADING: 'LOADING',
  VALID_LINK: 'VALID_LINK',
  INVALID_LINK: 'INVALID_LINK',
  SUCCESS: 'SUCCESS',
}

export default {
  layout: 'auth',
  metaInfo: {
    title: 'Password Reset',
  },
  data() {
    return {
      status: StatusTypes.LOADING,
      new_password1: '',
      new_password2: '',
      serverErrors: [],
      submitting: false,
      dictionary: {
        /* custom: {
              new_password2: {
                confirmed: 'The field name not enter special characters',
                // custom messages
              }
            } */
      },
    }
  },
  computed: {
    statusTypes() {
      return StatusTypes
    },
    canSubmit() {
      return (
        !!this.new_password1 &&
        !!this.new_password2 &&
        this.new_password1 === this.new_password2
      )
    },
    loginLink() {
      /* let subdomain = getRecentDomain();
          if (subdomain) {
            return `${location.protocol}//${subdomain}.${location.host}`;
          } */
      return '/'
    },
    header() {
      switch (this.status) {
        case StatusTypes.VALID_LINK:
          return 'Reset Password'
        case StatusTypes.INVALID_LINK:
          return "That link isn't working."
        case StatusTypes.SUCCESS:
          return 'Password updated'
        default:
          return 'Loading...'
      }
    },
  },
  created() {
    this.$axios
      .get(
        `/api/users/auth/password/reset/check/${this.$route.params.uid}/${this.$route.params.token}/`
      )
      .then(() => (this.status = StatusTypes.VALID_LINK))
      .catch((error) => {
        this.status = StatusTypes.INVALID_LINK
        this.er = error
      })
  },
  mounted() {},
  methods: {
    submit() {
      if (this.canSubmit) {
        const new_password1 = this.new_password1
        const new_password2 = this.new_password2
        const uid = this.$route.params.uid
        const token = this.$route.params.token
        this.serverErrors = []

        this.$axios
          .post('/api/users/auth/password/reset/confirm/', {
            new_password1,
            new_password2,
            uid,
            token,
          })
          .then(() => (this.status = StatusTypes.SUCCESS))
          .catch((error) => {
            if (error.response.status === 400) {
              if (error.response.data.token || error.response.data.uid) {
                this.status = StatusTypes.INVALID_LINK
              } else if (error.response.data.new_password2) {
                this.serverErrors = error.response.data.new_password2
              }
            }
          })
      }
    },
  },
}
</script>
