<template>
  <div>
    <v-alert type="error" v-show="errorServer" outlined>{{
      errorServer
    }}</v-alert>
    <SetPassword :quick-token="quickToken" v-show="needSetPass" />
    <div v-if="!needSetPass && passwordSetted">
      <SetSubdomainToken
        :token="quickToken"
        :subdomain="subdomain"
        :load="iframeLoad"
      />
    </div>
  </div>
</template>

<script>
import SetPassword from '@/components/auth/SetPassword.vue'
import SetSubdomainToken from '../../set-subdomain-token'
import { getSubdomainURL } from '@/sat-vue-toolkit/satlegal/utils'
import urlMixin from '@/mixins/mx_url'

export default {
  mixins: [urlMixin],
  components: { SetPassword, SetSubdomainToken },
  head() {
    return {
      title: 'Join Invitation',
    }
  },
  data() {
    return {
      errorServer: '',
      needSetPass: false,
      quickToken: '',
      passwordSetted: false,
      subdomain: '',
    }
  },
  async created() {
    const key = this.$route.params.key
    try {
      const result = await this.$axios.post(
        `/api/users/auth/invitations/join/${key}/`
      )
      this.needSetPass = result.data['need_set_pass']
      this.subdomain = result.data['workspace']
      this.quickToken = result.data['token']
      if (this.needSetPass) {
        this.$eventHub.$on('password-set', () => {
          this.needSetPass = false
          this.passwordSetted = true
        })
      }
      this.passwordSetted = true
    } catch (error) {
      const status = error.response.status
      if (status === 404 || status === 400) {
        this.errorServer = 'Invalid invite link'
      } else {
        this.errorServer = 'Something wrong, please try again.'
      }
      this.errorServer = 'Invalid invite link'
    }
  },
  methods: {
    iframeLoad() {
      let subdomainURL = getSubdomainURL(this.subdomain)
      location.href = `${subdomainURL}${this.defaultPage}`
    },
  },
}
</script>
