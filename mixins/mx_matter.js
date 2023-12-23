import { mapGetters } from 'vuex'
import { Matter } from '~/models/matter'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      currentMatter: 'matters/matterDetail'
    }),
    $$matterID() {
      console.log('$$matterID', this.$route.params)
      try {
        return this.$route.params.matter || this.currentMatter.matterID
      } catch (e) {
        console.log(e.message)
        return null
      }
    },
    $$courtID() {
      try {
        return this.currentMatter.courtID
      } catch (e) {
        return null
      }
    },
    $$path() {
      return this.currentMatter.path
    }
  },
  methods: {
    async $_updateMatter({ matterID, data }) {
      try {
        matterID = matterID || this.$$matterID
        let result = await this.$api.patch(`/api/matters/${matterID}/`, data)
        let matter = new Matter(result['data'])
        this.$store.commit('matters/resetDetail', matter)
        this.$eventHub.$emit('alert-curd', {
          text: `${matter.name} has been updated`,
          type: 'success'
        })
      } catch (e) {
        console.log('$_updateMatter', e.message)
        this.$eventHub.$emit('alert-curd', {
          text: `Update matter error`,
          type: 'error'
        })
      }
      // return error
    }
  }
}
