<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card min-height="350px">
        <v-card-text>
          <template v-if="isSignUp">
            <AuthODTSignUp
              type="post"
              v-model="dialog"
              :end-point="endPointSignUp"
              :attributes="attributesSignUp"
              @submitted="onSubmitted"
            >
              <p
                slot="footer"
                @click="handleFormAuth({ isSignIn: true })"
                class="text-caption primary--text ma-0 cursor--pointer"
              >
                {{ `Sign In` }}
              </p>
            </AuthODTSignUp>
          </template>
          <template v-else-if="isSignIn">
            <AuthODTLogin
              type="post"
              v-model="dialog"
              @submitted="onSubmitted"
              :attributes="attributesSignIn"
              :end-point="endPointSignIn"
            >
              <p
                slot="footer"
                @click="handleFormAuth({ isSignUp: true })"
                class="text-caption primary--text ma-0 cursor--pointer"
              >
                {{ `Create Account` }}
              </p>
            </AuthODTLogin>
          </template>
          <template v-else-if="isAccountDetail">
            <AuthODTAccountDetail
              type="patch"
              v-model="dialog"
              @submitted="updateProfile"
              :attributes="attributesAccountDetail"
              :end-point="endPointAccountDetail"
            />
          </template>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import AuthODTLogin from '~/features/odt/AuthODTLogin'
import AuthODTSignUp from '~/features/odt/AuthODTSignUp'
import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
import AuthODTAccountDetail from '~/features/odt/AuthODTAccountDetail'

export default {
  name: 'AuthODTModal',
  components: { AuthODTAccountDetail, AuthODTSignUp, AuthODTLogin },
  props: {
    endPointSignIn: {
      type: String,
      default: () => 'https://satchaos.demo.satproj.io/api/users/auth/login/',
    },
    endPointSignUp: {
      type: String,
      default: () =>
        'https://satchaos.demo.satproj.io/api/users/auth/registration/',
    },
    endPointAccountDetail: {
      type: String,
      default: () => 'https://satchaos.demo.satproj.io/api/users/me/',
    },
  },
  data: () => ({
    dialog: false,
    // dialog: true,
    isSignUp: false,
    isSignIn: false,
    isAccountDetail: false,
    togglePassword: false,
  }),
  mounted() {
    this.$eventHub.$on('handleFormAuth', this.handleFormAuth)
  },
  computed: {
    attributesSignIn() {
      return [
        {
          name: 'email',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          multiple: false,
          required: true,
        }, // N/A
        {
          name: 'password',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          multiple: false,
          required: true,
          vBind: {
            type: this.togglePassword ? 'text' : 'password',
            'append-icon': this.togglePassword ? 'mdi-eye-off' : 'mdi-eye',
          },
          vOn: { 'click:append': this.clickAppend.bind(this, 'password') },
        }, // N/A
      ]
    },
    attributesAccountDetail() {
      let first_name = this.accountDetail.first_name
      let last_name = this.accountDetail.last_name
      let avatar = this.accountDetail.avatar
      return [
        {
          name: 'avatar',
          type: ATTRIBUTE_FIELDS.PICTURE.TYPE,
          isFileAttachment: true,
          width: 250,
          list: [],
          groupBy: false,
          multiple: false,
          required: true,
          value: avatar,
        }, // N/A
        {
          name: 'first_name',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          multiple: false,
          required: true,
          value: first_name,
        }, // N/A

        {
          name: 'last_name',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          multiple: false,
          required: true,
          value: last_name,
        }, // N/A
      ]
    },
    attributesSignUp() {
      return [
        {
          name: 'avatar',
          type: ATTRIBUTE_FIELDS.PICTURE.TYPE,
          isFileAttachment: true,
          width: 250,
          list: [],
          groupBy: false,
          multiple: false,
          required: true,
        },
        {
          name: 'email',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          multiple: false,
          required: true,
        }, // N/A
        {
          label: 'Password',
          name: 'password1',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          multiple: false,
          required: true,
          vBind: {
            type: this.togglePassword ? 'text' : 'password',
            'append-icon': this.togglePassword ? 'mdi-eye-off' : 'mdi-eye',
          },
          vOn: { 'click:append': this.clickAppend.bind(this, 'password1') },
        }, // N/A
        {
          name: 'password2',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          multiple: false,
          required: true,
          confirmed: true,
          confirmedField: 'password1',
          vBind: { class: 'valpha-init' },
        }, // N/A
      ]
    },
    accountDetail() {
      try {
        return this.$store.getters['authODT/user']
      } catch (e) {
        return {}
      }
    },
  },
  methods: {
    handleFormAuth({ isSignUp, isSignIn, isAccountDetail }) {
      this.dialog = true
      this.isSignUp = !!isSignUp
      this.isSignIn = !!isSignIn
      this.isAccountDetail = !!isAccountDetail
    },
    clickAppend(attributeName) {
      this.togglePassword = !this.togglePassword
    },
    onSubmitted(data) {
      this.$store.commit('authODT/setToken', data.token)
      this.$store.commit('authODT/updateUser', data.user)
    },
    updateProfile(user) {
      this.$store.commit('authODT/updateUser', user)
    },
  },
  watch: {
    dialog: {
      immediate: true,
      handler(v) {
        if (!v) {
          this.isSignUp = false
        }
      },
    },
  },
}
</script>

<style scoped></style>
