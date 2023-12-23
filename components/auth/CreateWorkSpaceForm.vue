<template>
  <div>
    <v-form class="form_auth" @submit.prevent="submit" v-if="!token">
      <h2 class="title font-weight-bold my-3">
        Enter your workspace's {{ $$productName }} URL
      </h2>
      <v-layout>
        <v-alert
          v-show="errorMessage"
          outlined
          type="error"
          border="left"
          dense
        >
          <span v-html="errorMessage"></span>
        </v-alert>
      </v-layout>
      <v-layout align-center>
        <v-text-field
          v-model.trim="subdomain"
          name="login"
          class="child-flex custom_field"
          placeholder="your-workspace-url"
          type="text"
          autofocus
          outlined
          solo
          required
          pattern="[a-zA-Z0-9-]+"
          autocomplete="off"
          maxLength="21"
          hint="This'll be a unique  web address for your firm to login."
        >
          <template v-slot:append-outer>
            <span class="title pt-2">.{{ currentHost }}</span>
          </template>
        </v-text-field>
      </v-layout>
      <v-row>
        <v-spacer />
        <v-btn
          :loading="submitting"
          :disabled="submitting || !subdomain"
          color="primary"
          class="ml-0 mt-1"
          type="submit"
        >
          Next
        </v-btn>
        <v-spacer />
      </v-row>
    </v-form>
    <SetPassword
      v-if="token && needSetPassword && setSubdomainTokenDone"
      :quick-token="token"
    />
    <SetSubdomainToken
      v-if="token && subdomain"
      :token="token"
      :subdomain="subdomain"
      :load="iframeLoaded"
    />
    <v-row align="center" justify="center" v-show="showProgress">
      <div class="text-center">
        <v-progress-circular indeterminate color="primary" />
      </div>
    </v-row>
  </div>
</template>

<script>
import { getSubdomainURL } from '@/sat-vue-toolkit/satlegal/utils'
import SetPassword from './SetPassword'
import SetSubdomainToken from '../../pages/auth/set-subdomain-token'
import mx_url from '~/mixins/mx_url'

export default {
  name: 'CreateWorkSpace',
  components: { SetSubdomainToken, SetPassword },
  mixins: [mx_url],
  props: {
    email: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    subdomain: '',
    token: '',
    submitting: false,
    needSetPassword: true,
    errorMessage: '',
    setSubdomainTokenDone: false,
    showProgress: false,
  }),
  computed: {
    currentHost() {
      return location.hostname
    },
  },
  created() {
    this.$eventHub.$on('password-set', this.nextStep)
  },
  methods: {
    iframeLoaded() {
      if (!this.needSetPassword) {
        this.nextStep()
      }
      this.setSubdomainTokenDone = true
    },
    submit() {
      const { email, code, subdomain } = this
      this.submitting = true
      this.$axios
        .post('/api/users/auth/create-workspace/', {
          email,
          code,
          name: subdomain,
        })
        .then((response) => {
          this.needSetPassword = !!response.data.need_set_pass
          this.subdomain = response.data.workspace
          this.token = response.data.token
        })
        .catch((error) => {
          const data = error.response.data
          if (data.name) {
            this.errorMessage = data.name.slice(-1)[0]
          } else {
            this.errorMessage = 'Some things error, please try again later.'
          }
        })
        .finally(() => {
          this.submitting = false
        })
    },
    nextStep() {
      this.showProgress = true
      let path = this.$route.query['redirect'] || this.defaultPage
      // this.$router.replace({ path })
      // let searchLocation = window.location.search
      location.href = `${getSubdomainURL(this.subdomain)}${path}`
      // location.href = `${getSubdomainURL(this.subdomain)}/auth/invite-members`
    },
  },
}
</script>

<style scoped>
.v-text-field >>> input {
  font-size: 1.2em;
}

.flex_label {
  /*border: solid 1px red;*/
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex_label ._title {
  flex: 1;
}

.flex_label ._icon {
  /*font-family: 'Roboto', sans-serif !important;*/
  background: #4caf50;
  padding: 4px 10px 2px 10px;
  margin-left: 0px;
  color: #fff;
  text-align: center;
  font-size: 16px;
}
</style>
