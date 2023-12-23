<template>
  <div class="all-wrapper menu-side with-pattern">
    <SetSubdomainToken
      :token="token"
      :subdomain="subdomain"
      :load="iframeLoaded"
    />
  </div>
</template>

<script>
import SetSubdomainToken from '../../pages/auth/set-subdomain-token'
import { getSubdomainURL } from '@/sat-vue-toolkit/satlegal/utils'
import urlMixin from '@/mixins/mx_url'

export default {
  name: 'JoinInvite',
  mixins: [urlMixin],
  layout: 'auth',
  components: { SetSubdomainToken },
  metaInfo: {
    title: 'Create account',
  },
  created() {
    this.$axios
      .post(`/api/users/auth/invitations/join/${this.$route.params.key}/`)
      .then((response) => {
        this.token = response.data.token
        this.subdomain = response.data.workspace
      })
      .catch((error) => {
        this.error = true
      })
  },
  data() {
    return {
      error: '',
      token: '',
      subdomain: '',
    }
  },
  methods: {
    iframeLoaded() {
      let subdomainURL = getSubdomainURL(this.subdomain)
      location.href = `${subdomainURL}${this.defaultPage}`
    },
  },
}
</script>

<style scoped></style>
