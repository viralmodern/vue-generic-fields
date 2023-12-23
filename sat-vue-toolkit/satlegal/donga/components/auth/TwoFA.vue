<template>
  <div>

    <v-card>
      <v-card-title class="layout column justify-start">
        <div class="text-h4 font-weight-bold">Verification code</div>
        <div class="subheading">
          A verification code has been sent to your email
          address
        </div>
      </v-card-title>
      <v-card-text>
        <form class="form_verification px-4"
              @submit.prevent="submit">
          <v-text-field v-model="code"
                        autofocus
                        type="number"
                        solo
                        data-vv-name="fa_code"
                        text-center
                        class="mb-0 pb-0 code_digit text-xs-center"></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary"
                   @click="submit"
                   block
                   class="mt-0"
                   :loading="submitting"
                   :disabled="submitting || !code">
              Submit
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </form>
      </v-card-text>
      <v-card-text>
        <p class="text-xs-center">
          Haven't received code yet?<a href="" @click.prevent="clearToken">
          Resend Code</a>
        </p>
      </v-card-text>

    </v-card>
  </div>
</template>

<script>
  // @ is an alias to /src
  import {$$STORE_PREFIX} from "../../../utils";

  export default {
    name: "TwoFA",

    metaInfo: {
      title: "Secure Login"
    },
    props: {
      token: {
        type: String,
        required: true
      },
      clearToken: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        code: "",
        formError: "",
        submitting: false,

      };
    },
    methods: {
      submit() {
        let code_token = this.token;
        let code = this.code;
        if (!code) {
          this.formError = "Please enter verification code";
          return this.snackbar = true;
        }
        this.submitting = true;
        this.$store
          .dispatch("ht_store/auth/login2", {code_token, code})
          .then(() => {
            this.$emit("authSuccess");
          })
          .catch(err => {
            if (err.response.data.detail) {
              this.formError = err.response.data.detail;
              this.$eventHub.$emit(this.$eventTypes.snackNotify, this.formError);
              this.code = "";
            }
          }).finally(() => {
          this.submitting = false;
        });
      }
    }
  };
</script>
<style>
  .form_verification .v-btn {
    /*opacity: 0;*/
    display: block;
    margin-left: 0;
  }

  .color-white {
    color: #fff !important;
  }
  .code_digit, input[data-vv-name="fa_code"] {
    font-size: 26px;
    font-weight: bold;
    text-align: center !important;
    letter-spacing: 10px;
  }
</style>
