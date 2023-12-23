import mx_curd from '~/features/generic-fields/mixins/mx_curd'
import _ from 'lodash'
import { ALL_CAF } from '~/mock/fields'

export default {
  mixins: [mx_curd],
  props: {
    entity: {
      type: Object
    },
    matterId: {
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
    // if (this.pk && !this.data) this.find()
    this.find()
  },
  methods: {
    create(data) {
      return this.query('post', this.$$endpoint, data)
    },
    destroy() {
      // return this.query('delete', `${this.$$endpoint}/${this.pk}`)
    },
    find() {
      return this.query('get', `${this.$$endpoint}`)
    },
    update(data) {
      return this.query('patch', `${this.$$endpoint}`, data)
    },
    load() {
      return this.query('get', this.$$endpoint, { params: this.filter })
    },
    async createCafByID() {
      try {
        let currentCaf = { ...this.listCaf }
        currentCaf[this.matterId] = ALL_CAF
        await this.$axios.patch(this.$$endpoint, {
          settings: { options: { cafs: currentCaf } }
        })
        await this.find()
      } catch (e) {
        console.log('createCafByID', e.message)
      }
    },
    async updateCafByMatter({ cafId, data }) {
      console.log('updateCafByMatter', { cafId, data }, this.listCafById)
      try {
        let _data = {}
        let currentAllCaf = { ...this.listCaf }
        let currentCaf = currentAllCaf[this.matterId]
        let _index = currentCaf.findIndex((caf) => caf.id === cafId)
        if (_index >= 0) {
          currentAllCaf[this.matterId][_index] = _.assign(
            {},
            currentAllCaf[this.matterId][_index],
            data
          )
          _data = { settings: { options: { cafs: currentAllCaf } } }
          // this.update(_data)
          await this.$axios.patch(this.$$endpoint, _data)
          await this.find()
        }
      } catch (e) {
        console.log('updateCafByMatter', e.message)
      }
    }
  },
  computed: {
    listCaf() {
      try {
        return this.data.settings.options.cafs
      } catch (e) {
        return {}
      }
    },
    listCafById() {
      try {
        return this.data.settings.options.cafs[this.matterId] || []
      } catch (e) {
        return []
      }
    }
  },
  watch: {
    entity: {
      handler(val, oldVal) {
        this.data = val
        // this.find()
      },
      deep: true,
      immediate: true
    },
    matterId: {
      async handler(val, oldVal) {
        // todo: create caf
        try {
          if (val) {
            let rs = await this.$axios.get(this.$$endpoint)
            let cafs = rs.data.settings.options.cafs[val]
            console.error(
              'this.listCafById',
              rs.data.settings.options.cafs,
              val
            )
            if (!cafs || !cafs.length) {
              await this.createCafByID()
            }
            console.log(rs)
          }
        } catch (e) {}
        /*if (val && !this.listCafById.length) {
          console.error('listCafById', this.listCafById, this.listCaf)
          await this.createCafByID()
        }*/
      },
      deep: true,
      immediate: true
    },

    filter: {
      immediate: true,
      handler(val, oldVal) {
        if (!_.isEqual(val, oldVal)) {
          this.find()
        }
      }
    }
  },
  render() {
    return this.$scopedSlots.default({
      load: this.load,
      create: this.create,
      // data: this.data,
      data: this.listCafById,
      error: this.error,
      destroy: this.destroy,
      loading: this.loading,
      update: this.updateCafByMatter
    })
  }
}
