<template>
  <v-row class="fill-height">
    <v-col class="justify-center d-flex" cols="12" xl="4" lg="4" md="4">
      <v-container class="align-self-center ml-2" fluid>
        <EnterEmail
          v-if="step === steps.ENTER_EMAIL"
          @nextStep="nextStep"
        />
        <CreateProjectVerifyCode
          v-if="step === steps.VERIFY_CODE"
          :email="email"
          @nextStep="nextStep"
        />
        <CreateWorkSpace
          v-else-if="step === steps.ENTER_COMPANY"
          :email="email"
          :code="code"
          @nextStep="nextStep"
        />
      </v-container>
    </v-col>
    <v-col md="8" class="background hidden-sm-only hidden-xs-only">
      <div class="d-flex justify-center align-center fill-height">
        <img :src="images[step]" alt="a" class="w-full fill-height"/>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import _ from 'lodash'
import CreateProjectVerifyCode from '../../components/auth/CreateProjectVerifyCode'
import CreateWorkSpace from '../../components/auth/CreateWorkSpaceForm'
import EnterEmail from '../../components/auth/EnterEmail'
import SvgEnterEmail from '../../assets/img/undraw_emails_6uqr.svg'
import SvgEnterCode from '../../assets/img/undraw_authentication_fsn5.svg'
import SvgEnterWorkspaceName from '../../assets/img/undraw_domain_names_rdql.svg'

const STEPS = {
  ENTER_EMAIL: 'ENTER_EMAIL',
  VERIFY_CODE: 'VERIFY_CODE',
  ENTER_COMPANY: 'ENTER_COMPANY'
}

export default {
  name: 'CreateWorkspace',
  layout: 'auth',
  components: { CreateProjectVerifyCode, CreateWorkSpace, EnterEmail },
  head () {
    return {
      title: 'Create a Workspace'
    }
  },
  data () {
    return {
      email: '',
      code: '',
      step: STEPS.ENTER_EMAIL,
      images: {
        'ENTER_EMAIL': SvgEnterEmail,
        'VERIFY_CODE': SvgEnterCode,
        'ENTER_COMPANY': SvgEnterWorkspaceName
      }
    }
  },
  computed: {
    steps () {
      return STEPS
    },
  },
  methods: {
    nextStep (data) {
      let step = this.step
      switch (step) {
        case STEPS.ENTER_EMAIL:
          step = STEPS.VERIFY_CODE
          break
        case STEPS.VERIFY_CODE:
          step = STEPS.ENTER_COMPANY
          break
      }
      this.step = step
      if (data) {
        _.assign(this.$data, data)
      }
    }
  }
}
</script>

<style scoped>
  .background {
    -webkit-box-shadow: -20px 7px 30px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -20px 7px 30px 0px rgba(0, 0, 0, 0.75);
    box-shadow: -20px 7px 30px -27px rgba(0, 0, 0, 0.75);
    background: #bbdff0;
  }
</style>
