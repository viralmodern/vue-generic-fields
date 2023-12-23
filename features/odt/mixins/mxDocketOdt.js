import { docketDetail } from '~/features/odt/store/docketOdtDetail'
export const docketTrackerMixin = {
  computed: {
    docket() {
      try {
        return docketDetail.data
      } catch (e) {
        return {}
      }
    },
    docketNumber() {
      try {
        let { docket } = this
        return docket.docket_number
      } catch (e) {
        return false
      }
    },
    labelLink() {
      try {
        let {
          docket_number,
          case_name,
          date_created,
          last_updated,
        } = this.docket
        let date = last_updated ? last_updated : date_created
        date = date || ''
        return `${case_name} (${docket_number})`
      } catch (e) {
        return false
      }
    },
    labelTracker() {
      let { publicTrackerDetail } = this
      let name, description
      name = (publicTrackerDetail && publicTrackerDetail['name']) || ''
      description =
        (publicTrackerDetail && publicTrackerDetail['description']) || ''
      return {
        name,
        description,
      }
    },
    publicTrackerDetail() {
      try {
        return this.$store.getters['publicTrackersOdt/trackerDetail']
      } catch (e) {
        return false
      }
    },
  },
}
