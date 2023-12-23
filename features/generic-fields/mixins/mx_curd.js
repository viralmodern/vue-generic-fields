export default {
  props: {
    $$baseUrl: {
      type: String,
      // The JSONPlaceholder API is a fake API
      // basically a Lorem Ipsum JSON API.
      default: `https://jsonplaceholder.typicode.com`
    },
    $$endpoint: {
      type: String,
      required: true
    },
    filter: {
      type: Object
    }
  },
  data() {
    return {
      // api: axios.create({ baseURL: this.$$baseUrl }),
      api: this.$axios,
      data: null,
      error: null,
      loading: false
    }
  },
  methods: {
    // The `query` method will handle
    // different query types for us.
    async query(type, ...params) {
      // If we're currently loading content
      // we don't submit an additional request.
      if (this.loading) return

      this.loading = true
      try {
        const response = await this.api[type](...params)
        // const response = await this.$axios[type](...params)
        this.data = response.data
        this.error = null
        this.$emit(`success`, response)
      } catch (error) {
        // this.data = null
        this.error = error.response
        this.$emit(`error`, error)
      }
      this.loading = false
    }
  }
}
