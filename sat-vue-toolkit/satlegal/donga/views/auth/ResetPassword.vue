<template>
  <v-card class="elevation-12" v-if="!submitted">
    <v-card-title class="layout align-center justify-center pb-0 text-xs-left">
      <div class="text-h4 text-xs-center font-weight-bold">Password Reset</div>
    </v-card-title>
    <v-card-text>
      <v-form class="px-5" ref="form" @submit.prevent="submit" lazy-validation v-model="valid">
        <v-card-title class="layout pt-0 pl-0 justify-start">
          <div class="text-xs-center subheading">
            To reset password, please enter the email address you use to sign in
            to
            <strong>{{ domain }}</strong>
          </div>
        </v-card-title>
        <v-text-field v-model="email"
                      :rules="emailRules"
                      label="you@example.com"
                      solo
                      autofocus
                      required>
        </v-text-field>
        <v-btn color="primary"
               @click="submit"
               :loading="submitting"
               block
               :disabled="submitting || !valid">
          Get Reset Link
        </v-btn>
      </v-form>
    </v-card-text>

  </v-card>
  <v-card class="elevation-12" v-else>
    <v-card-title class="layout align-center justify-center pb-0 text-xs-left">
      <div class="text-h4 text-xs-center font-weight-bold">Email Sent!</div>
    </v-card-title>
    <v-card-text>
      <v-card-title class="layout pt-0 pl-0 justify-start">
        <div class="text-h5 text-xs-center subheading">
          Check your <strong>{{ email }}</strong> inbox for instruction from
          us on how to reset your password
        </div>
      </v-card-title>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "ResetPassword",
    metaInfo: {
      title: "Reset Password"
    },
    data() {
      return {
        domain: location.hostname,
        email: "",
        submitted: false,
        submitting: false,
        valid: true,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
      };
    },
    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          let email = this.email;
          this.$http
            .post("/api/users/auth/password/reset/", {email})
            .then(() => (this.submitted = true))
            .catch(() => {

            });
        }

      }
    }
  };
</script>
