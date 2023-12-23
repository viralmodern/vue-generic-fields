<template>
  <iframe
    style="width: 0; height: 0; border: 0; border: none;"
    :src="iframeSrc"
    v-if="subdomain && token"
    @load="load"
  ></iframe>
</template>

<script>
import { getSESSION, SESSION, setSESSION } from '../../utils/index'
import { getSubdomainURL } from '@/sat-vue-toolkit/satlegal/utils'

export default {
  name: 'SetSubdomainToken',
  layout: 'auth',
  props: {
    subdomain: {
      type: String,
      default: '',
    },
    token: {
      type: String,
      default: '',
    },
    load: {
      type: Function,
      default: () => null,
    },
  },
  created() {
    if (this.$route.query.token && !getSESSION(SESSION.TOKEN)) {
      setSESSION(SESSION.TOKEN, this.$route.query.token)
    }
  },
  computed: {
    iframeSrc() {
      let subdomainURL = getSubdomainURL(this.subdomain)
      return `${subdomainURL}/auth/set-subdomain-token?token=${this.token}`
    },
  },
}
</script>
