export default {
  async mounted() {
    if (this.token) {
      await this.$api.setToken(`JWT ${this.token}`)
      this.$$fetchUser()
    }
  },
  computed: {
    authenticated() {
      return this.$store.getters['authODT/authenticated']
    },
    token() {
      return this.$store.getters['authODT/token']
    },
  },
  watch: {
    token: {
      immediate: true,
      handler(token) {
        this.$api.setToken(`JWT ${token}`)
        this.$api.defaults.headers.common['Authorization'] = `JWT ${token}`
      },
    },
  },
  methods: {
    async $$fetchUser() {
      try {
        let res = await this.$api.get(`/api/users/me/`)
        this.$store.commit('authODT/updateUser', res['data'])
      } catch (e) {
      } finally {
      }
    },
  },
}
