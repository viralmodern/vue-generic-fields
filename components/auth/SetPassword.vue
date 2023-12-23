<template>
  <div>
    <div class="title mb-4">Set your password</div>
    <v-form @submit.prevent="submit">
      <v-text-field
        v-model="password"
        name="password"
        label="Password"
        type="password"
        autofocus
        required
        outlined
        dense
      />
      <v-text-field
        v-model="repeatPassword"
        name="repeatPassword"
        label="Confirm password"
        type="password"
        required
        outlined
        dense
      />
      <div class="d-flex">
        <v-spacer />
        <v-btn
          color="primary"
          :loading="submitting"
          type="submit"
          :disabled="!matchPassword || submitting"
        >
          Set password
        </v-btn>
        <v-spacer />
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'SetPassword',
  props: {
    quickToken: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      password: '',
      repeatPassword: '',
      submitting: false,
    }
  },
  computed: {
    matchPassword() {
      return this.password === this.repeatPassword
    },
  },
  methods: {
    submit() {
      const payload = {
        new_password1: this.password,
        new_password2: this.repeatPassword,
      }
      const headers = {
        Authorization: 'JWT ' + this.quickToken,
      }
      this.submitting = true
      this.$axios
        .post('/api/users/auth/password/change/', payload, { headers })
        .then((response) => {
          this.$eventHub.$emit('password-set')
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.submitting = false
        })
    },
  },
}
</script>
