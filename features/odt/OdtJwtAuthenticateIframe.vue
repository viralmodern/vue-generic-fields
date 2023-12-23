<template>
  <v-card flat class="odt-iframe mx-auto" :loading="loading">
    <iframe
      id="odt-jwt-login"
      class="iframe-auth"
      @load="onLoaded"
      :src="domainJwt"
      frameborder="0"
    ></iframe>
  </v-card>
</template>

<script>
import { $$onMessageResponse } from '@/sat-vue-toolkit/functions'
// const domainJwtDev = 'http://localhost:36945/'
const domainJwtDev = 'http://odt.local:3000/'
const domainJwtProd = process.env.VUE_APP_JWT
let isDev = process.env.NODE_ENV === 'development'
let domainJwt = isDev ? domainJwtDev : domainJwtProd
// domainJwt = domainJwtProd
export default {
  name: 'OdtJwtAuthenticateIframe',
  props: {
    value: {},
  },
  data() {
    return {
      domainJwt,
      loading: true,
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.domainJwt = domainJwt
      },
    },
  },
  mounted() {
    $$onMessageResponse(this.onMessageResponse)
  },
  methods: {
    onLoaded() {
      this.loading = false
    },
    onMessageResponse(message) {
      console.log(message.data.response.token)
      let type = message.data.type
      if (type === 'jwt:login:compiled') {
        let token = message.data.response.token
        this.$store.dispatch('authODT/setToken', token)
        this.$emit('input', false)
        this.domainJwt = ''
      } else if (type === 'jwt:logout:compiled') {
        this.$store.dispatch('authODT/signOut')
        this.$emit('input', false)
        this.domainJwt = ''
      }
    },
  },
}
</script>

<style scoped lang="scss">
.odt-iframe {
  max-width: 800px;
  width: 100%;

  .iframe-auth {
    display: block;
    width: 100%;
    height: 400px;
  }
}
</style>
