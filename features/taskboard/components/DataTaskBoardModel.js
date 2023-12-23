import mx_genericFields from '~/features/generic-fields/mixins/mx_genericFields'

export default {
  mixins: [mx_genericFields],
  props: {
    entity: {
      type: Object
    }
  },
  data() {
    return {
      data: this.entity || null
    }
  },
  mounted() {
    // fetch generic fields card.card
    this.find()
  },
  methods: {
    create(data) {},
    destroy() {},
    find() {},
    update(data) {}
  },
  watch: {
    entity: {
      handler(val) {
        this.data = val
      },
      deep: true
    },
    pk: {
      handler(val) {
        this.find()
      }
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
