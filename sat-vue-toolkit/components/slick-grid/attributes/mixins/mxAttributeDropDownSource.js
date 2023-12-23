import { BUS_SOURCE } from "@/sat-vue-toolkit/components/slick-grid/configs/attribute"
export default {
  data () {
    return {
      uiShowMenu: false,
      activatorId: "",

      val: "",
      endPointList: "",
      endPoint: "",
      $$execute: null,
      attribute: {},
    }
  },
  mounted () {
    try {
      const vm = this
      this.$eventHub.$on(BUS_SOURCE.MENU, function (data) {
        try {
          let k = data.k
          vm.show(`#${k}`)
          vm.endPoint = data.endPoint
          vm.val = data.val
          vm.endPointList = data.endPointList
          vm.attribute = data.attribute
          vm.$$execute = data.$$execute
          // vm.show(data.e)
        } catch (e) {
          console.error(e.message)
        }
      })
    } catch (e) {
    }
  },
  methods: {
    show (id) {
      try {
        this.activatorId = id

      } catch (e) {
        console.log(e.message)
      }
    }
  }
}
