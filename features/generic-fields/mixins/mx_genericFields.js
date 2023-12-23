import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import { getAttributeByProp } from '~/features/generic-fields/fields_config'
const base_url = '/api/workspace/attributes/'
export default {
  props: {},
  data() {
    return {
      submitting: false,
      attributes: []
    }
  },
  filters: {},
  computed: {
    ...mapGetters({
      stateAttributes: 'genericAttributes/attributes',
      pending: 'genericAttributes/pending'
    })
  },
  async created() {
    await this.$$getAttributes()
  },
  methods: {
    ...mapActions({
      fetchAttributes: 'genericAttributes/fetchAttributes'
    }),
    async $$getAttributes() {
      let _self = this
      try {
        let results = await this.$axios.$get(base_url)
        // console.log('$$getAttributes', results)
        _self.attributes = results
      } catch (e) {
        // console.log('$$getAttributes', e.response)
      }
    },

    async $$updateAttribute({ attributeID, data }) {
      // return error
    },
    async $$delAttribute({ attributeID }) {
      if (
        !window.confirm(
          'You will remove this attribute from all matters and clean all values?'
        )
      )
        return
      await this.$axios.delete(`${base_url}${attributeID}/`)
      await this.$$getAttributes()
    },
    async $$createAttribute({ data }) {
      this.submitting = true
      this.$axios
        .post(base_url, data)
        .then((rs) => {
          this.$eventHub.$emit('alert-curd', {
            text: this.name + ' attribute has been created',
            type: 'success'
          })
          this.$$getAttributes()
        })
        .catch((err) => {
          this.$eventHub.$emit('alert-curd', {
            text: 'Create New Attribute Error',
            type: 'error'
          })
        })
        .finally(() => {
          this.submitting = false
        })
    },
    $$getAttributesByToModel(to_model) {
      return _.filter(this.attributes, (attr) => attr.to_model === to_model)
    },
    $$getAttributesExitsGroupBy(to_model = 'card.card') {
      return _.filter(
        this.attributes,
        (attr) =>
          attr.to_model === to_model &&
          getAttributeByProp({ type: attr.type, prop: 'has_group' })
      )
    }
  }
}
