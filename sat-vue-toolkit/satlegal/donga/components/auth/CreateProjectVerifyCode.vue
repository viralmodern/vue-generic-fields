<template>
  <div>
    <v-card class="elevation-12">
      <v-card-text>
        <LogoAuth/>
        <v-form class="mt-3 btn_left" @submit.prevent="submit" ref="form_code_digit">
          <h3 class="text-h5 font-weight-bold mb-2 pa-0">Check your email!</h3>
          <p class="subheading">
            We've sent a 6-digit confirmation code to
            <strong>{{email}}</strong>. It will expire shortly, so enter it soon.
          </p>
          <v-text-field text-center
                        solo
                        placeholder="462609"
                        autofocus
                        v-model="code"
                        v-validate="'required|max:6|numeric'"
                        data-vv-name="digit_code"
                        :error-messages="errors.collect('digit_code')"
                        required
          ></v-text-field>
          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn @click="submit"
                   :loading="submitting"
                   :disabled="submitting || !code"
                   color="primary">Submit<v-icon right dark>arrow_forward</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import LogoAuth from './LogoAuth'

  export default {
    name: "CreateProjectVerifyCode",
    components: {LogoAuth},
    $_veeValidate: {
      validator: 'new'
    },
    props: {
      email: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        code: "",
        formError: "",
        submitting: false,
        dictionary: {
          custom: {
            digit_code: {
              required: () => 'Digit code can not be empty',
              max: 'The name field may not be greater than 6 characters',
              numeric: 'The name field is numeric'
              // custom messages
            }
          }
        }
      };
    },
    mounted() {
      this.$validator.localize('en', this.dictionary)
    },
    watch: {
      code(newValue) {
        if (newValue && !/^\d+$/.test(newValue)) {
          this.code = "";
        }
      }
    },
    methods: {
      submit() {
        let email = this.email;
        let code = this.code;
        this.submitting = true;
        this.$validator.validateAll().then(() => {
          this.$http
            .post("/api/users/auth/signup/verify-code/", {email, code})
            .then(() => {
              let code = this.code;
              this.$emit("nextStep", {code});
              this.$validator.reset();
              this.formError = "";
              // setAxiosAuthorizationHeader()
            })
            .catch(error => {
              this.submitting = false;
              if (error.response.status === 400) {
                this.formError = "That code wasn't valid. Give it another go!";
                this.$eventHub.$emit(this.$eventTypes.snackNotify, "That code wasn't valid. Give it another go!");
              }
            });
        }).catch(() => {

        });

      }
    }
  }
</script>

<style>
  input[data-vv-name="digit_code"], .code_digit {
    font-size: 26px;
    font-weight: bold;
    text-align: center !important;
    letter-spacing: 10px;
  }
</style>
