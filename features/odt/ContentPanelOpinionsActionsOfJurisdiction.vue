<template>
  <v-list dense>
    <template v-for="action in actions">
      <template v-if="action.children">
        <v-list-group :value="true" :prepend-icon="action.icon">
          <template v-slot:activator>
            <v-list-item-title>{{ action.label }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="(child, i) in action.children"
            :key="i"
            link
            @click="changeAction(child)"
          >
            <v-list-item-icon>
              <v-icon v-text="child.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="child.label"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </template>
      <v-list-item dense v-else @click="changeAction(action)" link>
        <!--<v-list-item-icon>
          <v-icon>{{ action.icon }}</v-icon>
        </v-list-item-icon>-->
        <v-list-item-content>
          <v-list-item-title>
            {{ action.label }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
import { ROUTES, FILTER_PANEL } from '@/features/odt/helpers/odt.json'
import moment from 'moment'
let actions = [
  FILTER_PANEL.Jurisdiction.MostCitedOpinions100,
  FILTER_PANEL.Jurisdiction.LongestOpinionAge100,
  FILTER_PANEL.Jurisdiction.MostCitedAuthorities100,
  FILTER_PANEL.Jurisdiction.LatestActivity100,
  FILTER_PANEL.Jurisdiction.LongestTimeSinceLastActivity100,
]
export default {
  name: 'ContentPanelOpinionsActionsOfJurisdiction',

  data() {
    return {
      actions,
    }
  },
  computed: {
    row() {
      return this.$store.getters['odtJurisdiction/detail']
    },
    rootPath() {
      let { row } = this
      let entry = (row && row['pk']) || false
      let path = ROUTES.LitigationResearch.AllOpinions.path
      if (entry) return `${path}/${entry}/opinions`
      return false
    },
  },
  methods: {
    changeAction(action) {
      let { rootPath, $route } = this,
        group_by,
        group_items,
        temp = {}
      if (action && action.hasOwnProperty('queryFilter')) {
        let queryFilter =
          (action.hasOwnProperty('queryFilter') && action['queryFilter']) || {}
        if (queryFilter.hasOwnProperty('attribute')) {
          // todo Filter
          let param = `${queryFilter.attribute}.${queryFilter.operator}`,
            predicate = `${queryFilter.predicate}`,
            value = `${queryFilter.value}`
          temp = {
            [param]: value,
            predicate,
            // first_filed_date.IsBetween: 2020-10-01,2020-10-08
            // predicate: $and
            // ungroup: false
          }
          if (queryFilter['type'] === 'date') {
            let days = parseInt(value)
            let valueBefore = moment().format('YYYY-MM-DD'),
              valueAfter
            if (days === 7) {
              valueAfter = moment().subtract(7, 'd').format('YYYY-MM-DD')
            } else if (days === 30) {
              valueAfter = moment().subtract(30, 'd').format('YYYY-MM-DD')
            }
            temp[param] = `${valueBefore},${valueAfter}`
          }
        } else {
          // todo group By
          group_by = queryFilter['group_by']
          group_items = queryFilter['group_items']
          temp = { group_by, group_items }
        }
        let query = {
          ungroup: false,
          ...temp,
        }
        // first_filed_date.IsBetween: 2020-10-01,2020-10-08
        // predicate: $and
        // ungroup: false
        this.$router.push({
          path: `${rootPath}`,
          query: {
            ...$route.query,
            ...query,
          },
        })
      } else {
        // TODO: handle task
      }
    },
  },
}
</script>

<style scoped></style>
