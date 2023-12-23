<template>
  <LogIn v-if="isSubdomain"
         :workspace="workspace"/>
  <div v-else>
    <v-card>
      <v-card-text class="pb-0">
        <LogoAuth/>
        <v-form ref="form" @submit.prevent="submit" lazy-validation class="mt-3">
          <v-card-title class="layout align-center justify-center py-0">
            <div class="text-h4 font-weight-bold text-xs-center">Sign in to your workspace</div>
          </v-card-title>
          <v-card-title class="layout justify-center">
            <div class="title">Enter your workspace’s <strong> URL.</strong></div>
          </v-card-title>
          <v-text-field name="login"
                        class="child-flex"
                        label="Your workspace url"
                        type="text"
                        autofocus
                        solo
                        suffix=".satproj.io"
                        v-model="subdomain">
          </v-text-field>

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary"
               @click="submit"
               :loading="submitting"
               :disabled="submitting || !subdomain"
               block
               :class="{ red: !valid, green: valid }">
          Continue
          <v-icon right dark>arrow_forward</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-card-text class="pt-0">
        <v-card-title class="layout justify-center">
          <div class="text-body-1">
            Need to get your group started?
            <router-link :to="{ name: 'createworkspace' }"
            >Create a new workspace
            </router-link>
          </div>
        </v-card-title>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>
  import LogIn from '../../components/auth/Login'
  import LogoAuth from '../../components/auth/LogoAuth';
  import {setSubdomains} from "../../../ht_store/modules/auth";
  import {getSubdomain, getSubdomainURL, isValidSubdomain} from "../../../utils";

  export default {
    name: "SignInWorkSpace",
    components: {LogIn, LogoAuth},
    metaInfo: {
      title: "Sign In"
    },
    data() {
      let _subdomain = getSubdomain(location.hostname);
      return {
        showLoginForm: false,
        subdomain: _subdomain,
        isSubdomain: isValidSubdomain(_subdomain),
        subdomainRules: [
          (v) => !!v || 'Name is required',
          (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
        ],
        submitting: false,
        formError: "",
        valid: false,

        workspace: {}
      }
    },
    created() {
      if (this.subdomain) {
        this.getWorkspace(this.subdomain);
      }
    },
    methods: {
      getWorkspace(subdomain) {
        this.submitting = true;
        this.formError = "";
        this.$http.get(`/api/workspaces/${subdomain}/check/`)
          .then(response => {
            if (response.data.name) {
              if (this.isSubdomain) {
                this.workspace = response.data;
                this.showLoginForm = true;
              } else {
                setSubdomains(this.subdomain);
                location.href = getSubdomainURL(this.subdomain);
              }
            } else {
              this.$eventHub.$emit(this.$eventTypes.snackNotify, "Couldn't find your workspace");
            }
          })
          .catch(error => {
            // this.submitting = false;
            throw error
          })
          .finally(() => {
            this.submitting = false;
          });
      },
      submit() {
        // return alert(1);
        if(!this.subdomain) {
          this.$eventHub.$emit(this.$eventTypes.snackNotify, "Please enter your workspace");
        }else {
          this.getWorkspace(this.subdomain);
        }
      }
    }
  }
</script>

<style>
  .flex_label {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flex_label ._title {
    flex: 1;
  }

  .flex_label ._icon {

  }

  .title-small {
  }

  .v-text-field__suffix {
    font-weight: bold !important;
  }
</style>
