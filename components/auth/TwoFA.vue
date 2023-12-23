<template>
  <div>
    <form class="form_auth form_verification px-4" @submit.prevent="submit">
      <div class="title mb-4">Two factor authentication</div>
      <v-alert v-show="isInvalidCode" dense border="left" type="error" outlined>
        Invalid code
      </v-alert>
      <v-text-field
        label="2FA code"
        v-model="code"
        maxLength="6"
        text-center
        solo
        type="number"
        autofocus
        data-vv-name="digit_code"
        required
      />
      <v-btn
        color="primary"
        block
        class="mt-0"
        :loading="submitting"
        :disabled="submitting || !code"
        type="submit"
      >
        Continue
      </v-btn>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'TwoFA',
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      code: '',
      isInvalidCode: false,
      submitting: false,
    }
  },
  methods: {
    submit() {
      this.submitting = true
      this.$store
        .dispatch('auth/login2', { code: this.code, code_token: this.token })
        .then(() => {
          this.$emit('authSuccess')
        })
        .catch((err) => {
          if (err.response.data.detail) {
            this.isInvalidCode = true
            this.code = ''
          }
        })
        .finally(() => {
          this.submitting = false
        })
    },
  },
}
</script>

<style>
input[data-vv-name='digit_code'],
.code_digit {
  font-size: 26px;
  font-weight: bold;
  text-align: center !important;
  letter-spacing: 10px;
}
</style>
