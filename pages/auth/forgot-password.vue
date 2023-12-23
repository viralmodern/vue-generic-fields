<template>
  <div v-if="!submitted">
    <v-form
      ref="form"
      v-model="valid"
      class="px-5 form_auth"
      lazy-validation
      @submit.prevent="submit"
    >
      <div class="text-h6 black--text text-xs-left mb-3">
        Password Reset
      </div>
      <div class="pa-2 pb-4">
        To reset your password, enter the email address you use to sign in to
        <b>{{ domain }}</b
        >.
      </div>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Enter your email address"
        outlined
        autofocus
        required
      />
      <v-btn
        color="primary"
        :loading="submitting"
        block
        :disabled="submitting || !valid"
        @click="submit"
      >
        Get Reset Link
      </v-btn>
    </v-form>
  </div>
  <div v-else class="form_auth">
    <v-card-title class="layout align-center justify-center pb-0 text-xs-left">
      <div class="text-h6 text-center black--text">
        Email Sent!
      </div>
    </v-card-title>
    <v-card-text>
      <v-card-title class="layout pt-0 pl-0 justify-start">
        <div class="text-subtitle-2 text-center">
          Check your <strong>{{ email }}</strong> inbox for instruction from us
          on how to reset your password.
        </div>
      </v-card-title>
    </v-card-text>
  </div>
</template>

<script>
import emailRulesMixin from '@/mixins/mx_emailRules'

export default {
  name: 'ResetPassword',
  mixins: [emailRulesMixin],
  layout: 'auth',
  head() {
    return {
      title: 'Password Reset',
    }
  },
  data() {
    return {
      email: '',
      submitted: false,
      submitting: false,
      valid: true,
    }
  },
  computed: {
    domain() {
      return location.hostname
    },
  },
  methods: {
    submit() {
      const email = this.email
      const urlTemplate = 'auth/password-reset/confirm/{uid}/{token}'
      this.$axios
        .post('/api/users/auth/password/reset/', {
          email,
          url_template: urlTemplate,
        })
        .then(() => (this.submitted = true))
        .catch(() => {})
    },
  },
}
</script>
