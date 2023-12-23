import difference from 'lodash/difference'
export default {
  props: {
    endPoint: {
      type: String
    },
    endPointList: {
      type: String
    },

    cellPk: {
      type: [String, Number],
      default: ''
    },
    itemValue: {
      type: [String, Number],
      default: ''
    },
    itemText: {
      type: [String, Number],
      default: ''
    },
    itemAvatar: {
      type: [String, Number],
      default: () => ''
    },
    returnObject: {
      type: Boolean,
      default: () => true
    },
    items: {
      type: [Array, Object],
      default: () => []
    },
    value: {},
    attributeName: {
      type: [String]
    },
    innerScope: {
      type: Boolean,
      default: () => false
    },
    isOwnerRow: {
      type: Boolean,
      default: () => false
    },
  },
  data() {
    return {
      val: null,
      error: {},
      submitting: false,
    }
  },
  computed: {
    convertValToValuesObject() {
      // todo return object value
      let  itemValue = this.itemValue;
      if(this.returnObject) return this.val.map(v => {
        let item;
        item = this.items.filter(t => t[itemValue] == v[itemValue])[0]
        return item
      })
      // todo return flat value
      return this.val.map(v => {
        // todo if typeof v is object
        let isObject = false, item;
        isObject = typeof v === "object"
        if(isObject) {
          item = this.items.filter(t => t[itemValue] == v[itemValue])[0]
        }else {
          item = this.items.filter(t => t[itemValue] == v)[0]
        }
        return item
      })
    },
    mth() {
      return this.innerScope ? 'patch' : 'post'
    }
  },
  mounted() {
    let vm = this;
    vm.$eventHub.$on(`choose-cell-assignMembers-${vm.cellPk}`, async function (data) {
      if (vm.cellPk === data.k) {
        try {
          let current_val = vm.val
          let new_val = data.value
          let val = difference(new_val, current_val);
          if(!val.length) return
          if(vm.returnObject) {
            val = val.map(pk => ({
              user: pk
            }))
          }

          let res = await vm.$api[vm.mth](vm.endPoint, {[vm.attributeName]: val})
          if(vm.innerScope) {
            let mbs = res['data'][vm.attributeName]
            vm.val = [...mbs]
          }else {
            vm.val = res['data']
          }

        } catch (e) {
          console.log(e.message)
        }
      }
    })
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(v) {
        try {
          this.val = v
          // this.val = v.map(mb => mb.user)
        }catch (e) {
        }
      }
    }
  },
  methods: {
    getAvatar(mb) {
      try {
        return mb[this.itemAvatar] || mb['avatar']
      }catch (e) {
        return false
      }
    },
    change(e) {
      if(!this.isOwnerRow) return
      this.$eventHub.$emit('menu-cell-assignMembers', {
        e,
        k: this.cellPk,
        val: this.val,
        list: this.items,
        itemText: this.itemText,
        itemValue: this.itemValue,
        endPointList: this.endPointList
      })
    },

    async delMember(mb) {
      try {
        if(this.innerScope) {
          console.log('delMember innerScope', mb)
          let val = [...this.convertValToValuesObject].filter(user => user[this.itemValue] !== mb[this.itemValue])
          if(this.returnObject) {
            val = val.map(u => ({
              user: u[this.itemValue]
            }))
          }else {
            val = val.map(u => u[this.itemValue])
          }
          let res = await this.$api[this.mth](`${this.endPoint}`, {[this.attributeName]: val})
          this.val = res['data'][this.attributeName]
        }else {
          console.log('delMember', mb)
          let val = [...this.convertValToValuesObject].filter(user => user[this.itemValue] !== mb[this.itemValue])
          await this.$api.delete(`${this.endPoint}${mb[this.itemValue]}`)
          this.val = val
        }

      } catch (e) {

      }
    }
  },
  filters: {

  },
  render() {
    console.log('this.convertValToValuesObject', this.convertValToValuesObject)
    return this.$scopedSlots.default({
      data: this.convertValToValuesObject,
      items: this.items,
      change: this.change,
      delMember: this.delMember,
      submitting: this.submitting,
      // submit: this.submit,
      error: this.error,
    })
  }
}
