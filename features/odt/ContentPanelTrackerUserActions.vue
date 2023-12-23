<template>
  <v-list dense>
    <template v-for="action in reduceActions">
      <template v-if="action.children">
        <v-list-group :value="true" :prepend-icon="action.icon">
          <template v-slot:activator>
            <v-list-item-title>{{ action.label }}</v-list-item-title>
          </template>
          <v-list-item v-for="(child, i) in action.children" :key="i" link>
            <v-list-item-icon>
              <v-icon v-text="child.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="child.label"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </template>
      <template v-else>
        <v-list-item
          dense
          exact
          replace
          :to="action.to"
          link
          exact-active-class="primary--text"
        >
          <v-list-item-icon>
            <v-icon>{{ action.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ action.label }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </template>
  </v-list>
</template>

<script>
import { DocketUserActionsPanel } from '@/features/odt/helpers/odt.json'
import moment from 'moment'
import { handleExcludeQueryParams } from '~/features/odt/helpers/function'

let {
  viewAllParties,
  ViewAllEntries,
  viewAllMotions,
  viewAllOrder,
  viewAllNotices,
  ViewAllFilingsByPlaintiffs,
  ViewAllFilingsByDefendants,
  Last7days,
  Last30days,
  about,
} = DocketUserActionsPanel
function getLastRangeWithToday(range = 7) {
  let valueBefore = moment().format('YYYY-MM-DD')
  let valueAfter = moment().subtract(range, 'd').format('YYYY-MM-DD')
  return {
    valueBefore,
    valueAfter,
  }
}

export default {
  name: 'ContentPanelTrackerUserActions',
  props: {
    row: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    reduceActions() {
      let { rootPath, reduceQueryFilterToQueryParams } = this
      let { query } = this.$route
      let excludeParamsPattern = ['.', 'predicate', 'group_by', 'group_items']
      return [
        {
          ...viewAllParties,
          to: {
            query: {
              ...handleExcludeQueryParams({ ...query }, excludeParamsPattern),
            },
            path: `${rootPath}/${viewAllParties.path}`,
          },
        },
        {
          ...ViewAllEntries,
          to: {
            query: {
              ...handleExcludeQueryParams({ ...query }, excludeParamsPattern),
            },
            path: `${rootPath}/${ViewAllEntries.path}`,
          },
        },

        {
          ...viewAllMotions,
          to: {
            query: {
              ...reduceQueryFilterToQueryParams(viewAllMotions.queryFilter),
            },
            path: `${rootPath}/${ViewAllEntries.path}`,
          },
        },
        {
          ...viewAllOrder,
          to: {
            query: {
              ...reduceQueryFilterToQueryParams(viewAllOrder.queryFilter),
            },
            path: `${rootPath}/${ViewAllEntries.path}`,
          },
        },
        {
          ...viewAllNotices,
          to: {
            query: {
              ...reduceQueryFilterToQueryParams(viewAllNotices.queryFilter),
            },
            path: `${rootPath}/${ViewAllEntries.path}`,
          },
        },
        {
          ...ViewAllFilingsByPlaintiffs,
          to: {
            query: {
              ...reduceQueryFilterToQueryParams(
                ViewAllFilingsByPlaintiffs.queryFilter
              ),
            },
            path: `${rootPath}/${ViewAllEntries.path}`,
          },
        },
        {
          ...ViewAllFilingsByDefendants,
          to: {
            query: {
              ...reduceQueryFilterToQueryParams(
                ViewAllFilingsByDefendants.queryFilter
              ),
            },
            path: `${rootPath}/${ViewAllEntries.path}`,
          },
        },
        {
          ...Last7days,
          to: {
            query: {
              ...reduceQueryFilterToQueryParams(Last7days.queryFilter),
            },
            path: `${rootPath}/${ViewAllEntries.path}`,
          },
        },
        {
          ...Last30days,
          to: {
            query: {
              ...reduceQueryFilterToQueryParams(Last30days.queryFilter),
            },
            path: `${rootPath}/${ViewAllEntries.path}`,
          },
        },
        {
          ...about,
        },
      ]
    },
    rootPath() {
      let { row } = this
      let entry = (row && row['pk']) || false
      if (entry) {
        return `${this.$$rootPathDocketOdt}/${entry}`
      }
      return `${this.$$rootPathDocketOdt}`
    },
  },
  methods: {
    reduceQueryFilterToQueryParams(queryFilter = {}) {
      let queryRoute = { ...this.$route.query }
      let temp = {},
        group_by,
        group_items
      if (queryFilter.hasOwnProperty('attribute')) {
        // todo Filter
        let param = `${queryFilter.attribute}.${queryFilter.operator}`,
          predicate = `${queryFilter.predicate}`,
          value = `${queryFilter.value}`
        temp = {
          [param]: value,
          predicate,
        }
        if (queryFilter['type'] === 'date') {
          let days = parseInt(value)
          let { valueBefore, valueAfter } = getLastRangeWithToday(days)
          temp[param] = `${valueBefore},${valueAfter}`
          let t = { ...temp }
          delete t['group_by']
          delete queryRoute['group_by']
          delete t['group_items']
          delete queryRoute['group_items']
          temp = { ...t }
        }
      } else {
        // todo group By
        group_by = queryFilter['group_by']
        group_items = queryFilter['group_items']
        temp = { group_by, group_items }
        let t = { ...temp }
        let ks = Object.keys(t)
        ks.forEach((k, idx) => {
          if (k.includes('.')) {
            delete t[k]
            delete queryRoute[k]
          }
        })
        temp = { ...t }
      }
      let query = {
        ungroup: false,
        ...queryRoute,
        ...temp,
      }
      return { ...query }
    },
  },
}
</script>

<style scoped></style>
