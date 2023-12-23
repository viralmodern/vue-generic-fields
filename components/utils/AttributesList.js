import _ from 'lodash'
export default {
  props: {
    endpoint: {
      type: [String]
    },
    entity: {
      type: Object
    },
    toModel: {
      type: [Number, String],
      default: () => 'card.card'
    },
    filter: {
      type: Object
    }
  },
  data() {
    return {
      list: [],
      error: null
    }
  },
  mounted() {},
  computed: {
    items: {
      get() {
        return this.$store.getters['genericAttributes/attributes'].filter(
          (attr) => attr.to_model === this.toModel
        )
      },
      set(val) {}
    },
    loading: {
      get() {
        return this.$store.getters['genericAttributes/pending']
      }
    }
  },
  methods: {
    create(data) {},
    destroy() {},
    find() {},
    update(data) {},
    async load() {
      if (this.loading) return
      await this.$store.dispatch('genericAttributes/fetchAttributes')
    }
  },
  watch: {
    toModel: {
      handler(val) {
        if (val) {
          this.load()
        }
      },
      deep: true,
      immediate: true
    },
    filter: {
      immediate: true,
      handler: 'load'
    }
  },
  render() {
    return this.$scopedSlots.default({
      data: this.items,
      error: this.error,
      loading: this.loading
    })
  }
}
