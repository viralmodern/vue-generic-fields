<template>
  <div>
    <v-card class="elevation-12" v-if="step === steps.ENTER_EMAIL">
      <v-card-text>
        <LogoAuth/>
        <v-form class="mt-3" lazy-validation v-model="valid" @submit.prevent="submit">
          <v-card-title class="layout align-center justify-center py-0">
            <div class="text-h4 font-weight-bold text-xs-center">Create New Workspace</div>
          </v-card-title>
          <v-card-title class="layout justify-start pl-0">
            <div class="subheading">
              Your <strong>email address</strong>.
            </div>
          </v-card-title>
          <v-text-field
            name="email"
            label="Enter your email address"
            v-model="email"
            :rules="emailRules"
            type="text"
            autofocus
            hide-details
            required
            solo
          >
          </v-text-field>

          <v-card-actions class="pt-4">
            <v-spacer></v-spacer>
            <v-btn @click="submit"
                   :disabled="!valid || submitting || !email"
                   :loading="submitting"
                   block
                   color="primary">Next
              <v-icon right dark>arrow_forward</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>

        </v-form>
        <div class="thumb-workspace-intro">
          <img src="https://a.slack-edge.com/73cd3/img/get_started/create_team@2x.png"
               alt=""
          />
        </div>
      </v-card-text>
    </v-card>
    <CreateProjectVerifyCode :email="email"
                             @nextStep="nextStep"
                             v-if="steps.VERIFY_CODE === step"/>
    <CreateWorkSpace :email="email"
                     :code="code"
                     @nextStep="nextStep"
                     v-else-if="steps.ENTER_COMPANY === step"/>
  </div>
</template>

<script>
  import CreateProjectVerifyCode from '../../components/auth/CreateProjectVerifyCode';
  import CreateWorkSpace from '../../components/auth/CreateWorkSpaceForm';
  import LogoAuth from '../../components/auth/LogoAuth';
  import _ from 'lodash';

  const STEPS = {
    ENTER_EMAIL: "ENTER_EMAIL",
    VERIFY_CODE: "VERIFY_CODE",
    ENTER_COMPANY: "ENTER_COMPANY"
  };
  export default {
    name: "CreateProject",
    components: {CreateProjectVerifyCode, CreateWorkSpace, LogoAuth},
    metaInfo: {
      title: "Create Workspace"
    },
    data() {
      return {
        email: "",
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        valid: false,
        submitting: false,
        step: STEPS.ENTER_EMAIL,
        // step: STEPS.ENTER_COMPANY,
        code: ""
      };
    },
    computed: {
      steps() {
        return STEPS;
      }
    },
    methods: {
      nextStep(data) {
        let step = this.step;
        switch (step) {
          case STEPS.ENTER_EMAIL:
            step = STEPS.VERIFY_CODE;
            break;
          case STEPS.VERIFY_CODE:
            step = STEPS.ENTER_COMPANY;
            break;
        }
        this.step = step;
        if (data) {
          _.assign(this.$data, data);
        }
      },
      submit() {
        let email = this.email;
        this.submitting = true;
        this.$http
          .post("/api/users/auth/signup/", {email})
          .then(() => {
            this.submitting = false;
            this.step = STEPS.VERIFY_CODE
          })
          .catch(() => {
            this.submitting = false;
          });
      }
    },

  };
</script>

<style scoped>
  .thumb-workspace-intro {
    margin-top: 15px;
  }

  .thumb-workspace-intro img {
    display: block;
    max-width: 100%;
  }

  .title-small {
    font-size: 12px;
  }
</style>
