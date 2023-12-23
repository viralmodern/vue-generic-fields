<template>
  <div v-if="!token">
    <v-card class="elevation-12">
      <v-card-text class="pb-0">
        <v-card-title class="layout align-center justify-center pb-0 text-xs-left">
          <div class="text-h4 text-xs-center font-weight-bold">Sign in to {{workspace.name}}</div>
        </v-card-title>
        <v-card-title class="layout pt-0 justify-center">
          <div class="text-h5 text-xs-left">{{workspace.name}}.satproj.io</div>
        </v-card-title>
        <v-form class="px-5" @submit.prevent="login">
          <v-card-title class="layout pa-0 pl-0 justify-start">
            <div class="text-h5 text-xs-left subheading">
              Enter your
              <strong>email address</strong> and
              <strong>password</strong>.
            </div>
          </v-card-title>

          <v-text-field
            label="Email"
            v-model="email"
            required
            solo
            placeholder="Email"
            autofocus
            type="text"
          ></v-text-field>
          <v-text-field
            name="password"
            label="Password"
            v-model="password"
            solo
            type="password"
            required
          ></v-text-field>
          <v-card-actions class="px-4">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :loading="submitting"
              :disabled="submitting || !email || !password"
              block
              @click="login"
            >Login</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-form>
      </v-card-text>

      <v-card-text>
        <v-card-title class="layout pt-0 pl-0 justify-start px-5">
          <div class="text-caption text-xs-center flex">
            <router-link :to="{ name: 'forgot-password'}" style="text-decoration: none;">
              <span>Forgot password,</span>
            </router-link>&nbsp;
            Create a projects?
            <a
              style="text-decoration: none;"
              :href="createCompanyLink"
            >Create new workspace</a>
          </div>
        </v-card-title>
      </v-card-text>
    </v-card>
  </div>
  <TwoFA :token="token" :clear-token="clearToken" @authSuccess="authSuccess" v-else />
</template>

<script>
  import {
    getMainURL,
    getSubdomain,
    getSESSION,
    SESSION, $$STORE_PREFIX
  } from "../../../utils";
import { setAxiosAuthorizationHeader } from "../../../ht_store/modules/auth";
import TwoFA from "./TwoFA";
// import LogoAuth from './LogoAuth';

export default {
  name: "LogIn",
  components: { TwoFA },
  metaInfo: {
    title: "Sign In"
  },
  props: {
    workspace: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    email: "",
    valid: false,
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [v => !!v || "Password is required"],
    token: "",
    formError: "",
    allowSpaces: true,
    submitting: false
  }),
  methods: {
    login() {
      let email = this.email;
      let password = this.password;
      let subdomain = getSubdomain(location.hostname);
      this.formError = "";
      this.submitting = true;
      this.$store
        .dispatch("ht_store/auth/login", { email, password, workspace: subdomain })
        .then(response => {
          this.submitting = false;
          if (this.$store.getters["ht_store/auth/isLoggedIn"]) {
            this.authSuccess();
          } else {
            this.token = response.data.token;
          }
        })
        .catch(err => {
          this.submitting = false;
          if (err.response.data.detail) {
            this.formError = err.response.data.detail;
            this.$eventHub.$emit(this.$eventTypes.snackNotify, this.formError);
          } else {
            this.$eventHub.$emit(
              this.$eventTypes.snackNotify,
              "Server internal error"
            );
          }
        });
      setAxiosAuthorizationHeader(getSESSION(SESSION.TOKEN));
    },
    clearToken() {
      this.token = "";
    },
    authSuccess() {
      let path = this.$route.query["redirect"] || "/dashboard";
      // console.log('OK', path);
      this.$router.replace({ path });
    }
  },
  computed: {
    createCompanyLink() {
      return `${getMainURL()}/create-workspace`;
    }
  }
};
</script>

<style scoped>
</style>
<style>
/* input:-internal-autofill-previewed, input:-internal-autofill-selected, textarea:-internal-autofill-previewed, textarea:-internal-autofill-selected, select:-internal-autofill-previewed, select:-internal-autofill-selected {
     background-color: #fff !important;
     background-image: none !important;
     color: rgb(0, 0, 0) !important;
   }*/
</style>
