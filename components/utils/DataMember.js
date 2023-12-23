import _ from 'lodash'
export default {
  props: {
    pk: {
      type: [Number, String]
    }
  },
  data() {
    return {
      data: null,
      loading: false
    }
  },
  mounted() {
    // if (this.pk && !this.data) this.find()
  },
  methods: {
    async find() {
      // return this.query('get', `${this.$$endpoint}/${this.pk}`)
      // return this.$store.get
      let user = this.$store.getters['workspace/findMemberByID'](this.pk)
      if (user && _.keys(user).length) {
        this.data = user
      } else {
        let rs = await this.$store.dispatch('workspace/fetchMemberDetail', {
          userID: this.pk
        })
        this.data = rs.user
      }
    }
  },
  watch: {
    pk: {
      handler(val) {
        // this.data = val
        this.find()
      },
      deep: true,
      immediate: true
    }
  },
  render() {
    return this.$scopedSlots.default({
      data: this.data,
      loading: this.loading
    })
  }
}
