import Vue from 'vue'
// import { mapGetters } from 'vuex'
Vue.mixin({
  props: {
    /*$$productName: {
      type: String,
      required: false,
      default: process.env.productName
    },
    $$currency: {
      type: String,
      required: false,
      default: () => '$'
    }*/
  },
  methods: {

  },
  computed: {
   /* ...mapGetters({
      currentMatter: 'matters/matterDetail'
    }),*/
    $$$matterID() {
      try {
        return this.$route.params.matter || this.$route.params.projectId
      } catch (e) {
        console.log('$$$matterID', e.message) // eslint-disable-line
        return null
      }
    },
    $$$depositionId() {
      try {
        return this.$route.params.depositionId
      } catch (e) {
        console.log('$$$depositionId', e.message) // eslint-disable-line
        return null
      }
    }
  },
  filters: {
    $strName(val) {
      if (!val) return 'N/A'
      let temp = val.trim().split(' ')
      if (temp.length === 0) return 'N/A'
      if (temp.length === 1 && temp[0].length >= 2)
        return temp[0].charAt(0) + temp[0].charAt(0)
      if (temp.length === 1 && temp[0].length < 2) return temp[0].charAt(0)
      return temp[0].charAt(0) + temp[temp.length - 1].charAt(0)
    }
  }
})
