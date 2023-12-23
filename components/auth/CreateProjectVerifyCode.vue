<template>
  <div>
    <v-form
      ref="form_code_digit"
      class="mt-3 btn_left form_auth"
      @submit.prevent="submit"
    >
      <div class="title font-weight-bold pb-2">Check your email!</div>
      <div class="text-subtitle-2 font-weight-regular py-1">
        We've sent a 6-digit confirmation code to <strong>{{ email }}</strong
        >. It will expire shortly, so enter it soon.
      </div>
      <v-alert v-show="isErrorCode" outlined type="error" border="left" dense>
        Invalid code
      </v-alert>
      <v-text-field
        v-model="code"
        maxLength="6"
        text-center
        solo
        placeholder="462609"
        autofocus
        data-vv-name="digit_code"
        required
      />
      <v-row>
        <v-spacer />
        <v-btn
          :loading="submitting"
          :disabled="isNotValidCode || submitting"
          color="primary"
          class="ml-0"
          type="submit"
        >
          Submit
        </v-btn>
        <v-spacer />
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'CreateProjectVerifyCode',
  $_veeValidate: {
    validator: 'new',
  },
  props: {
    email: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      code: '',
      formError: '',
      submitting: false,
      isErrorCode: false,
    }
  },
  computed: {
    isNotValidCode() {
      return this.code.length !== 6
    },
  },
  watch: {
    code(newValue) {
      if (newValue && !/^\d+$/.test(newValue)) {
        this.code = ''
      }
    },
  },
  methods: {
    submit() {
      const email = this.email
      const code = this.code
      this.submitting = true
      this.$axios
        .post('/api/users/auth/signup/verify-code/', { email, code })
        .then(() => {
          const code = this.code
          this.$emit('nextStep', { code })
          this.$validator.reset()
          this.formError = ''
        })
        .catch((error) => {
          this.isErrorCode = true
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
