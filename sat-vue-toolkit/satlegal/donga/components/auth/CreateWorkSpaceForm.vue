<template>
  <div>
    <v-card class="elevation-12">
      <v-card-text class="pb-0">
        <v-form @submit.prevent="submit">
          <LogoAuth/>
          <h2 class="mt-3">What's your project info?</h2>
          <p class="title-medium">Enter the URL for your workspace</p>
          <v-text-field name="login"
                        class="child-flex"
                        label="Your workspace url"
                        v-model="subdomain"
                        type="text"
                        autofocus
                        solo
                        v-validate="{required: true, max: 21, regex: /[a-zA-Z0-9-]+$/}"
                        data-vv-name="subdomain"
                        :error-messages="errors.collect('subdomain')"
                        suffix=".satproj.io"
                        required></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-text class="pt-0">
        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <v-btn :loading="submitting"
                 :disabled="submitting || !subdomain"
                 block
                 @click="submit" color="primary">Next
            <v-icon right dark>arrow_forward</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card-text>

      <SetSubdomainToken v-if="token && subdomain"
                         :token="token"
                         :subdomain="subdomain"
                         :load="iframeLoaded"/>
    </v-card>
  </div>
</template>

<script>
  import slugify from "slugify";
  import {getSubdomainURL} from "../../../utils";
  import {setSubdomains} from "../../../ht_store/modules/auth";
  import SetSubdomainToken from "./SetSubdomainToken";
  import LogoAuth from './LogoAuth';

  export default {
    name: "CreateWorkSpace",
    components: {SetSubdomainToken, LogoAuth},
    $_veeValidate: {
      validator: 'new'
    },
    data: () => ({
      subdomain: "",
      token: "",
      submitting: false,
      formError: "",
      dictionary: {
        custom: {
          subdomain: {
            required: () => 'Sub domain code can not be empty',
            max: 'The name field need entered 21 characters',
            regex: 'The field name not enter special characters',
            // custom messages
          }
        }
      },

    }),
    mounted() {
      this.$validator.localize('en', this.dictionary)
    },
    props: {
      email: {
        type: String,
        required: true
      },
      code: {
        type: String,
        required: true
      }
    },
    watch: {
      name(value) {
        this.subdomain = slugify(value)
          .toLowerCase()
          .replace(/^-+|-+$/g, "")
          .slice(0, 21);
      }
    },
    methods: {
      iframeLoaded() {
        this.submitting = false;
        let subdomainURL = getSubdomainURL(this.subdomain);


        location.href = `${subdomainURL}/invite-members`;
      },
      submit() {
        let {email, code, subdomain} = this;
        this.formError = [];
        this.snackbar = false;
        if (!this.subdomain) {
          this.snackbar = true;
          this.formError = "Please enter your workspace url";
          return false;
        }
        this.submitting = true;
        this.$http
          .post("/api/users/auth/create-workspace/", {email, code, name: subdomain})
          .then(response => {
            this.subdomain = response.data.workspace;
            this.token = response.data.token;

            setSubdomains(response.data.workspace);
          })
          .catch((error) => {
            this.submitting = false;
            if (error.response.status === 400) {
              if (error.response.data["name"]) {
                this.snackbar = true;
                this.formError = error.response.data["name"].toString();
                this.$eventHub.$emit(this.$eventTypes.snackNotify, error.response.data["name"].toString())
              } else {
                this.$eventHub.$emit(this.$eventTypes.snackNotify, "")
                // location.reload(); // TODO: ...
              }
            }
          });
      }
    }
  }
</script>

<style scoped>
  .flex_label {
    /*border: solid 1px red;*/
    display: flex;
    justify-content: space-between;
    align-items: center;

  }

  .flex_label ._title {
    flex: 1;
  }

  .flex_label ._icon {
    font-family: 'Roboto', sans-serif !important;
    background: #4caf50;
    padding: 4px 10px 2px 10px;
    margin-left: 0px;
    color: #fff;
    text-align: center;
    font-size: 16px;
  }
</style>
