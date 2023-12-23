import mx_curd from '~/features/generic-fields/mixins/mx_curd'
import _ from 'lodash'

export default {
  mixins: [mx_curd],
  props: {
    entity: {
      type: Object
    },
    pk: {
      type: [Number, String]
    }
  },
  data() {
    return {
      data: this.entity || null
    }
  },
  mounted() {
    // nếu có pk và chưa có dữ liệu, chúng ta gọi fetch dữ liệu
    if (this.pk && !this.data) {
      this.find()
    }
    if (!this.pk) {
      this.load()
    }
  },
  computed: {
    urlEndPoint() {
      if (this.pk) {
        return `${this.$$endpoint}/${this.pk}`
      }
      return `${this.$$endpoint}`
    }
  },
  methods: {
    create(data) {
      return this.query('post', this.$$endpoint, data)
    },
    destroy() {
      return this.query('delete', this.urlEndPoint)
    },
    find() {
      return this.query('get', `${this.urlEndPoint}`)
    },
    update(data) {
      return this.query('patch', `${this.urlEndPoint}`, data)
    },
    load() {
      return this.query('get', this.$$endpoint, { params: this.filter })
    }
  },
  watch: {
    entity: {
      handler(val, oldVal) {
        if (this.pk) {
          this.data = val
          this.find()
        }
      },
      deep: true,
      immediate: true
    },
    pk: {
      handler(val) {
        if (val) {
          this.find()
        }
      },
      deep: true,
      immediate: true
    },
    filter: {
      immediate: true,
      handler(val, oldVal) {
        if (!_.isEqual(val, oldVal)) {
          this.load()
        }
      }
    }
  },
  render() {
    return this.$scopedSlots.default({
      load: this.load,
      create: this.create,
      data: this.data,
      error: this.error,
      destroy: this.destroy,
      loading: this.loading,
      update: this.update
    })
  }
}
