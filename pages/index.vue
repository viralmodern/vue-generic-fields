<template>
  <div>
    <TopBarDocketTrackerOdt />
    <TopBarOfTableOdt v-bind="subsTrackerTypes" disabled-setting />
    <v-divider />
    <v-container fluid>
      <div :id="subsTrackersTypes.idFullScreen">
        <TopBarOfTableOdt v-bind="subsTrackersTypes" />
        <GridAllPublicTrackers
          height="73vh"
          :include-params="subsTrackerTypes.includeParams"
        />
      </div>
    </v-container>
  </div>
</template>
<script>
import GridAllDocketsODT from '~/features/odt/GridAllDocketsODT'
import TopBarDocketTrackerOdt from '~/features/odt/TopBarDocketTrackerOdt'
import { actions } from '~/features/odt/store/docketTrackerOdtDetail'
import GridAllPublicTrackers from '~/features/odt/GridAllPublicTrackers'
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { generateToSub } from '~/features/odt/helpers/function'
import { ROUTES } from '~/features/odt/helpers/odt.json'

export default {
  components: {
    TopBarOfTableOdt,
    GridAllPublicTrackers,
    TopBarDocketTrackerOdt,
    GridAllDocketsODT,
  },
  layout: 'odt',
  head() {
    return {
      title: 'Modern Law Practice Management Software',
    }
  },
  computed: {
    trackerTypes() {
      return this.$store.getters['appConfigs/getChoicesConfigByName'](
        'Tracker.TrackerType'
      )
    },
    subsTrackersTypes() {
      let {
        AnnualDocketEntryLoads,
        AnnualDocketEntryTrends,
        TrackerProfile,
      } = ROUTES.Tracker
      let {
        $route: { query },
      } = this
      let queryRoot = { ...query }
      delete queryRoot['by']
      let tabs = [
        generateToSub(TrackerProfile, query, {
          query: { ...queryRoot },
          path: `/`,
        }),
        generateToSub(AnnualDocketEntryLoads, query),
        generateToSub(AnnualDocketEntryTrends, query),
      ]
      let idFullScreen = 'home-docket-trackers'
      return {
        tabs,
        idFullScreen,
      }
    },
    subsTrackerTypes() {
      let {
        trackerTypes,
        $route: { query },
      } = this
      let tabs = trackerTypes.map((trackerType, index) => {
        let t = { ...trackerType }
        t['path'] = trackerType['value']
        let _query = { ...query }
        _query['ungroup'] = false
        _query['group_items'] = trackerType['value']
        _query['group_by'] = 'tracker_type'
        return generateToSub(t, query, { query: { ..._query } })
      })
      let includeParams = {
        ungroup: false,
        group_items: `9`,
        group_by: `tracker_type`,
      }
      return {
        tabs,
        includeParams,
      }
    },
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler(query) {
        if (query && query.hasOwnProperty('trackerlink__tracker')) {
          let tracker = query['trackerlink__tracker']
          actions.fetchObserverDetail(tracker)
        }
      },
    },
  },
}
</script>
