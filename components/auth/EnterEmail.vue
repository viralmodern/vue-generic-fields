<template>
  <div>
    <div class="title font-weight-bold pb-2">Create new workspace.</div>
    <div class="text-subtitle-2 font-weight-bold py-1">
      First, enter your email.
    </div>
    <v-form @submit.prevent="getCode" ref="form">
      <v-text-field
        outlined
        label="Email"
        placeholder="your@email.com"
        type="email"
        v-model="email"
        :autofocus="true"
        :rules="emailRules"
        :loading="submitting"
      />
      <v-row class="w-full d-flex justify-center">
        <v-btn
          :loading="submitting"
          color="primary"
          type="submit"
          :disabled="!validForm || submitting"
        >
          Get code
        </v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import emailRulesMixin from '@/mixins/mx_emailRules'

export default {
  mixins: [emailRulesMixin],
  data() {
    return {
      email: '',
      submitting: false,
    }
  },
  computed: {
    validForm() {
      return this.email !== '' && !this.submitting && this.$refs.form.validate()
    },
  },
  methods: {
    getCode() {
      const email = this.email
      this.submitting = true
      this.$axios
        .post('/api/users/auth/signup/', { email })
        .then(() => {
          this.$emit('nextStep', { email })
        })
        .catch(() => {})
        .finally(() => {
          this.submitting = false
        })
    },
  },
}
</script>
