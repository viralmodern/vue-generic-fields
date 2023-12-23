export default {
  props: {
    entity: {
      type: Object
    },
    headers: {
      type: Array,
      default: () => {
        return []
      }
    },
    desserts: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  },
  mounted() {
    // if (this.pk && !this.data) this.find()
  },
  methods: {
    create(data) {
      // return this.query('post', this.$$endpoint, data)
    },
    destroy() {
      // return this.query('delete', `${this.$$endpoint}/${this.pk}`)
    },
    find() {
      // return this.query('get', `${this.$$endpoint}/${this.pk}`)
    },
    update(data) {
      // return this.query('patch', `${this.$$endpoint}/${this.pk}`, data)
    }
  },
  watch: {
    entity: {
      handler(val) {
        this.data = val
      },
      deep: true
    }
  },
  render() {
    return this.$scopedSlots.default({
      create: this.create,
      data: this.data,
      destroy: this.destroy,
      loading: this.loading,
      update: this.update
    })
  }
}
